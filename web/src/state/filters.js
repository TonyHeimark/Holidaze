const initialState = {
  location: "",
  checkin: null,
  checkout: null,
  guests: 1,
  search: "",
  establishmentType: [],
  price: { min: 0, max: 3000 }
};

// CONSTANTS
const SET_LOCATION = "SET_LOCATION";
const SET_CHECKIN = "SET_CHECKIN";
const SET_CHECKOUT = "SET_CHECKOUT";
const SET_GUESTS = "SET_GUESTS";
const SET_SEARCH = "SET_SEARCH";
const SET_TYPE = "SET_TYPE";
const SET_PRICE = "SET_PRICE";

// ACTIONS
export const setLocation = location => ({
  type: SET_LOCATION,
  location
});

export const setCheckin = checkin => ({
  type: SET_CHECKIN,
  checkin
});

export const setCheckout = checkout => ({
  type: SET_CHECKOUT,
  checkout
});

export const setGuests = guests => ({
  type: SET_GUESTS,
  guests
});

export const setSearch = search => ({
  type: SET_SEARCH,
  search
});

export const setType = establishmentType => ({
  type: SET_TYPE,
  establishmentType
});

export const setPrice = price => ({
  type: SET_PRICE,
  price
});

// REDUCERS
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.location };
    case SET_CHECKIN:
      return { ...state, checkin: action.checkin };
    case SET_CHECKOUT:
      return { ...state, checkout: action.checkout };
    case SET_GUESTS:
      return { ...state, guests: action.guests };
    case SET_SEARCH:
      return { ...state, search: action.search };
    case SET_TYPE:
      return { ...state, establishmentType: action.establishmentType };
    case SET_PRICE:
      return { ...state, price: action.price };

    default:
      return state;
  }
};
