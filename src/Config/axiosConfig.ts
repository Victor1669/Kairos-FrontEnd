import axios from "axios";
import { toast } from "react-toastify";

import { USER_TOKEN_KAIROS } from "@Utils/Storage";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await USER_TOKEN_KAIROS.get();
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

    if (error.response?.status === 401) {
      // CASO DE ACESSO INVÁLIDO
    }

    return Promise.reject(error);
  },
);

export { api };
