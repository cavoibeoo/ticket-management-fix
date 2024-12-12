import { toast } from "react-toastify";
import { axiosi } from "../auth/AuthApi";

export const getCommentsByTicketId = async (id) => {
    try {
        const res = await axiosi.get(`/comments/ticket/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const createComment = async (data) => {
    try {
        const res = await axiosi.post(`/comments`, data);
        toast.success("Comment created successfully");
        return res.data;
    } catch (error) {
        toast.error("Error creating comment");
        console.log(error);
    }
};
export const updateCommentById = async (update) => {
    try {
        const res = await axiosi.patch(`/comments/${update._id}`, update);
        toast.success("Comment updated successfully");
        return res.data;
    } catch (error) {
        toast.error("Error updating comment");
        console.log(error);
    }
};
export const deleteCommentsById = async (id) => {
    try {
        const res = await axiosi.delete(`/comments/${id}`);
        toast.success("Comment deleted successfully");
        return res.data;
    } catch (error) {
        toast.error("Error deleting comment");
        console.log(error);
    }
};
