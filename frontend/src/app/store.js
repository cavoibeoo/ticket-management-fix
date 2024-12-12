import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/auth/AuthSlice";
import UserSlice from "../features/users/UserSlice";
import ProjectSlice from "../features/projects/ProjectSlice";
import MemberSlice from "../features/members/MemberSlice";
import TicketSlice from "../features/tickets/TicketSlice";
import CommentSlice from "../features/comments/CommentSlice";


export const store=configureStore({
    reducer:{
        AuthSlice,
        UserSlice,
        ProjectSlice,
        MemberSlice,
        TicketSlice,
        CommentSlice
    }
})
