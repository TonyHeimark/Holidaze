import React, { useEffect, useState } from "react";
import { navigate, Link } from "gatsby";
import { handleLogin } from "../lib/auth";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn } from "../state/loggedIn";
import SignInForm from "../components/forms/signInForm";

import logo from "../assets/logo-dark.svg";

import "../styles/layout.scss";

const SignInPage = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (
      users.some(user => {
        return user.username === userName && user.password === password;
      })
    ) {
      setAuthenticated(true);
      dispatch(setIsLoggedIn(true));
      handleLogin(true);
      navigate("/");
    } else {
      setAuthenticated(false);
      setUserName("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="sign-in">
      <div className="sign-in__wrapper">
        <Link to="/">
          <img className="sign-in__brand-img" src={logo} />
        </Link>
        <SignInForm
          password={password}
          userName={userName}
          setUserName={setUserName}
          setPassword={setPassword}
          handleSignIn={handleSignIn}
          authenticated={authenticated}
        />
        <div className="sign-in__link-box">
          <Link className="sign-in__link" to="/signup">
            Don't have an account? - sign up here.
          </Link>
          <Link className="sign-in__link" to="/">
            Go back to home-page.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
