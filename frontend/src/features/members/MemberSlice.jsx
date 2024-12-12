import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createMember, getMembersByAdminId } from "./MemberApi";


const initialState={
    status:"idle",
    members:[],
}

export const getMembersByAdminIdAsync=createAsyncThunk("members/getMembersByAdminIdAsync",async(id)=>{
    const members=await getMembersByAdminId(id)
    return members
})

export const createMemberAsync=createAsyncThunk("members/createMemberAsync",async(data)=>{
    const createdMember=await createMember(data)
    return createdMember
})

const memberSlice=createSlice({
    name:"memberSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getMembersByAdminIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getMembersByAdminIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.members=action.payload
            })
            .addCase(getMembersByAdminIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(createMemberAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(createMemberAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.members.push(action.payload)
            })
            .addCase(createMemberAsync.rejected,(state)=>{
                state.status='error'
            })
    }
})


export const selectMembers=(state)=>state.MemberSlice.members

export default memberSlice.reducer