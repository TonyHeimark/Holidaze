import React, { useState } from "react";
import { Link } from "gatsby";
import { useSelector, useDispatch } from "react-redux";
import { setCheckin, setCheckout, setPrice, setGuests } from "../../state/filters";
import DatePicker from "react-datepicker";
import DatepickerInput from "../bits/datePickerInput";
import InputRange from "react-input-range";

import searchIcon from "../../assets/search-solid.svg";

const InitialFilter = () => {
  const [today, setToday] = useState(new Date());
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  return (
    <div className="initial-filter">
      <div className="initial-filter__content">
        {/*
          <label className="initial-filter__label" htmlFor="location">
            Location
          </label>
          <input
            className="initial-filter__input"
            placeholder="Where do you want to live?"
            value={filters.location}
            type="text"
            name="location"
            onChange={e => dispatch(setLocation(e.target.value))}
          />

          */}

        <label className="initial-filter__label" htmlFor="time">
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
            withPortal
            customInput={<DatepickerInput />}
          />

          <span> | </span>

          <DatePicker
            selected={filters.checkout}
            placeholderText="mm/dd/yyyy"
            onChange={e => dispatch(setCheckout(e))}
            minDate={filters.checkin || today}
            withPortal
            customInput={<DatepickerInput />}
          />
        </div>

        <label className="initial-filter__label" htmlFor="guests">
          Guests
        </label>
        <input
          className="initial-filter__input"
          placeholder="How many guests?"
          value={filters.guests}
          type="number"
          name="guests"
          onChange={e => dispatch(setGuests(e.target.value))}
        />
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
        <Link to="browse" className="initial-filter__button">
          <img src={searchIcon} alt="search" />
          <span>Search</span>
        </Link>
      </div>
    </div>
  );
};

export default InitialFilter;
