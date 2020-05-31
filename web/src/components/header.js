import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Location } from "@reach/router";
import { logout } from "../lib/auth";
import { navigate } from "gatsby";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn } from "../state/loggedIn";

import Icon from "./icon";
import logo from "../assets/logo.svg";
import logoDark from "../assets/logo-dark.svg";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    logout();
    navigate("/");
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <Location>
      {({ location }) => {
        return (
          <div
            className={`header ${location && location.pathname === "/" ? "header--white" : ""} ${
              showNav ? "header--fixed" : ""
            }`}
          >
            <div className={`header__wrapper ${showNav ? "header__wrapper--fixed" : ""}`}>
              <div className={"header__branding"}>
                <Link to="/">
                  <img src={location && location.pathname === "/" ? logo : logoDark} alt="logo" />
                </Link>
              </div>

              <button type="button" className="header__toggleNavButton" onClick={toggleNav}>
                <Icon symbol={location && location.pathname === "/" ? "white" : "dark"} />
              </button>

              <nav
                className={`header__nav ${
                  showNav
                    ? "header__showNav header__showNav--open"
                    : "header__showNav header__showNav--closed"
                }`}
              >
                <span onClick={toggleNav} className="header__nav-close">
                  X
                </span>
                <ul>
                  {isLoggedIn && (
                    <li>
                      <Link
                        className={`header__link ${
                          location && location.pathname.includes("/dashboard/")
                            ? "header__link--active"
                            : ""
                        }`}
                        to="/dashboard/"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      className={`header__link ${
                        location && location.pathname.includes("/browse/")
                          ? "header__link--active"
                          : ""
                      }`}
                      to="/browse/"
                    >
                      Browse
                    </Link>
                  </li>
                  {!isLoggedIn && (
                    <li>
                      <Link
                        className={`header__link ${
                          location && location.pathname.includes("/contact/")
                            ? "header__link--active"
                            : ""
                        }`}
                        to="/contact/"
                      >
                        Contact
                      </Link>
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
