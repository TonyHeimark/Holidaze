import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Container from "../components/container";

const AboutPage = () => (
  <Layout>
    <SEO title="Om Oss" />
    <Container>
      <h1>Om Oss</h1>
      <p>Om oss alle sammen wiii</p>
      <Link to="/about/running-coach">Om Løpetreneren</Link>
      <Link to="/about/cycling-coach">Om Sykkeltreneren</Link>
    </Container>
  </Layout>
);

export default AboutPage;
