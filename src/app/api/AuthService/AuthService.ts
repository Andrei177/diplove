import { $privateApi } from "../privateApi";
import { $publicApi } from "../publicApi";

// пока не проверял во взаимодействии с бэкэндом

export const checkRefreshValidity = async () => {
    const response = await $privateApi.get("/user/token/refresh/");

    if(response.data){
        localStorage.setItem("token", response.data.access);
    }
};

export const register = async (login: string, password: string) => {
    const {data} = await $publicApi.post("/user/register/", {username: login, password});
    localStorage.setItem('token', data.access);
    return data;
}
export const login = async (login: string, password: string) => {
    const {data} = await $publicApi.post("/user/login/", {username: login, password});
    localStorage.setItem('token', data.access);
    return data;
}