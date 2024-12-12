import { api } from ".";

export const getauthenticated = () => {
  return api.get("/api/v1/auth/check");
};
