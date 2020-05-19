import React from "react";
import { Link } from "gatsby";
import { Location } from "@reach/router";
import Icon from "./icon";

import logo from "../assets/logo.svg";
import logoDark from "../assets/logo-dark.svg";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => {
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
                  <li>
                    <Link to="/browse/">Browse</Link>
                  </li>
                  <li>
                    <Link to="/signin/">Sign in</Link>
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
