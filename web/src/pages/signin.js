import React, { useState } from "react";
//import auth from "../lib/auth";
import Layout from "../components/layout";
import SEO from "../components/seo";

import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://holidaze.netlify.app/.netlify/identity",
  audience: "",
  setCookie: true
});

const SignIn = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSignUp = e => {
    e.preventDefault();
    auth
      .signup(emailInput, passwordInput)
      .then(response => console.log("Confirmation email sent", response))
      .catch(error => console.log("It's an error", error));
  };

  const handleSignIn = e => {
    e.preventDefault();
    auth
      .login(emailInput, passwordInput)
      .then(response => console.log("Success", response))
      .catch(error => console.log("Failed", error));
  };

  return (
    <Layout>
      <SEO title="sign in" />
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          name="email"
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={passwordInput}
          onChange={e => setPasswordInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </Layout>
  );
};

export default SignIn;
