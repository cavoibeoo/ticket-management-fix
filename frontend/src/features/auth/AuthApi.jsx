import axios from "axios";
import { toast } from "react-toastify";

export const axiosi = axios.create({ baseURL: "http://localhost:8000", withCredentials: true });

export const loginUser = async (data) => {
    try {
        const res = await axiosi.post("/auth/login", data);
        toast.success("Login successful");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};
export const loginMember = async (data) => {
    try {
        const res = await axiosi.post("/auth/member/login", data);
        toast.success("Login successful");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};
export const signupUser = async (data) => {
    try {
        const res = await axiosi.post("/auth/signup", data);
        toast.success("Sign-up successful");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};
export const checkAuth = async () => {
    try {
        const res = await axiosi.get("/auth/checkauth");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};
export const logoutUser = async () => {
    try {
        const res = await axiosi.get("/auth/logout");
        toast.success("Logout successful");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};
