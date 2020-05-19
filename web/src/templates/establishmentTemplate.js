import React from "react";
import { graphql } from "gatsby";
import Establishment from "../components/establishment";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query EstablishmentTemplateQuery($id: String!) {
    establishment: sanityEstablishments(id: { eq: $id }) {
      title
      price
      rating
      longitude
      latitude
      bedrooms
      beds
      description
      facilities {
        title
        _id
        _key
      }
      _id
      id
      typeOfEstablishment
      maxGuests
      _rawImage
    }
  }
`;

const EstablishmentTemplate = ({ data, errors }) => {
  const establishment = data && data.establishment;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {establishment && (
        <SEO
          title={establishment.title || "Untitled"}
          description={establishment.description}
          image={establishment.image}
        />
      )}

      {establishment && <Establishment {...establishment} />}
    </Layout>
  );
};

export default EstablishmentTemplate;
