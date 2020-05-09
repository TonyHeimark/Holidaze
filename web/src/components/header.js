import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
//import { cn } from "../lib/helpers";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className="header">
    <div className="header__wrapper">
      <div className={"header__branding"}>
        <Link to="/">PG TRENINGSLAB</Link>
      </div>

      <button className="header__toggleNavButton" onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol="hamburger" />
      </button>

      <nav className={`header__nav ${showNav && "header__showNav"}`}>
        <ul>
          <li>
            <Link to="/about/">Om Oss</Link>
          </li>
          <li>
            <Link to="/coaching/">Coaching</Link>
          </li>
          <li>
            <Link to="/blog/">Blogg</Link>
          </li>
          <li>
            <Link to="/omtaler/">Omtaler</Link>
          </li>
          <li>
            <Link to="/priser/">Priser</Link>
          </li>
          <li>
            <Link to="/kontakt/">Kontakt</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
