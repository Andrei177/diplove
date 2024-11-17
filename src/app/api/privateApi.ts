import axios, { AxiosError } from "axios";

//http://localhost:8000/api
//http://localhost:8000
export const API_URL = "http://188.120.231.10:8000/api";
export const BACKEND_URL = "http://188.120.231.10:8000";

export const $privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// перехватчик на запросе
$privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// перехватчик на ответе
$privateApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error: AxiosError) => {
    const originalRequest = error.request;

    if (error.response && error.response.status == 401) {
      try {
        const response = await axios.get(
          `${API_URL}/user/token/refresh/`,
          { withCredentials: true }
        );

        localStorage.setItem("token", response.data.access);

        return $privateApi.request(originalRequest);

      } catch (err) {
        localStorage.removeItem("token");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
