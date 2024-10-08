import axios, { AxiosError } from "axios";

export const API_URL = "http://localhost:8000/api";

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

    console.log(error, "Возникла ошибка при перехвате ответа от сервера");
    

    if (error.status == 401) {
      try {
        const response = await axios.post(
          `${API_URL}/users/token/refresh/`,
          {},
          { withCredentials: true }
        ); // если Влад поменяет на get, то убрать тело запроса

        localStorage.setItem("token", response.data.access);

        return $privateApi.request(originalRequest);

      } catch (err) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
  }
);
