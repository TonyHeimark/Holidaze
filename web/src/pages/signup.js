import React, { useState, useEffect } from "react";
import { navigate, Link } from "gatsby";
import { setUser } from "../lib/auth";
import { useSelector } from "react-redux";
import SignUpForm from "../components/forms/signUpForm";

import logo from "../assets/logo-dark.svg";

const SignUpPage = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (userName.length >= 3 && password.length >= 6 && password === confirmPassword) {
      const usersLogin = {
        users: [
          {
            username: userName,
            password
          }
        ]
      };
      setUser(usersLogin.users);
      localStorage.setItem("users", JSON.stringify(usersLogin.users));
      navigate("/signin/");
    } else {
      return null;
    }
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
          setConfirmPassword={setConfirmPassword}
          setPassword={setPassword}
          setUserName={setUserName}
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
