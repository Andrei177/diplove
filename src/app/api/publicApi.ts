import axios from "axios";
import { API_URL } from "./privateApi";

export const $publicApi = axios.create({
    baseURL: API_URL,
    withCredentials: true
})