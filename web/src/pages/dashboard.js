import React, { useEffect, useState } from "react";
import { navigate, graphql } from "gatsby";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn } from "../state/loggedIn";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import Layout from "../components/layout";
import Container from "../components/container";
import ReadMessage from "../components/bits/readMessage";

import rightArrow from "../assets/sort-down-solid.svg";
import plusIcon from "../assets/plus-solid.svg";
import CreateEstablishmentForm from "../components/forms/createEstablishmentForm";
import EditEstablishmentForm from "../components/forms/editEstablishmentForm";
import ReadEnquiries from "../components/bits/readEnquiries";

export const query = graphql`
  query DashboardQuery {
    facilities: allSanityFacilities {
      edges {
        node {
          _id
          title
        }
      }
    }
    messages: allSanityContact {
      edges {
        node {
          id
          email
          _key
          message
          name
        }
      }
    }
    enquiries: allSanityEnquiries {
      edges {
        node {
          _key
          id
          name
          email
          phone
          guests
          check_in
          check_out
        }
      }
    }
    listings: allSanityEstablishments {
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
            _ref: _id
            _key: _id
            _type
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

const Dashboard = ({ data }) => {
  const enquiries = (data || {}).enquiries.edges;
  const messages = (data || {}).messages.edges;
  const listings = (data || {}).listings.edges;
  const facilities = (data || {}).facilities.edges;
  const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);

  const [modalShow, setModalShow] = useState(false);

  const [modalContentComponent, setModalContentComponent] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin/");
    }
    if (typeof window !== "undefined" && modalShow) {
      window.scroll(0, 0);
    }
  }, [isLoggedIn, modalShow]);

  return (
    <Layout>
      <div className="dashboard">
        {modalShow && (
          <div className="modal">
            <div className="modal__box">
              <button
                className="modal__close-button"
                onClick={() => {
                  setModalShow(false);
                  setModalContentComponent(null);
                }}
              >
                X
              </button>
              <div className="modal__content">{modalContentComponent}</div>
            </div>
          </div>
        )}
        <Container>
          <div className="dashboard__wrapper">
            <div className="dashboard__text">
              <h1>
                Manage <span>Holidaze</span>
              </h1>
            </div>
            <div className="dashboard__widgets">
              <div className="widget">
                <h2 className="widget__title">Messages</h2>
                <div className="widget__box">
                  <div className="widget__content">
                    {messages &&
                      messages.map(node => (
                        <button
                          onClick={() => {
                            setModalShow(true);
                            setModalContentComponent(<ReadMessage message={node.node} />);
                          }}
                          key={node.node.id}
                          className="widget__button"
                        >
                          {node.node.name}
                          <img src={rightArrow} alt="message" />{" "}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
              <div className="widget">
                <h2 className="widget__title">Enquiries</h2>
                <div className="widget__box">
                  <div className="widget__content">
                    {enquiries &&
                      enquiries.map(node => (
                        <button
                          onClick={() => {
                            setModalShow(true);
                            setModalContentComponent(<ReadEnquiries enquirie={node.node} />);
                          }}
                          key={node.node.id}
                          className="widget__button"
                        >
                          {node.node.name}
                          <img src={rightArrow} alt="enquirie" />{" "}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard__establishments">
            <h2 className="widget__title">Listings</h2>
            <div className="dashboard__listings-box">
              <div className="dashboard__listings">
                {listings &&
                  listings.map(listing => (
                    <div key={listing.node._id} className="dashboard-listing">
                      {listing.node && listing.node._rawImage && (
                        <img
                          className="dashboard-listing__image"
                          src={imageUrlFor(buildImageObj(listing.node._rawImage))
                            .width(400)
                            .url()}
                          alt="listing image"
                        />
                      )}
                      <div className="dashboard-listing__content">
                        <h3 className="dashboard-listing__title">
                          {listing.node.title.substr(0, 22)}
                          {listing.node.title.length > 22 && "..."}
                        </h3>
                        <button
                          onClick={e => {
                            setModalShow(true);
                            setModalContentComponent(
                              <EditEstablishmentForm
                                facilities={facilities}
                                listingToEdit={listing.node}
                              />
                            );
                          }}
                          className="dashboard-listing__button"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="dashboard__listings-buttons">
                <button
                  onClick={() => {
                    setModalShow(true);
                    setModalContentComponent(
                      <CreateEstablishmentForm
                        facilities={facilities}
                        setModalShow={setModalShow}
                      />
                    );
                  }}
                  className="dashboard__button"
                >
                  <img src={plusIcon} alt="create new listing" /> <span>Create new</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Dashboard;
