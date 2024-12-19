import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("Request Config:", {
      url: config.url,
      headers: config.headers,
      withCredentials: config.withCredentials,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    return Promise.reject(error);
  }
);
