import { axiosi } from "../auth/AuthApi";
import { toast } from "react-toastify";

export const getTicketById = async (id) => {
    try {
        const res = await axiosi.get(`/tickets/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTicketByProjectId = async (id) => {
    try {
        const res = await axiosi.get(`/tickets/project/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getTicketByMemberId = async (id) => {
    try {
        const res = await axiosi.get(`/tickets/member/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createTicket = async (data) => {
    try {
        const res = await axiosi.post(`/tickets`, data);
        toast.success("Ticket created Successfully");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};
export const updateTicketById = async (update) => {
    try {
        const res = await axiosi.patch(`/tickets/${update._id}`, update);
        toast.success("Ticket updated Successfully");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};

export const deleteTicketById = async (id) => {
    try {
        const res = await axiosi.delete(`/tickets/${id}`);
        toast.success("Ticket deleted Successfully");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};
