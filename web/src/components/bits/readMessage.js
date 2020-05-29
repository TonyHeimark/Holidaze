import React, { useState } from "react";

const ReadMessage = ({ message, handleDelete }) => {
  return (
    <div className="read-message">
      <label className="read-message__label" htmlFor="name">
        Name
      </label>
      <div className="read-message__field" name="name">
        {message.name}
      </div>
      <label className="read-message__label" htmlFor="email">
        Email
      </label>

      <div className="read-message__field" name="email">
        {message.email}
      </div>
      <label className="read-message__label" htmlFor="message">
        Message
      </label>

      <div className="read-message__field read-message__field--message" name="message">
        {message.message}
      </div>
      <button
        type="button"
        onClick={e => {
          handleDelete(message._id);
        }}
      >
        Delete message
      </button>

      <a className="read-message__button" href={`mailto:${message.email}`}>
        <span>Reply</span>
      </a>
    </div>
  );
};

export default ReadMessage;
