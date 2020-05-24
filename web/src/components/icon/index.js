import React from "react";
import HamburgerDark from "../../assets/hamburger-dark.svg";
import HamburgerWhite from "../../assets/hamburger-white.svg";

const Icon = props => {
  switch (props.symbol) {
    case "dark":
      return <img src={HamburgerDark} alt="navigation menu" />;
    case "white":
      return <img src={HamburgerWhite} alt="navigation menu" />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
};

export default Icon;
