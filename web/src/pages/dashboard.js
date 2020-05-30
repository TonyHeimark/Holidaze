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

import "../styles/layout.scss";

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
  const [stateChange, setStateChange] = useState(false);
  const [establishments, setEstablishments] = useState(null);
  const [messages, setMessages] = useState(null);
  const [enquiries, setEnquiries] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalContentComponent, setModalContentComponent] = useState(null);
  const facilities = (data || {}).facilities.edges;
  const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);

  const fetchDynamicData = (query, stateToUpdate) => {
    fetch("https://holidaze.netlify.app/.netlify/functions/fetchDirectlyFromAPI", {
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
        stateToUpdate(data.data);
      })
      .catch(err => {
        console.log("error ", err);
      });
  };

  useEffect(() => {
    //navigate to signin page if you're not logged in
    if (!isLoggedIn) {
      navigate("/signin/");
    }
    //scroll to top when modal opens
    if (typeof window !== "undefined" && modalShow) {
      window.scroll(0, 0);
    }
    //Fetching initial data for dashboard, this fetches on render.
    if (enquiries === null) {
      const query = `*[_type == "enquiries"]`;
      fetchDynamicData(query, setEnquiries);
    }
    if (messages === null) {
      const query = `*[_type == "contact"]`;
      fetchDynamicData(query, setMessages);
    }
    if (establishments === null) {
      const query = `*[_type == "establishments"]`;
      fetchDynamicData(query, setEstablishments);
    }
  }, [isLoggedIn, modalShow, stateChange]);

  // handles delete and updates state to show the admin that the item is deleted.
  const handleDelete = (itemId, type) => {
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

          if (type === "enquirie") {
            const dataState = enquiries;
            const index = dataState
              .map(item => {
                return item._id;
              })
              .indexOf(itemId);
            if (index > -1) {
              dataState.splice(index, 1);
            }
            setEnquiries(dataState);
          }

          if (type === "message") {
            const dataState = messages;
            const index = dataState
              .map(item => {
                return item._id;
              })
              .indexOf(itemId);
            if (index > -1) {
              dataState.splice(index, 1);
            }
            setMessages(dataState);
          }

          if (type === "establishment") {
            const dataState = establishments;
            const index = dataState
              .map(item => {
                return item._id;
              })
              .indexOf(itemId);
            if (index > -1) {
              dataState.splice(index, 1);
            }
            setEstablishments(dataState);
          }
          setStateChange(!stateChange);
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
                {establishments &&
                  establishments.map(listing => (
                    <DashboardListing
                      listing={listing}
                      facilities={facilities}
                      setModalShow={setModalShow}
                      setModalContentComponent={setModalContentComponent}
                      handleDelete={handleDelete}
                      key={listing._id}
                      fetchDynamicData={fetchDynamicData}
                      setStateChange={setStateChange}
                      setEstablishments={setEstablishments}
                      stateChange={stateChange}
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
                        fetchDynamicData={fetchDynamicData}
                        setStateChange={setStateChange}
                        setEstablishments={setEstablishments}
                        stateChange={stateChange}
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
