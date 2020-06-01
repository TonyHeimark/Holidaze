import React, { useState } from "react";

const ContactForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorState, setErrorState] = useState({});
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleFormFields = e => {
    const field = e.target.name;
    const value = e.target.value;
    let errors = errorState;
    delete errors[field];

    setFormFields({ ...formFields, [field]: value });
    setErrorState(errors);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    let errors = {};
    const emailVal = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$");

    if (formFields.name === "") {
      errors = { ...errors, name: "You need to fill out this field" };
    }
    if (!emailVal.test(formFields.email) || formFields.email === "") {
      errors = { ...errors, email: "Please put in a valid email" };
    }
    if (formFields.message === "") {
      errors = { ...errors, message: "You need to fill out this field" };
    }

    const errorCheck = Object.keys(errors);
    if (errorCheck.length !== 0) {
      setErrorState(errors);
      return null;
    }

    const mutations = [
      {
        create: {
          _type: "contact",
          name: formFields.name,
          email: formFields.email,
          message: formFields.message
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
        setSuccessMessage("Your message was successfully sent, we will get back to you shortly.");
      })
      .catch(err => {
        console.log("error ", err);
      });

    // }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {successMessage && <span className="contact__success">{successMessage}</span>}
      <label className="forms__label" htmlFor="name">
        Name
        {errorState.name && <span>{errorState.name}</span>}
      </label>

      <input
        className={`forms__input ${errorState.name && "forms__input--error"}`}
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
        className={`forms__input ${errorState.email && "forms__input--error"}`}
        type="email"
        value={formFields.email}
        name="email"
        onChange={handleFormFields}
      />
      <label className="forms__label" htmlFor="message">
        Message
        {errorState.message && <span>{errorState.message}</span>}
      </label>
      <textarea
        className={`forms__input forms__textarea ${errorState.message && "forms__input--error"}`}
        type="textarea"
        value={formFields.message}
        name="message"
        onChange={handleFormFields}
      />
      <button className="read-message__button" type="submit">
        <span>Send</span>
      </button>
    </form>
  );
};

export default ContactForm;
