import React from "react";

const SignUpForm = ({ handleSignUp, errorState, handleFormFields }) => {
  return (
    <div className="signin-form">
      <label for="username" className="forms__label">
        Username
        {errorState.username && <span>{errorState.username}</span>}
      </label>
      <input
        className="forms__input"
        name="username"
        type="text"
        maxlength="12"
        onChange={handleFormFields}
      />
      <label for="password" className="forms__label">
        Password
        {errorState.password && <span>{errorState.password}</span>}
      </label>
      <input
        className="forms__input"
        name="password"
        maxlength="12"
        type="password"
        onChange={handleFormFields}
      />
      <label for="confirm" className="forms__label">
        Confirm password
        {errorState.confirm && <span>{errorState.confirm}</span>}
      </label>
      <input
        className="forms__input"
        name="confirm"
        maxlength="12"
        type="password"
        onChange={handleFormFields}
      />
      <button className="signin-form__button" onClick={handleSignUp}>
        <span>Sign Up</span>
      </button>
    </div>
  );
};

export default SignUpForm;
