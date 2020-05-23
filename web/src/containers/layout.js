import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import { Location } from "@reach/router";
import Layout from "../components/layout";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/layout.scss";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
  }
`;

const LayoutContainer = props => {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = () => {
    setShowNav(true);
  };
  const handleHideNav = () => {
    setShowNav(false);
  };
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
          );
        }
        return (
          <Location>
            {({ location }) => {
              return (
                <Layout
                  {...props}
                  showNav={showNav}
                  siteTitle={data.site.title}
                  onHideNav={handleHideNav}
                  onShowNav={handleShowNav}
                  location={location}
                />
              );
            }}
          </Location>
        );
      }}
    />
  );
};

export default LayoutContainer;
