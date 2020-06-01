import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import DatepickerInput from "../bits/datePickerInput";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import { useSelector } from "react-redux";
import ThankYouModal from "../bits/thankYouModal";

const EnquiriesForm = ({
  title,
  image,
  availableFrom,
  availableUntill,
  price,
  id,
  maxGuests,
  setModalContentComponent
}) => {
  const filters = useSelector(state => state.filters);
  const [totalPrice, setTotalPrice] = useState(null);
  const [availableFromDate, setAvailableFromDate] = useState(new Date(availableFrom));
  const [availableUntillDate, setAvailableUntillDate] = useState(new Date(availableUntill));
  const [errorState, setErrorState] = useState({});
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: filters.checkin || null,
    checkout: filters.checkout || null,
    guests: filters.guests || 1
  });

  const handleFormFields = e => {
    const field = e.target.name;
    const value = e.target.value;
    let errors = errorState;
    delete errors[field];

    setFormFields({ ...formFields, [field]: value });
    setErrorState(errors);
  };

  useEffect(() => {
    if (formFields.checkin && formFields.checkout) {
      const timeDifference = formFields.checkin.getTime() - formFields.checkout.getTime();
      const dayDifference = timeDifference / (1000 * 3600 * 24);
      setTotalPrice(Math.abs(price * dayDifference));
    } else {
      setTotalPrice(null);
    }
  }, [formFields.checkin, formFields.checkout, price]);

  const handleFormSubmit = event => {
    event.preventDefault();

    let errors = {};
    const emailVal = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$");
    const phoneVal = RegExp("^[0-9]{8}$");

    if (formFields.name === "") {
      errors = { ...errors, name: "You need to fill out this field" };
    }
    if (!emailVal.test(formFields.email) || formFields.email === "") {
      errors = { ...errors, email: "Please put in a valid email" };
    }
    if (!phoneVal.test(formFields.phone) || formFields.phone === null) {
      errors = { ...errors, phone: "Please put in a valid phone number" };
    }
    if (formFields.guests === "" || formFields.guests === 0 || formFields.guests === "0") {
      errors = { ...errors, guests: "Can't be zero" };
    }
    if (formFields.guests > maxGuests) {
      errors = { ...errors, guests: `Max ${maxGuests} guests.` };
    }
    if (formFields.checkin === null || formFields.checkout === null) {
      errors = { ...errors, date: "You need to pick a date" };
    }

    const errorCheck = Object.keys(errors);
    if (errorCheck.length !== 0) {
      setErrorState(errors);

      return null;
    }

    const mutations = [
      {
        create: {
          _type: "enquiries",
          name: formFields.name,
          email: formFields.email,
          phone: formFields.phone,
          check_in: formFields.checkin,
          check_out: formFields.checkout,
          guests: formFields.guests,
          establishmentName: title
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
        setModalContentComponent(<ThankYouModal />);
      })
      .catch(err => {
        console.log("error ", err);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="establishment-form__top-container">
        <div className="establishment-form__input-container">
          <label className="forms__label" htmlFor="name">
            Name
            {errorState.name && <span>{errorState.name}</span>}
          </label>

          <input
            className="forms__input"
            type="text"
            value={formFields.name}
            name="name"
            onChange={handleFormFields}
          />
          <label className="forms__label" htmlFor="email">
            Email
            {errorState.email && <span>{errorState.email}</span>}
          </label>
          <input
            className="forms__input"
            type="email"
            value={formFields.email}
            name="email"
            onChange={handleFormFields}
          />
          <label className="forms__label" htmlFor="phone">
            Phone
            {errorState.phone && <span>{errorState.phone}</span>}
          </label>
          <input
            className="forms__input"
            type="phone"
            value={formFields.phone}
            name="phone"
            onChange={handleFormFields}
          />
          <label className="forms__label" htmlFor="time">
            Check-in / Check-out
            {errorState.date && <span>{errorState.date}</span>}
          </label>
          <div className="forms__input forms__input--wrapper" type="text" name="time">
            <DatePicker
              withPortal
              customInput={<DatepickerInput />}
              selected={formFields.checkin}
              onChange={e => {
                setFormFields({ ...formFields, checkin: e });
                let errors = errorState;
                delete errors.date;
                setErrorState(errors);
              }}
              minDate={availableFromDate || null}
              maxDate={formFields.checkout || availableUntillDate || null}
            />

            <span> | </span>

            <DatePicker
              customInput={<DatepickerInput />}
              withPortal
              selected={formFields.checkout}
              onChange={e => {
                setFormFields({ ...formFields, checkout: e });
                let errors = errorState;
                delete errors.date;
                setErrorState(errors);
              }}
              minDate={formFields.checkin || availableFromDate || null}
              maxDate={availableUntillDate || null}
            />
          </div>

          <label className="forms__label" htmlFor="guests">
            Guests
            {errorState.guests && <span>{errorState.guests}</span>}
          </label>
          <input
            className="forms__input forms__input--small"
            placeholder="0"
            type="number"
            value={formFields.guests}
            name="guests"
            onChange={handleFormFields}
          />
        </div>
        <div className="establishment-form__image-container">
          <div name="currentImage" className="establishment-form__image">
            <label className="forms__label forms__label--green" htmlFor="currentImage">
              {title}
            </label>
            <img
              className="dashboard-listing__image"
              src={imageUrlFor(buildImageObj(image))
                .width(400)
                .url()}
              alt="current listing image"
            />
            <span className="enquiries-form__price">
              {price} NOK<span> / night</span>
            </span>
            {totalPrice && (
              <span className="enquiries-form__price">
                {totalPrice} NOK<span> / total</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <button className="read-message__button" type="submit">
        <span>Send</span>
      </button>
    </form>
  );
};

export default EnquiriesForm;
