const initialState = {
  establishments: null,
  messages: null,
  enquiries: null
};

// CONSTANTS
const SET_ESTABLISHMENTS = "SET_ESTABLISHMENTS";
const SET_MESSAGES = "SET_MESSAGES";
const SET_ENQUIRIES = "SET_ENQUIRIES";

// ACTIONS
export const setEstablishments = establishments => ({
  type: SET_ESTABLISHMENTS,
  establishments
});

export const setMessages = messages => ({
  type: SET_MESSAGES,
  messages
});

export const setEnquiries = enquiries => ({
  type: SET_ENQUIRIES,
  enquiries
});

// REDUCERS
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ESTABLISHMENTS:
      return { ...state, establishments: action.establishments };
    case SET_MESSAGES:
      return { ...state, messages: action.messages };
    case SET_ENQUIRIES:
      return { ...state, enquiries: action.enquiries };

    default:
      return state;
  }
};
