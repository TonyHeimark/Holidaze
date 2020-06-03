import React, { useState } from "react";
import DatePicker from "react-datepicker";

const ReadEnquiries = ({ enquiry, handleDelete }) => {
  const [checkin, setCheckin] = useState(new Date(enquiry.check_in));
  const [checkout, setCheckout] = useState(new Date(enquiry.check_out));

  return (
    <div className="read-message">
      <h2 className="read-message__heading">{enquiry.establishmentName}</h2>
      <label className="read-message__label" htmlFor="name">
        Name
      </label>
      <div className="read-message__field" name="name">
        {enquiry.name}
      </div>
      <label className="read-message__label" htmlFor="email">
        Email
      </label>
      <div className="read-message__field" name="email">
        {enquiry.email}
      </div>
      <label className="read-message__label" htmlFor="phone">
        Phone
      </label>
      <div className="read-message__field" name="phone">
        {enquiry.phone}
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
        {enquiry.guests}
      </div>
      <button
        className="read-message__delete-button"
        type="button"
        onClick={e => {
          handleDelete(enquiry._id, "enquiry");
        }}
      >
        X Delete enquiry
      </button>
      <a className="read-message__button" href={`mailto:${enquiry.email}`}>
        <span>Reply</span>
      </a>
    </div>
  );
};

export default ReadEnquiries;
