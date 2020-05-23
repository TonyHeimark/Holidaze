import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCheckin,
  setCheckout,
  setLocation,
  setGuests,
  setSearch,
  setPrice,
  setType
} from "../../state/filters";
import InputRange from "react-input-range";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Filters = () => {
  const [today, setToday] = useState(new Date());
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const handleTypes = e => {
    const typeArray = filters.establishmentType;
    if (typeArray.includes(e.target.innerHTML)) {
      const index = typeArray.indexOf(e.target.innerHTML);
      if (index > -1) {
        typeArray.splice(index, 1);
      }
    } else {
      typeArray.push(e.target.innerHTML);
    }
    dispatch(setType(typeArray));
  };

  return (
    <div className="filters">
      <label className="filters__label" htmlFor="searcg">
        Search
      </label>
      <input
        className="filters__input"
        placeholder="Search for place"
        value={filters.search}
        type="text"
        name="search"
        onChange={e => dispatch(setSearch(e.target.value))}
      />
      {/*
        
        <label className="filters__label" htmlFor="location">
          Location
        </label>
        <input
          className="filters__input"
          placeholder="Where do you want to live?"
          value={filters.location}
          type="text"
          name="location"
          onChange={e => dispatch(setLocation(e.target.value))}
        />


        */}
      <label className="filters__label" htmlFor="time">
        Check-in / Check-out
      </label>

      <div
        className="filters__input filters__input--wrapper"
        placeholder="How long is your stay?"
        type="text"
        name="time"
      >
        <DatePicker
          selected={filters.checkin}
          placeholderText="mm/dd/yyyy"
          onChange={e => dispatch(setCheckin(e))}
          maxDate={filters.checkout}
          minDate={today}
        />

        <span> | </span>

        <DatePicker
          selected={filters.checkout}
          placeholderText="mm/dd/yyyy"
          onChange={e => dispatch(setCheckout(e))}
          minDate={filters.checkin}
        />
      </div>

      <label className="filters__label" htmlFor="guests">
        Guests
      </label>
      <input
        className="filters__input filters__input--small"
        placeholder="0"
        value={filters.guests}
        type="number"
        name="guests"
        onChange={e => dispatch(setGuests(e.target.value))}
      />

      <label className="filters__label" htmlFor="type">
        Type of place
      </label>
      <div name="type" className="filters__checkbox">
        <div
          tabIndex="0"
          className={`filters__checkbox-button ${filters &&
            filters.establishmentType.includes("Hotel room") &&
            "filters__checkbox-button--active"}`}
          onClick={handleTypes}
        >
          Hotel room
        </div>
        <div
          tabIndex="0"
          className={`filters__checkbox-button ${filters &&
            filters.establishmentType.includes("Entire place") &&
            "filters__checkbox-button--active"}`}
          onClick={handleTypes}
        >
          Entire place
        </div>
        <div
          tabIndex="0"
          className={`filters__checkbox-button ${filters &&
            filters.establishmentType.includes("Shared room") &&
            "filters__checkbox-button--active"}`}
          onClick={handleTypes}
        >
          Shared room
        </div>
        <div
          tabIndex="0"
          className={`filters__checkbox-button ${filters &&
            filters.establishmentType.includes("Private room") &&
            "filters__checkbox-button--active"}`}
          onClick={handleTypes}
        >
          Private room
        </div>
      </div>
      <label className="filters__label" htmlFor="price">
        Price
      </label>
      <InputRange
        step={2}
        maxValue={3000}
        minValue={0}
        value={filters.price}
        formatLabel={value => `${value},-`}
        onChange={value => dispatch(setPrice(value))}
      />
    </div>
  );
};

export default Filters;
