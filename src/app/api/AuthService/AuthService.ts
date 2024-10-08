import { $privateApi } from "../privateApi";
import { $publicApi } from "../publicApi";

// пока не проверял во взаимодействии с бэкэндом

export const checkRefreshValidity = async () => {
    const { data } = await $privateApi.post("/users/token/refresh/");
    if(data){
        localStorage.setItem("token", data.access);
    }
};

export const register = async (login: string, password: string) => {
    const {data} = await $publicApi.post("/users/register/", {username: login, password});
    localStorage.setItem('token', data.access);
    return data;
}
export const login = async (login: string, password: string) => {
    const {data} = await $publicApi.post("/users/login/", {username: login, password});
    localStorage.setItem('token', data.access);
    return data;
}