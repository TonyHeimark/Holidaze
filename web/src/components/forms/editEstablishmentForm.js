import React, { useState } from "react";
import DatePicker from "react-datepicker";
import DatepickerInput from "../bits/datePickerInput";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";

const EditEstablishmentForm = ({
  listingToEdit,
  facilities,
  setModalShow,
  handleDelete,
  setEstablishments,
  fetchDynamicData,
  setStateChange,
  stateChange
}) => {
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
  const [inputImage, setInputImage] = useState(listingToEdit.image.asset._ref);
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

  const handleEditEstablishment = image => {
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

    fetch("https://holidaze.netlify.app/.netlify/functions/createAndMutateData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mutations })
    })
      .then(res => res.json())
      .then(data => {
        console.log("success response from server...", data);
        setModalShow(false);
        const query = `*[_type == "establishments"]`;
        fetchDynamicData(query, setEstablishments);
        setStateChange(!stateChange);
      })
      .catch(err => {
        console.log("error ", err);
      });
  };

  const handleUploadAndEdit = () => {
    const data = dataState;
    const file = fileState;

    const imageData = {
      image: data,
      name: file.name,
      size: file.size,
      type: file.type
    };

    if (data && file) {
      fetch("https://holidaze.netlify.app/.netlify/functions/uploadImage", {
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
          handleEditEstablishment(imageResult.data);
        })
        .catch(err => {
          console.log("error ", err);
        });
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (fileState !== "") {
      handleUploadAndEdit();
    } else {
      handleEditEstablishment(inputImage);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="establishment-form">
        <div className="establishment-form__top-container">
          <div className="establishment-form__input-container">
            <label className="forms__label" htmlFor="title">
              Title
            </label>
            <input
              className="forms__input"
              type="text"
              value={inputTitle}
              name="title"
              onChange={e => {
                setInputTitle(e.target.value);
              }}
            />

            <label className="forms__label" htmlFor="type">
              Type of place
            </label>
            <input
              className="forms__input"
              type="text"
              value={inputType}
              name="type"
              onChange={e => {
                setInputType(e.target.value);
              }}
            />
            <label className="forms__label" htmlFor="time">
              Available from / to
            </label>

            <div className="forms__input forms__input--wrapper" type="text" name="time">
              <DatePicker
                selected={availableFrom}
                onChange={e => setAvailableFrom(e)}
                maxDate={availableUntill}
                minDate={today}
                withPortal
                customInput={<DatepickerInput />}
              />

              <span> | </span>

              <DatePicker
                selected={availableUntill}
                onChange={e => setAvailableUntill(e)}
                minDate={availableFrom}
                withPortal
                customInput={<DatepickerInput />}
              />
            </div>
            <label className="forms__label" htmlFor="price">
              Price per night (NOK)
            </label>
            <input
              className="forms__input"
              type="number"
              value={inputPrice}
              name="price"
              onChange={e => {
                setInputPrice(e.target.value);
              }}
            />
          </div>
          <div className="establishment-form__image-container">
            <label className="forms__label" htmlFor="file">
              Upload image
            </label>
            <input
              type="file"
              name="file"
              accept="image/jpeg, image/jpg, image/png, image/webp"
              onChange={handleFileSelect}
            />
            <div name="currentImage" className="establishment-form__image">
              <label className="forms__label" htmlFor="currentImage">
                Current image
              </label>
              <img
                className="dashboard-listing__image"
                src={imageUrlFor(buildImageObj(listingToEdit.image))
                  .width(400)
                  .url()}
                alt="current listing image"
              />
            </div>
          </div>
        </div>

        <div className="establishment-form__grid-container">
          <div className="establishment-form__grid-item">
            <label className="forms__label" htmlFor="bedrooms">
              Bedrooms
            </label>
            <input
              className="forms__input forms__input--small"
              placeholder="0"
              type="number"
              value={inputBedrooms}
              name="bedrooms"
              onChange={e => {
                setInputBedrooms(e.target.value);
              }}
            />
          </div>

          <div className="establishment-form__grid-item">
            <label className="forms__label" htmlFor="beds">
              Beds
            </label>
            <input
              className="forms__input forms__input--small"
              placeholder="0"
              type="number"
              value={inputBeds}
              name="beds"
              onChange={e => {
                setInputBeds(e.target.value);
              }}
            />
          </div>

          <div className="establishment-form__grid-item">
            <label className="forms__label" htmlFor="guests">
              Max guests
            </label>
            <input
              className="forms__input forms__input--small"
              placeholder="0"
              type="number"
              value={inputGuests}
              name="guests"
              onChange={e => {
                setInputGuests(e.target.value);
              }}
            />
          </div>
          <div className="establishment-form__grid-item">
            <label className="forms__label" htmlFor="rating">
              Rating
            </label>
            <input
              className="forms__input forms__input--small"
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

        <label className="forms__label" htmlFor="latitude">
          Latitude
        </label>
        <input
          className="forms__input"
          type="number"
          value={inputLatitude}
          name="latitude"
          onChange={e => {
            setInputLatitude(e.target.value);
          }}
        />
        <label className="forms__label" htmlFor="longitude">
          Longitude
        </label>
        <input
          className="forms__input"
          type="number"
          value={inputLongitude}
          name="longitude"
          onChange={e => {
            setInputLongitude(e.target.value);
          }}
        />
        <label className="forms__label" htmlFor="description">
          Description
        </label>
        <textarea
          className="forms__input forms__textarea"
          type="textarea"
          value={inputDescription}
          name="description"
          onChange={e => {
            setInputDescription(e.target.value);
          }}
        />
        <label className="forms__label" htmlFor="facilities">
          Facilities
        </label>
        <div className="forms__checkbox" name="facilities">
          {facilities &&
            facilities.map(f => (
              <div
                tabIndex="0"
                key={f.node._id}
                className={`forms__checkbox-button ${facilityKeys.includes(f.node._id) &&
                  "forms__checkbox-button--active"}`}
                onClick={e => {
                  handleFacilitiesArray(f.node);
                }}
              >
                {f.node.title}
              </div>
            ))}
        </div>
        <button className="establishment-form__button" type="submit">
          <span>Update</span>
        </button>
        <button
          className="establishment-form__delete-button"
          type="button"
          onClick={e => {
            handleDelete(listingToEdit._id, "establishment");
          }}
        >
          X Delete listing
        </button>
      </form>
    </div>
  );
};

export default EditEstablishmentForm;
