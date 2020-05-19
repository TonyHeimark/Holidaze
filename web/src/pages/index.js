import React, { useState } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import ContactForm from "../components/forms/contactForm";
import EnquiriesForm from "../components/forms/enquiriesForm";
import CreateEstablishmentForm from "../components/forms/createEstablishmentForm";
import InitialFilter from "../components/bits/initialFilter";

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
  }
`;

const IndexPage = ({ data }) => {
  const site = (data || {}).site;

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <div className="landing-page">
        <Container>
          <div className="landing-page__wrapper">
            <div className="landing-page__text">
              <h1>
                Welcome to <span>Bergen</span>
              </h1>
            </div>
            <InitialFilter />
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default IndexPage;
