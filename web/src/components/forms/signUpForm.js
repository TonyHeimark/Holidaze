import React from "react";

const SignUpForm = ({ setUserName, setPassword, setConfirmPassword, handleSignUp }) => {
  return (
    <div className="signin-form">
      <label for="username" className="signin-form__label">
        Username
      </label>
      <input
        className="signin-form__input"
        name="username"
        type="text"
        maxlength="12"
        onChange={e => {
          setUserName(e.target.value);
        }}
      />
      <label for="password" className="signin-form__label">
        Password
      </label>
      <input
        className="signin-form__input"
        name="password"
        maxlength="12"
        type="password"
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <label for="confirm" className="signin-form__label">
        Confirm password
      </label>
      <input
        className="signin-form__input"
        name="confirm"
        maxlength="12"
        type="password"
        onChange={e => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button className="signin-form__button" onClick={handleSignUp}>
        <span>Sign Up</span>
      </button>
    </div>
  );
};

export default SignUpForm;
