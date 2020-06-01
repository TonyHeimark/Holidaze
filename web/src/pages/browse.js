import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import SEO from "../components/seo";
import { useSelector } from "react-redux";
import Layout from "../containers/layout";
import Filters from "../components/filters";
import EstablishmentListing from "../components/bits/establishmentListing";

import "../styles/layout.scss";

export const query = graphql`
  query BrowsePageQuery {
    allSanityEstablishments {
      edges {
        node {
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
    }
  }
`;

const Browse = ({ data }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const establishments = (data || {}).allSanityEstablishments.edges;
  const filters = useSelector(state => state.filters);
  const [listingsToShow, setListingsToShow] = useState(establishments || []);

  useEffect(() => {
    const allListings = establishments;
    const filteredListings = allListings.filter(node => {
      const listing = node.node;
      const price = listing.price > filters.price.min && listing.price < filters.price.max;
      const search = listing.title.toLowerCase().includes(filters.search.toLowerCase());
      const guests = listing.maxGuests >= filters.guests;
      const type =
        filters.establishmentType.length === 0 ||
        filters.establishmentType.includes(listing.typeOfEstablishment);
      if (price && search && guests && type) {
        return listing;
      } else {
        return;
      }
    });
    setListingsToShow(filteredListings);
  }, [filters]);

  return (
    <Layout>
      <SEO title="Browse" />
      <Container>
        <div className="browse">
          <div className="browse__content">
            <div className={`browse__filters ${filterOpen && "browse__filters--open"}`}>
              <span
                onClick={() => setFilterOpen(!filterOpen)}
                className={`browse__filters-headline ${filterOpen &&
                  "browse__filters-headline--open"}`}
              >
                {filterOpen ? "Close filters" : "Filters"}
              </span>
              <Filters filterOpen={filterOpen} />
            </div>
            <div className="browse__listings">
              {listingsToShow &&
                listingsToShow.map(listing => (
                  <EstablishmentListing key={listing.node._id} listing={listing.node} />
                ))}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Browse;
