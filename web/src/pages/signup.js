import React, { useState, useEffect } from "react";
import { navigate, Link } from "gatsby";
import { setUser } from "../lib/auth";
import { useSelector } from "react-redux";
import SignUpForm from "../components/forms/signUpForm";

import logo from "../assets/logo-dark.svg";

import "../styles/layout.scss";

const SignUpPage = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);
  const [errorState, setErrorState] = useState({});
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
    confirm: ""
  });

  const handleFormFields = e => {
    const field = e.target.name;
    const value = e.target.value;
    let errors = errorState;
    delete errors[field];

    setFormFields({ ...formFields, [field]: value });
    setErrorState(errors);
  };

  const handleSignUp = () => {
    let errors = {};

    if (formFields.username.length < 6) {
      errors = { ...errors, username: "Username needs to be 6 characters or more" };
    }
    if (formFields.password.length < 6) {
      errors = { ...errors, password: "Password needs to be 6 characters or more" };
    }

    if (formFields.confirm !== formFields.password) {
      errors = { ...errors, confirm: "Password does not match" };
    }

    const errorCheck = Object.keys(errors);
    if (errorCheck.length !== 0) {
      setErrorState(errors);
      console.log(errors);
      return null;
    }

    const usersLogin = {
      users: [
        {
          username: formFields.username,
          password: formFields.password
        }
      ]
    };
    setUser(usersLogin.users);
    localStorage.setItem("users", JSON.stringify(usersLogin.users));
    navigate("/signin/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="sign-up">
      <div className="sign-up__wrapper">
        <Link to="/">
          <img className="sign-up__brand-img" src={logo} />
        </Link>
        <SignUpForm
          handleSignUp={handleSignUp}
          handleFormFields={handleFormFields}
          errorState={errorState}
        />
        <div className="sign-up__link-box">
          <Link className="sign-up__link" to="/signin">
            Already have an account? - Sign in here.
          </Link>
          <Link className="sign-in__link" to="/">
            Go back to home-page.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
