import axios from "axios";
import { toast } from "react-toastify";

import { REFRESH_TOKEN_KAIROS, ACCESS_TOKEN_KAIROS } from "@Utils/Storage";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await ACCESS_TOKEN_KAIROS.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);
    return response;
  },
  async (error) => {
    toast.error(error.response.data.message);

    const status = error.response?.status;

    if (status === 401 || status === 403) {
      Promise.all([
        REFRESH_TOKEN_KAIROS.delete(),
        ACCESS_TOKEN_KAIROS.delete(),
      ]);
    }

    return Promise.reject(error);
  },
);

export { api };
