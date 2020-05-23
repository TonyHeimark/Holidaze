import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";

const EditEstablishmentForm = ({ listingToEdit, facilities }) => {
  console.log(listingToEdit);
  const [today, setToday] = useState(new Date());
  const [inputTitle, setInputTitle] = useState(listingToEdit.title);
  const [inputType, setInputType] = useState(listingToEdit.typeOfEstablishment);
  const [inputPrice, setInputPrice] = useState(listingToEdit.price);
  const [inputBedrooms, setInputBedrooms] = useState(listingToEdit.bedrooms);
  const [inputBeds, setInputBeds] = useState(listingToEdit.beds);
  const [availableFrom, setAvailableFrom] = useState(new Date(listingToEdit.availableFrom));
  const [availableUntill, setAvailableUntill] = useState(new Date(listingToEdit.availableUntill));
  const [inputGuests, setInputGuests] = useState(listingToEdit.maxGuests);
  const [inputLatitude, setInputLatitude] = useState(listingToEdit.latitude);
  const [inputLongitude, setInputLongitude] = useState(listingToEdit.longitude);
  const [inputRating, setInputRating] = useState(listingToEdit.rating);
  const [inputImage, setInputImage] = useState(listingToEdit._rawImage.asset._ref);
  const [inputFacilities, setInputFacilities] = useState(listingToEdit.facilities);
  const [facilityKeys, setFacilityKeys] = useState(listingToEdit.facilities.map(f => f._key));
  const [inputDescription, setInputDescription] = useState(listingToEdit.description);
  const [fileState, setFileState] = useState("");
  const [dataState, setDataState] = useState("");

  const handleFacilitiesArray = facility => {
    const facilitiesInState = inputFacilities;
    const index = facilitiesInState
      .map(item => {
        return item._ref;
      })
      .indexOf(facility._id);
    if (index > -1) {
      facilitiesInState.splice(index, 1);
    } else {
      facilitiesInState.push({
        _ref: facility._id,
        _key: facility._id,
        _type: "facilities"
      });
    }
    setFacilityKeys(facilitiesInState.map(f => f._key));
    setInputFacilities(facilitiesInState);
  };

  const handleFileSelect = e => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        // set image and base64'd image data in component state

        setDataState(reader.result);
        setFileState(file);
      };
    }
  };

  const handleCreateEstablishment = image => {
    const mutations = [
      {
        patch: {
          id: listingToEdit._id,
          set: {
            _type: "establishments",
            title: inputTitle,
            image: {
              _type: "image",
              asset: {
                _ref: image._id || image
              }
            },
            description: inputDescription,
            typeOfEstablishment: inputType,
            availableFrom: availableFrom,
            availableUntill: availableUntill,
            price: inputPrice,
            bedrooms: inputBedrooms,
            beds: inputBeds,
            maxGuests: inputGuests,
            beds: inputBeds,
            latitude: inputLatitude,
            longitude: inputLongitude,
            rating: inputRating,
            facilities: inputFacilities
          }
        }
      }
    ];
    console.log(mutations);
    const token =
      "skj7PZDTY7H7i09HdhE3tmtQNHurEWLABgqvzPA5naMxg62seswXv3eJzat62cCVxvURdjLNPyoeMdm8m0UAaGeHIJmT7rkoVEdKQQN7WRJ0kXwKfD3VkD5bLSurDub519SpQdYWC2ydEM0Ijcnhg56pUPY9dvJCChLLMWlKDq4EhL81X1DE";

    fetch("https://8g6l9b4n.api.sanity.io/v1/data/mutate/production", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ mutations })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.error(error));
  };

  const handleUploadAndCreate = () => {
    const data = dataState;
    const file = fileState;

    const imageData = {
      image: data,
      name: file.name,
      size: file.size,
      type: file.type
    };

    if (data && file) {
      // fire off request to our upload handler
      fetch("http://localhost:9000/.netlify/functions/syncEnquiries.js", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(imageData)
      })
        .then(res => res.json())
        .then(imageResult => {
          console.log("success response from server...", imageResult);
          setInputImage(imageResult.data);
          handleCreateEstablishment(imageResult.data);
        })
        .catch(err => {
          console.log("error ", err);
        });
    }
  };

  const handleFormSubmit = event => {
    // const { isFormValid } = this.state;
    event.preventDefault();
    // add validation
    if (fileState !== "") {
      handleUploadAndCreate();
    } else {
      handleCreateEstablishment(inputImage);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="create-establishment">
      <div className="create-establishment__top-container">
        <div className="create-establishment__input-container">
          <label className="filters__label" htmlFor="title">
            Title
          </label>
          <input
            className="filters__input"
            type="text"
            value={inputTitle}
            name="title"
            onChange={e => {
              setInputTitle(e.target.value);
            }}
          />

          <label className="filters__label" htmlFor="type">
            Type of place
          </label>
          <input
            className="filters__input"
            type="text"
            value={inputType}
            name="type"
            onChange={e => {
              setInputType(e.target.value);
            }}
          />
          <label className="filters__label" htmlFor="time">
            Available from / to
          </label>

          <div className="filters__input filters__input--wrapper" type="text" name="time">
            <DatePicker
              selected={availableFrom}
              onChange={e => setAvailableFrom(e)}
              maxDate={availableUntill}
              minDate={today}
            />

            <span> | </span>

            <DatePicker
              selected={availableUntill}
              onChange={e => setAvailableUntill(e)}
              minDate={availableFrom}
            />
          </div>
          <label className="filters__label" htmlFor="price">
            Price per night (NOK)
          </label>
          <input
            className="filters__input"
            type="number"
            value={inputPrice}
            name="price"
            onChange={e => {
              setInputPrice(e.target.value);
            }}
          />
        </div>
        <div className="create-establishment__image-container">
          <label className="filters__label" htmlFor="file">
            Upload image
          </label>
          <input
            type="file"
            name="file"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            onChange={handleFileSelect}
          />
          <div name="currentImage" className="create-establishment__image">
            <label className="filters__label" htmlFor="currentImage">
              Current image
            </label>
            <img
              className="dashboard-listing__image"
              src={imageUrlFor(buildImageObj(listingToEdit._rawImage))
                .width(400)
                .url()}
              alt="current listing image"
            />
          </div>
        </div>
      </div>

      <div className="create-establishment__grid-container">
        <div className="create-establishment__grid-item">
          <label className="filters__label" htmlFor="bedrooms">
            Bedrooms
          </label>
          <input
            className="filters__input filters__input--small"
            placeholder="0"
            type="number"
            value={inputBedrooms}
            name="bedrooms"
            onChange={e => {
              setInputBedrooms(e.target.value);
            }}
          />
        </div>

        <div className="create-establishment__grid-item">
          <label className="filters__label" htmlFor="beds">
            Beds
          </label>
          <input
            className="filters__input filters__input--small"
            placeholder="0"
            type="number"
            value={inputBeds}
            name="beds"
            onChange={e => {
              setInputBeds(e.target.value);
            }}
          />
        </div>

        <div className="create-establishment__grid-item">
          <label className="filters__label" htmlFor="guests">
            Max guests
          </label>
          <input
            className="filters__input filters__input--small"
            placeholder="0"
            type="number"
            value={inputGuests}
            name="guests"
            onChange={e => {
              setInputGuests(e.target.value);
            }}
          />
        </div>
        <div className="create-establishment__grid-item">
          <label className="filters__label" htmlFor="rating">
            Rating
          </label>
          <input
            className="filters__input filters__input--small"
            placeholder="0"
            type="number"
            value={inputRating}
            name="rating"
            onChange={e => {
              setInputRating(e.target.value);
            }}
          />
        </div>
      </div>

      <label className="filters__label" htmlFor="latitude">
        Latitude
      </label>
      <input
        className="filters__input"
        type="number"
        value={inputLatitude}
        name="latitude"
        onChange={e => {
          setInputLatitude(e.target.value);
        }}
      />
      <label className="filters__label" htmlFor="longitude">
        Longitude
      </label>
      <input
        className="filters__input"
        type="number"
        value={inputLongitude}
        name="longitude"
        onChange={e => {
          setInputLongitude(e.target.value);
        }}
      />
      <label className="filters__label" htmlFor="description">
        Description
      </label>
      <textarea
        className="filters__input filters__textarea"
        type="textarea"
        value={inputDescription}
        name="description"
        onChange={e => {
          setInputDescription(e.target.value);
        }}
      />
      <label className="filters__label" htmlFor="facilities">
        Facilities
      </label>
      <div className="filters__checkbox" name="facilities">
        {facilities &&
          facilities.map(f => (
            <div
              tabindex="0"
              key={f.node._id}
              className={`filters__checkbox-button ${facilityKeys.includes(f.node._id) &&
                "filters__checkbox-button--active"}`}
              onClick={e => {
                handleFacilitiesArray(f.node);
              }}
            >
              {f.node.title}
            </div>
          ))}
      </div>
      <button className="create-establishment__button" type="submit">
        <span>Update</span>
      </button>
    </form>
  );
};

export default EditEstablishmentForm;
