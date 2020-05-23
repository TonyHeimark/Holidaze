import React from "react";

const SignUpForm = ({ setUserName, setPassword, setConfirmPassword, handleSignUp }) => {
  return (
    <div className="signup-form">
      <label for="username" className="signup-form__label">
        Username
      </label>
      <input
        className="signup-form__input"
        name="username"
        type="text"
        maxlength="12"
        onChange={e => {
          setUserName(e.target.value);
        }}
      />
      <label for="password" className="signup-form__label">
        Password
      </label>
      <input
        className="signup-form__input"
        name="password"
        maxlength="12"
        type="password"
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <label for="confirm" className="signup-form__label">
        Confirm password
      </label>
      <input
        className="signup-form__input"
        name="confirm"
        maxlength="12"
        type="password"
        onChange={e => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button className="signup-form__button" onClick={handleSignUp}>
        <span>Sign Up</span>
      </button>
    </div>
  );
};

export default SignUpForm;
