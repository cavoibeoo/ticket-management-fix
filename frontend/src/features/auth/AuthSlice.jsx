import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, loginMember, loginUser, logoutUser, signupUser } from "./AuthApi";

const initialState = {
    status: "idle",
    loggedInUser: null,
    error: "",
    isAuthChecked: false,
};

export const loginUserAsync = createAsyncThunk("auth/loginUserAsync", async (data) => {
    const res = await loginUser(data);
    return res;
});
export const loginMemberAsync = createAsyncThunk("auth/loginMemberAsync", async (data) => {
    const res = await loginMember(data);
    return res;
});
export const signupUserAsync = createAsyncThunk("auth/signupUserAsync", async (data) => {
    const res = await signupUser(data);
    return res;
});

export const checkAuthAsync = createAsyncThunk("auth/checkAuthAsync", async () => {
    const res = await checkAuth();
    return res;
});
export const logoutUserAsync = createAsyncThunk("auth/logoutUserAsync", async () => {
    const res = await logoutUser();
    return res;
});

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUser = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error;
            })

            .addCase(signupUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signupUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUser = action.payload;
            })
            .addCase(signupUserAsync.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error;
            })

            .addCase(checkAuthAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUser = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(checkAuthAsync.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error;
                state.isAuthChecked = true;
            })

            .addCase(logoutUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logoutUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUser = null;
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error;
            })

            .addCase(loginMemberAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginMemberAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUser = action.payload;
            })
            .addCase(loginMemberAsync.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error;
            });
    },
});

export const selectLoggedInUser = (state) => state.AuthSlice.loggedInUser;
export const selectisAuthChecked = (state) => state.AuthSlice.isAuthChecked;

export default authSlice.reducer;
