import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Container from "../components/container";

const CoachingPage = () => (
  <Layout>
    <SEO title="Coaching" />
    <Container>
      <h1>Coaching</h1>
      <p>Vi leverer både løpecoaching og sykkelcoaching</p>
      <Link to="/coaching/running-coaching">Løpetrening</Link>
      <Link to="/coaching/cycling-coaching">Sykkeltrening</Link>
    </Container>
  </Layout>
);

export default CoachingPage;
