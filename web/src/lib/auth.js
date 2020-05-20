export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("users")
    ? JSON.parse(window.localStorage.getItem("users"))
    : {};

export const setUser = user => window.localStorage.setItem("users", JSON.stringify(user));

export const handleLogin = value => {
  localStorage.setItem("isLoggedIn", value);
};

export const isLoggedIn = () => {
  if (!isBrowser()) {
    return false;
  }
  return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
};

export const logout = () => {
  setIsLoggedIn(false); // state
  localStorage.removeItem("isLoggedIn");
};
