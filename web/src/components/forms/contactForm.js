import React, { useState } from "react";

const ContactForm = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const handleFormSubmit = event => {
    // const { isFormValid } = this.state;
    event.preventDefault();
    // add validation

    if (true) {
      const mutations = [
        {
          create: {
            _type: "contact",
            name: inputName,
            email: inputEmail,
            message: inputMessage
          }
        }
      ];

      fetch("https://holidaze.netlify.app/.netlify/functions/createAndMutateData.js", {
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
          // do logic, remove from state
        })
        .catch(err => {
          console.log("error ", err);
        });
    }
    // }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label className="read-message__label" htmlFor="name">
        Name
      </label>

      <input
        className="forms__input"
        type="text"
        value={inputName}
        name="name"
        onChange={e => {
          setInputName(e.target.value);
        }}
      />
      <label className="read-message__label" htmlFor="email">
        Email
      </label>
      <input
        className="forms__input"
        type="email"
        value={inputEmail}
        name="email"
        onChange={e => {
          setInputEmail(e.target.value);
        }}
      />
      <label className="read-message__label" htmlFor="message">
        Message
      </label>
      <textarea
        className="forms__input forms__textarea"
        type="textarea"
        value={inputMessage}
        name="message"
        onChange={e => {
          setInputMessage(e.target.value);
        }}
      />
      <button className="read-message__button" type="submit">
        <span>Send</span>
      </button>
    </form>
  );
};

export default ContactForm;
