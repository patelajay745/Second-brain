import { api } from ".";
import { userDataTypes } from "../types/user";

export const registerUser = (userData: userDataTypes) => {
  return api.post("/api/v1/user", userData);
};

export const loginUser = (userData: userDataTypes) => {
  return api.post("/api/v1/user/login", userData);
};

export const logoutUser = () => {
  return api.post("/api/v1/user/logout");
};
