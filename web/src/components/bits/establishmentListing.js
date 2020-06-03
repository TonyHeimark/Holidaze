import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";

import StarIcon from "../../assets/star-solid.svg";
import guestIcon from "../../assets/user-solid.svg";

const EstablishmentListing = ({ listing }) => {
  return (
    <div className="establishment-listing">
      <Link className="establishment-listing__content" to={`/browse/${listing._id}/`}>
        <div className="establishment-listing__image-container">
          {listing && listing._rawImage && (
            <img
              src={imageUrlFor(buildImageObj(listing._rawImage))
                .width(600)
                .url()}
              alt="listing image"
            />
          )}
        </div>
        <div className="establishment-listing__info">
          <h3>{listing.title}</h3>
          <p>{listing.description.substr(0, 120)}...</p>
          <div className="establishment-listing__meta">
            <div>
              <span className="establishment-listing__rating">
                <img src={StarIcon} alt="rating" />
                {listing.rating}
              </span>
              <span className="establishment-listing__beds">
                <img src={guestIcon} alt="amount of beds" />
                {listing.maxGuests}
              </span>
            </div>

            <span className="establishment-listing__price">
              {listing.price} NOK<span> / night</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EstablishmentListing;
