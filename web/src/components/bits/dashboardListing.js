import React from "react";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import EditEstablishmentForm from "../forms/editEstablishmentForm";

const DashboardListing = ({
  listing,
  setModalContentComponent,
  setModalShow,
  facilities,
  handleDelete,
  fetchDynamicData,
  setStateChange,
  setEstablishments,
  stateChange
}) => {
  return (
    <div key={listing._id} className="dashboard-listing">
      {listing && listing.image && (
        <img
          className="dashboard-listing__image"
          src={imageUrlFor(buildImageObj(listing.image))
            .width(400)
            .url()}
          alt="listing image"
        />
      )}
      <div className="dashboard-listing__content">
        <h3 className="dashboard-listing__title">
          {listing.title.substr(0, 22)}
          {listing.title.length > 22 && "..."}
        </h3>
        <button
          onClick={e => {
            setModalShow(true);
            setModalContentComponent(
              <EditEstablishmentForm
                handleDelete={handleDelete}
                facilities={facilities}
                listingToEdit={listing}
                setModalShow={setModalShow}
                fetchDynamicData={fetchDynamicData}
                setStateChange={setStateChange}
                setEstablishments={setEstablishments}
                stateChange={stateChange}
              />
            );
          }}
          className="dashboard-listing__button"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default DashboardListing;
