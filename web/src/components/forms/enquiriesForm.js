import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import { useSelector } from "react-redux";

const EnquiriesForm = ({ title, image, availableFrom, availableUntill, price, id, maxGuests }) => {
  const filters = useSelector(state => state.filters);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [checkin, setCheckin] = useState(filters.checkin || null);
  const [checkout, setCheckout] = useState(filters.checkout || null);
  const [inputGuests, setInputGuests] = useState(filters.guests || 1);
  const [totalPrice, setTotalPrice] = useState(null);
  const [availableFromDate, setAvailableFromDate] = useState(new Date(availableFrom));
  const [availableUntillDate, setAvailableUntillDate] = useState(new Date(availableUntill));

  useEffect(() => {
    if (checkin && checkout) {
      const timeDifference = checkin.getTime() - checkout.getTime();
      const dayDifference = timeDifference / (1000 * 3600 * 24);
      setTotalPrice(Math.abs(price * dayDifference));
    } else {
      setTotalPrice(null);
    }
  }, [checkin, checkout, price]);

  const handleFormSubmit = event => {
    // const { isFormValid } = this.state;
    event.preventDefault();
    // add validation

    if (true) {
      const mutations = [
        {
          create: {
            _type: "enquiries",
            name: inputName,
            email: inputEmail,
            phone: inputPhone,
            check_in: checkin,
            check_out: checkout,
            guests: inputGuests
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
        .then(result => console.log(result))
        .catch(error => console.error(error));
    }
    // }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="create-establishment__top-container">
        <div className="create-establishment__input-container">
          <label className="filters__label" htmlFor="name">
            Name
          </label>

          <input
            className="filters__input"
            type="text"
            value={inputName}
            name="name"
            onChange={e => {
              setInputName(e.target.value);
            }}
          />
          <label className="filters__label" htmlFor="email">
            Email
          </label>
          <input
            className="filters__input"
            type="email"
            value={inputEmail}
            name="email"
            onChange={e => {
              setInputEmail(e.target.value);
            }}
          />
          <label className="filters__label" htmlFor="phone">
            Phone
          </label>
          <input
            className="filters__input"
            type="phone"
            value={inputPhone}
            name="phone"
            onChange={e => {
              setInputEmail(e.target.value);
            }}
          />
          <label className="filters__label" htmlFor="time">
            Check-in / Check-out
          </label>
          <div className="filters__input filters__input--wrapper" type="text" name="time">
            <DatePicker
              withPortal
              selected={checkin}
              onChange={e => setCheckin(e)}
              minDate={availableFromDate}
              maxDate={checkout || availableUntillDate}
            />

            <span> | </span>

            <DatePicker
              withPortal
              selected={checkout}
              onChange={e => setCheckout(e)}
              minDate={checkin || availableFromDate}
              maxDate={availableUntillDate}
            />
          </div>

          <label className="filters__label" htmlFor="guests">
            Guests
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
        <div className="create-establishment__image-container">
          <div name="currentImage" className="create-establishment__image">
            <label className="filters__label filters__label--green" htmlFor="currentImage">
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
