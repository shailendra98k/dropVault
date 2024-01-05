export const API_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost/api/v1"
    : "https://dropvault.fun/api/v1";
export const BASE_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost"
    : "https://dropvault.fun";

export const URL_PATHS = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  DRIVE: "/drive",
};

export const SESSION_ITEMS = {
  USER: "user",
};
