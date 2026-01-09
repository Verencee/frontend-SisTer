import axios, { type InternalAxiosRequestConfig } from "axios";

export const authAPI = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 15000,
});

export const dataAPI = axios.create({
  baseURL: "http://localhost:3002",
  timeout: 15000,
});

dataAPI.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
