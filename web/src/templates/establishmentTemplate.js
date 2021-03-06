import React, { useState } from "react";
import { graphql } from "gatsby";
import Establishment from "../components/establishment";
import SEO from "../components/seo";
import Layout from "../containers/layout";

import Modal from "../components/bits/modal";

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
      availableFrom
      availableUntill
      facilities {
        _id
        title
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
  const [modalShow, setModalShow] = useState(false);
  const [modalContentComponent, setModalContentComponent] = useState(null);

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
      {modalShow && (
        <Modal
          modalContentComponent={modalContentComponent}
          setModalShow={setModalShow}
          setModalContentComponent={setModalContentComponent}
        />
      )}

      {establishment && (
        <Establishment
          setModalContentComponent={setModalContentComponent}
          setModalShow={setModalShow}
          {...establishment}
        />
      )}
    </Layout>
  );
};

export default EstablishmentTemplate;
