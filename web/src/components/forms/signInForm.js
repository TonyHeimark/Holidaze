import React from "react";

const SignInForm = ({
  userName,
  password,
  setUserName,
  setPassword,
  handleSignIn,
  authenticated
}) => {
  return (
    <div className="signin-form">
      {authenticated === false && (
        <span className="signin-form__error">Your username or password is incorrect.</span>
      )}
      <label for="username" className="signin-form__label">
        Username
      </label>
      <input
        className="signin-form__input"
        name="username"
        type="text"
        value={userName}
        onChange={e => {
          setUserName(e.target.value);
        }}
      />
      <label for="username" className="signin-form__label">
        Password
      </label>
      <input
        className="signin-form__input"
        name="password"
        type="text"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <button className="signin-form__button" onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
};

export default SignInForm;
