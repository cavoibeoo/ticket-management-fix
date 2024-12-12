import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserById } from "./UserApi";

const initialState={
    status:'idle',
    userInfo:null
}

export const fetchLoggedInUserByIdAsync=createAsyncThunk('users/fetchLoggedInUserByIdAsync',async(id)=>{
    const user=await fetchLoggedInUserById(id)
    return user
})

const userSlice=createSlice({
    name:"userSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchLoggedInUserByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(fetchLoggedInUserByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.userInfo=action.payload
            })
            .addCase(fetchLoggedInUserByIdAsync.rejected,(state)=>{
                state.status='error'
            })
    }
})

export default userSlice.reducer