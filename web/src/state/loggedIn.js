import { isLoggedIn } from "../lib/auth";

const initialState = {
  isLoggedIn: isLoggedIn()
};

// CONSTANTS
const SET_ISLOGGEDIN = "SET_ISLOGGEDIN";

// ACTIONS
export const setIsLoggedIn = isLoggedIn => ({
  type: SET_ISLOGGEDIN,
  isLoggedIn
});

// REDUCERS
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ISLOGGEDIN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};
