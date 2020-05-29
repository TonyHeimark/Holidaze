import React from "react";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import EditEstablishmentForm from "../forms/editEstablishmentForm";

const DashboardListing = ({
  listing,
  setModalContentComponent,
  setModalShow,
  facilities,
  handleDelete
}) => {
  return (
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
                handleDelete={handleDelete}
                facilities={facilities}
                listingToEdit={listing.node}
                setModalShow={setModalShow}
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
