import React, { useState } from "react";

const ReadEnquiries = ({ enquirie }) => {
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
      <label className="read-message__label" htmlFor="message">
        Message
      </label>
      <a className="read-message__button" href={`mailto:${enquirie.email}`}>
        <span>Reply</span>
      </a>
    </div>
  );
};

export default ReadEnquiries;
