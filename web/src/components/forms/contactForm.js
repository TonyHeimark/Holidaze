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
      <input
        type="text"
        value={inputName}
        name="name"
        onChange={e => {
          setInputName(e.target.value);
        }}
      />
      <input
        type="email"
        value={inputEmail}
        name="email"
        onChange={e => {
          setInputEmail(e.target.value);
        }}
      />
      <textarea
        type="textarea"
        value={inputMessage}
        name="message"
        onChange={e => {
          setInputMessage(e.target.value);
        }}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
