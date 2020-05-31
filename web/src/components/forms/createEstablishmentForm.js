import React, { useState } from "react";
import DatePicker from "react-datepicker";
import DatepickerInput from "../bits/datePickerInput";

const CreateEstablishmentForm = ({
  setModalShow,
  facilities,
  setEstablishments,
  fetchDynamicData,
  setStateChange,
  stateChange
}) => {
  const [today, setToday] = useState(new Date());
  const [facilityKeys, setFacilityKeys] = useState([]);
  const [fileState, setFileState] = useState("");
  const [dataState, setDataState] = useState("");
  const [errorState, setErrorState] = useState({});
  const [formFields, setFormFields] = useState({
    title: "",
    type: "",
    price: "",
    bedrooms: "",
    beds: "",
    guests: "",
    latitude: "",
    longitude: "",
    availableFrom: new Date(),
    availableUntill: null,
    rating: "",
    image: null,
    facilities: [],
    description: ""
  });

  const handleFormFields = e => {
    const field = e.target.name;
    const value = e.target.value;
    let errors = errorState;
    delete errors[field];

    setFormFields({ ...formFields, [field]: value });
    setErrorState(errors);
  };

  const handleFacilitiesArray = facility => {
    const facilitiesInState = formFields.facilities;
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
    setFormFields({ ...formFields, facilities: facilitiesInState });
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
        setFormFields({ ...formFields, image: file.name });
        let errors = errorState;
        delete errors.image;
        setErrorState(errors);
      };
    }
  };

  const handleCreateEstablishment = image => {
    const mutations = [
      {
        create: {
          _type: "establishments",
          title: formFields.title,
          image: {
            _type: "image",
            asset: {
              _ref: image._id
            }
          },
          description: formFields.description,
          typeOfEstablishment: formFields.type,
          availableFrom: formFields.availableFrom,
          availableUntill: formFields.availableUntill,
          price: formFields.price,
          bedrooms: formFields.bedrooms,
          beds: formFields.beds,
          maxGuests: formFields.guests,
          latitude: formFields.latitude,
          longitude: formFields.longitude,
          rating: formFields.rating,
          facilities: formFields.facilities
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
          handleCreateEstablishment(imageResult.data);
        })
        .catch(err => {
          console.log("error ", err);
        });
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    let errors = {};

    if (formFields.title === "") {
      errors = { ...errors, title: "You need to fill out this field" };
    }
    if (formFields.type === "") {
      errors = { ...errors, type: "You need to fill out this field" };
    }
    if (formFields.price === "") {
      errors = { ...errors, price: "You need to fill out this field" };
    }
    if (formFields.bedrooms === "" || formFields.bedrooms === 0 || formFields.bedrooms === "0") {
      errors = { ...errors, bedrooms: "Can't be zero" };
    }
    if (formFields.beds === "" || formFields.beds === 0 || formFields.beds === "0") {
      errors = { ...errors, beds: "Can't be zero" };
    }
    if (formFields.guests === "" || formFields.guests === 0 || formFields.guests === "0") {
      errors = { ...errors, guests: "Can't be zero" };
    }
    if (formFields.availableUntill === null) {
      errors = { ...errors, availableUntill: "You need to pick a date" };
    }
    if (formFields.image === null) {
      errors = { ...errors, image: "You need to upload an image" };
    }
    if (formFields.description === "") {
      errors = { ...errors, description: "You need to fill out this field" };
    }

    const errorCheck = Object.keys(errors);
    if (errorCheck.length !== 0) {
      setErrorState(errors);
      console.log(errors);
      return null;
    }

    handleUploadAndCreate();
  };

  return (
    <form onSubmit={handleFormSubmit} className="establishment-form">
      <div className="establishment-form__top-container">
        <div className="establishment-form__input-container">
          <label className="forms__label" htmlFor="title">
            Title
            {errorState.title && <span>{errorState.title}</span>}
          </label>
          <input
            className={`forms__input ${errorState.title && "forms__input--error"}`}
            type="text"
            value={formFields.title}
            name="title"
            onChange={handleFormFields}
          />

          <label className="forms__label" htmlFor="type">
            Type of place
            {errorState.type && <span>{errorState.type}</span>}
          </label>
          <input
            className={`forms__input ${errorState.type && "forms__input--error"}`}
            type="text"
            value={formFields.type}
            name="type"
            onChange={handleFormFields}
          />
          <label className="forms__label" htmlFor="time">
            Available from / to
            {errorState.availableUntill && <span>{errorState.availableUntill}</span>}
          </label>

          <div
            className={`forms__input forms__input--wrapper ${errorState.availableUntill &&
              "forms__input--error"}`}
            type="text"
            name="time"
          >
            <DatePicker
              selected={formFields.availableFrom}
              onChange={e => {
                setFormFields({ ...formFields, availableFrom: e });
              }}
              maxDate={formFields.availableUntill}
              minDate={today}
              withPortal
              customInput={<DatepickerInput />}
            />

            <span> | </span>

            <DatePicker
              selected={formFields.availableUntill}
              onChange={e => {
                setFormFields({ ...formFields, availableUntill: e });
                let errors = errorState;
                delete errors.availableUntill;
                setErrorState(errors);
              }}
              minDate={formFields.availableFrom}
              withPortal
              customInput={<DatepickerInput />}
            />
          </div>
          <label className="forms__label" htmlFor="price">
            Price per night (NOK)
            {errorState.price && <span>{errorState.price}</span>}
          </label>
          <input
            className={`forms__input ${errorState.price && "forms__input--error"}`}
            type="number"
            value={formFields.price}
            name="price"
            onChange={handleFormFields}
          />
        </div>
        <div className="establishment-form__image-container">
          <label className="forms__label" htmlFor="file">
            Upload image
            {errorState.image && <span>{errorState.image}</span>}
          </label>
          <input
            type="file"
            name="file"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            onChange={handleFileSelect}
          />
        </div>
      </div>

      <div className="establishment-form__grid-container">
        <div className="establishment-form__grid-item">
          <label className="forms__label" htmlFor="bedrooms">
            Bedrooms
            {errorState.bedrooms && <span>{errorState.bedrooms}</span>}
          </label>
          <input
            className={`forms__input forms__input--small ${errorState.bedrooms &&
              "forms__input--error"}`}
            placeholder="0"
            type="number"
            value={formFields.bedrooms}
            name="bedrooms"
            onChange={handleFormFields}
          />
        </div>

        <div className="establishment-form__grid-item">
          <label className="forms__label" htmlFor="beds">
            Beds
            {errorState.beds && <span>{errorState.beds}</span>}
          </label>
          <input
            className={`forms__input forms__input--small ${errorState.beds &&
              "forms__input--error"}`}
            placeholder="0"
            type="number"
            value={formFields.beds}
            name="beds"
            onChange={handleFormFields}
          />
        </div>

        <div className="establishment-form__grid-item">
          <label className="forms__label" htmlFor="guests">
            Max guests
            {errorState.guests && <span>{errorState.guests}</span>}
          </label>
          <input
            className={`forms__input forms__input--small ${errorState.guests &&
              "forms__input--error"}`}
            placeholder="0"
            type="number"
            value={formFields.guests}
            name="guests"
            onChange={handleFormFields}
          />
        </div>
        <div className="establishment-form__grid-item">
          <label className="forms__label" htmlFor="rating">
            Rating
            {errorState.rating && <span>{errorState.rating}</span>}
          </label>
          <input
            className={`forms__input forms__input--small ${errorState.rating &&
              "forms__input--error"}`}
            placeholder="0"
            type="number"
            value={formFields.rating}
            name="rating"
            onChange={handleFormFields}
          />
        </div>
      </div>

      <label className="forms__label" htmlFor="latitude">
        Latitude
        {errorState.latitude && <span>{errorState.latitude}</span>}
      </label>
      <input
        className={`forms__input ${errorState.latitude && "forms__input--error"}`}
        type="number"
        value={formFields.latitude}
        name="latitude"
        onChange={handleFormFields}
      />
      <label className="forms__label" htmlFor="longitude">
        Longitude
        {errorState.longitude && <span>{errorState.longitude}</span>}
      </label>
      <input
        className={`forms__input ${errorState.longitude && "forms__input--error"}`}
        type="number"
        value={formFields.longitude}
        name="longitude"
        onChange={handleFormFields}
      />
      <label className="forms__label" htmlFor="description">
        Description
        {errorState.description && <span>{errorState.description}</span>}
      </label>
      <textarea
        className={`forms__input forms__textarea ${errorState.description &&
          "forms__input--error"}`}
        type="textarea"
        value={formFields.description}
        name="description"
        onChange={handleFormFields}
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
        <span>Create</span>
      </button>
    </form>
  );
};

export default CreateEstablishmentForm;
