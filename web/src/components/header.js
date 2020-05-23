import React from "react";
import { Link } from "gatsby";
import { Location } from "@reach/router";
import { logout } from "../lib/auth";
import { navigate } from "gatsby";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn } from "../state/loggedIn";

import Icon from "./icon";
import logo from "../assets/logo.svg";
import logoDark from "../assets/logo-dark.svg";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    logout();
    navigate("/");
  };
  return (
    <Location>
      {({ location }) => {
        return (
          <div className={`header ${location && location.pathname === "/" && "header--white"}`}>
            <div className="header__wrapper">
              <div className={"header__branding"}>
                <Link to="/">
                  <img src={location && location.pathname === "/" ? logo : logoDark} alt="logo" />
                </Link>
              </div>

              <button className="header__toggleNavButton" onClick={showNav ? onHideNav : onShowNav}>
                <Icon symbol="hamburger" />
              </button>

              <nav className={`header__nav ${showNav && "header__showNav"}`}>
                <ul>
                  {isLoggedIn && (
                    <li>
                      <Link to="/dashboard/">Dashboard</Link>
                    </li>
                  )}
                  <li>
                    <Link to="/browse/">Browse</Link>
                  </li>
                  {!isLoggedIn && (
                    <li>
                      <Link to="/contact/">Contact</Link>
                    </li>
                  )}
                  <li>
                    {isLoggedIn ? (
                      <button onClick={handleLogout}>Sign out</button>
                    ) : (
                      <Link to="/signin/">Sign in</Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        );
      }}
    </Location>
  );
};

export default Header;
