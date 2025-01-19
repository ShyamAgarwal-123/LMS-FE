import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export const axiosInstanceWithAuth = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});
