import API from "./Axios";

import type { LoginFormData, RegisterFormData } from "../zod/auth.schema";


export const getProfile = async () => {
    const res = await API.get("/profile");
    return res.data;
};

export const registerUser = async (data: RegisterFormData) => {
    const res = await API.post("/auth/register", data);
    return res.data;
};

export const loginUser = async (data: LoginFormData) => {
    return await API.post("/auth/login", data);
};

export const logoutUser = async () => {
    return await API.post("/auth/logout");
};