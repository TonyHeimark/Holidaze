import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, location }) => (
  <>
    <Header
      location={location}
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
    />
    <div className="content">{children}</div>
    <Footer />
  </>
);

export default Layout;
