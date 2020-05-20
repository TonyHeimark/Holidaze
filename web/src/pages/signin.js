import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { handleLogin } from "../lib/auth";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn } from "../state/loggedIn";
import SignInForm from "../components/forms/signInForm";

import logo from "../assets/logo.svg";

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
        <img className="sign-in__brand-img" src={logo} />
        <SignInForm
          password={password}
          userName={userName}
          setUserName={setUserName}
          setPassword={setPassword}
          handleSignIn={handleSignIn}
          authenticated={authenticated}
        />
      </div>
    </div>
  );
};

export default SignInPage;
