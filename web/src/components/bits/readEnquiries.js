import React, { useState } from "react";
import DatePicker from "react-datepicker";

const ReadEnquiries = ({ enquirie, handleDelete }) => {
  const [checkin, setCheckin] = useState(new Date(enquirie.check_in));
  const [checkout, setCheckout] = useState(new Date(enquirie.check_out));

  return (
    <div className="read-message">
      <label className="read-message__label" htmlFor="name">
        Name
      </label>
      <div className="read-message__field" name="name">
        {enquirie.name}
      </div>
      <label className="read-message__label" htmlFor="email">
        Email
      </label>
      <div className="read-message__field" name="email">
        {enquirie.email}
      </div>
      <label className="read-message__label" htmlFor="phone">
        Phone
      </label>
      <div className="read-message__field" name="phone">
        {enquirie.phone}
      </div>
      <label className="read-message__label" htmlFor="time">
        Check-in / Check-out
      </label>
      <div className="forms__input forms__input--wrapper" type="text" name="time">
        <DatePicker selected={checkin} readOnly={true} onClick={e => {}} />

        <span> | </span>

        <DatePicker readOnly={true} selected={checkout} onClick={e => {}} />
      </div>
      <label className="read-message__label" htmlFor="guests">
        Guests
      </label>
      <div className="read-message__field read-message__field--small" name="guests">
        {enquirie.guests}
      </div>
      <button
        type="button"
        onClick={e => {
          handleDelete(enquirie._id);
        }}
      >
        Delete enquirie
      </button>
      <a className="read-message__button" href={`mailto:${enquirie.email}`}>
        <span>Reply</span>
      </a>
    </div>
  );
};

export default ReadEnquiries;
