import { toast } from "react-toastify";
import { axiosi } from "../auth/AuthApi";

export const getUserProjectById = async (id) => {
    try {
        const res = await axiosi.get(`/projects/admin/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getProjectDetailsById = async (id) => {
    try {
        const res = await axiosi.get(`/projects/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addMemberByProjectId = async (projectid, memberid) => {
    try {
        const res = await axiosi.post(`/projects/${projectid}/members`, { memberid });
        toast.success("Member added successfully");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};
export const deleteMemberByProjectId = async (projectid, memberid) => {
    try {
        const res = await axiosi.delete(`/projects/${projectid}/members/${memberid}`);
        toast.success("Member deleted successfully");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};
export const createProject = async (data) => {
    try {
        const res = await axiosi.post("/projects", data);
        toast.success("Project created successfully");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
        return { error: error };
    }
};
