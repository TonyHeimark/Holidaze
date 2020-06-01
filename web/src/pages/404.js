import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import "../styles/layout.scss";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="notfound-page">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
