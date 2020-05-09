import React from "react";
import Header from "./header";

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle }) => (
  <>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div className="content">{children}</div>
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__siteInfo">
          &copy; {new Date().getFullYear()}, Built with <a href="https://www.sanity.io">Sanity</a>{" "}
          &amp;
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </footer>
  </>
);

export default Layout;
