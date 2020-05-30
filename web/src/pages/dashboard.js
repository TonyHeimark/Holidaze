import React, { useEffect, useState } from "react";
import { navigate, graphql } from "gatsby";
import { useSelector } from "react-redux";
import Layout from "../components/layout";
import Container from "../components/container";
import CreateEstablishmentForm from "../components/forms/createEstablishmentForm";
import Modal from "../components/bits/modal";

import plusIcon from "../assets/plus-solid.svg";
import Widget from "../components/bits/widget";
import DashboardListing from "../components/bits/dashboardListing";

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
          _id
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
          _id
          name
          email
          phone
          guests
          check_in
          check_out
          establishmentName
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
  let enquiries = (data || {}).enquiries.edges;
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
    const query = `*[_type == "enquiries"]`;
    fetch("https://holidaze.netlify.app/.netlify/functions/fetchDirectlyFromAPI.js", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    })
      .then(res => res.json())
      .then(data => {
        console.log("success response from server..", data);
        enquiries = data.data;
      })
      .catch(err => {
        console.log("error ", err);
      });
  }, [isLoggedIn, modalShow]);

  const handleDelete = itemId => {
    const mutations = [
      {
        delete: {
          id: itemId
        }
      }
    ];
    fetch("https://holidaze.netlify.app/.netlify/functions/createAndMutateData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mutations })
    })
      .then(res => res.json())
      .then(data => {
        console.log("success response from server...", data);
        if (data.success) {
          setModalShow(false);
          // do logic, remove from state
        }
      })
      .catch(err => {
        console.log("error ", err);
      });
  };

  return (
    <Layout>
      <div className="dashboard">
        {modalShow && (
          <Modal
            modalContentComponent={modalContentComponent}
            setModalShow={setModalShow}
            setModalContentComponent={setModalContentComponent}
          />
        )}
        <Container>
          <div className="dashboard__wrapper">
            <div className="dashboard__text">
              <h1>
                Manage <span>Holidaze</span>
              </h1>
            </div>
            <div className="dashboard__widgets">
              <Widget
                handleDelete={handleDelete}
                items={messages}
                title="Messages"
                setModalShow={setModalShow}
                setModalContentComponent={setModalContentComponent}
                message={true}
              />
              <Widget
                handleDelete={handleDelete}
                items={enquiries}
                title="Enquiries"
                setModalShow={setModalShow}
                setModalContentComponent={setModalContentComponent}
                enquirie={true}
              />
            </div>
          </div>
          <div className="dashboard__establishments">
            <h2 className="widget__title">Listings</h2>
            <div className="dashboard__listings-box">
              <div className="dashboard__listings">
                {listings &&
                  listings.map(listing => (
                    <DashboardListing
                      listing={listing}
                      facilities={facilities}
                      setModalShow={setModalShow}
                      setModalContentComponent={setModalContentComponent}
                      handleDelete={handleDelete}
                    />
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
