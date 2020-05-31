import React from "react";
import { Link } from "gatsby";
import Container from "./container";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import EnquiriesForm from "./forms/enquiriesForm";

import StarIcon from "../assets/star-solid.svg";
import LeftArrow from "../assets/leftArrow.svg";

const Establishment = ({
  title,
  price,
  rating,
  latitude,
  longitude,
  bedrooms,
  availableFrom,
  availableUntill,
  beds,
  description,
  facilities,
  typeOfEstablishment,
  maxGuests,
  _rawImage,
  id,
  _id,
  setModalContentComponent,
  setModalShow
}) => {
  return (
    <Container>
      <div className="establishment-page">
        <Link className="establishment-page__backlink" to="/browse">
          <span>Go back to browse</span>
          <img src={LeftArrow} alt="go back to browse arrow" />
        </Link>
        <div className="establishment-page__top-container">
          <div className="establishment-page__image-container">
            <img
              className="dashboard-listing__image"
              src={imageUrlFor(buildImageObj(_rawImage))
                .width(800)
                .url()}
              alt={`${title}`}
            />
          </div>
          <div className="establishment-page__description-container">
            <h1 className="establishment-page__title">{title}</h1>
            <p>{description}</p>

            <div className="establishment-page__meta-info">
              <div className="establishment-page__core-info">
                <span className="establishment-page__rating">
                  <img src={StarIcon} alt="rating" />
                  {rating}
                </span>

                <span className="establishment-page__price">
                  {price} NOK<span> / night</span>
                </span>
              </div>
              <div>
                <button
                  onClick={() => {
                    setModalShow(true);
                    setModalContentComponent(
                      <EnquiriesForm
                        id={_id}
                        title={title}
                        image={_rawImage}
                        availableFrom={availableFrom}
                        availableUntill={availableUntill}
                        setModalContentComponent={setModalContentComponent}
                        price={price}
                        maxGuests={maxGuests}
                      />
                    );
                  }}
                  className="establishment-page__button"
                >
                  <span>Book now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="establishment-page__living-arangements">
          <h2 className="establishment-page__headline">
            Living arangement - {typeOfEstablishment}
          </h2>
          <span>{`${maxGuests} guests - ${bedrooms} bedrooms - ${beds / bedrooms} ${
            beds / bedrooms > 1 ? "beds" : "bed"
          } per bedroom`}</span>
        </div>
        <div className="establishment-page__info">
          <div className="establishment-page__column">
            <h3 className="establishment-page__headline">Facilities</h3>
            <div className="establishment-page__facilities">
              {facilities &&
                facilities.map(f => (
                  <span key={f._id}>
                    &#8226;<span>{f.title}</span>
                  </span>
                ))}
            </div>
            {/* <h3 className="establishment-page__headline">Reviews</h3>
            <div className="establishment-page__reviews"></div> */}
          </div>
          <div className="establishment-page__column">
            <h3 className="establishment-page__headline">Location</h3>
            <div className="establishment-page__map">
              <iframe
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDR_sCmVQlRXojO3S5UP4LtzsRzEciT_sE&q=${latitude},${longitude}&zoom=12`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Establishment;
