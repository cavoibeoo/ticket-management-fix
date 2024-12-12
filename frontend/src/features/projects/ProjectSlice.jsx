import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMemberByProjectId, createProject, deleteMemberByProjectId, getProjectDetailsById, getUserProjectById } from "./ProjectApi";


const initialState={
    status:"idle",
    projects:[],
    selectProject:null,
}

export const getProjectByIdAsync=createAsyncThunk("projects/getProjectByIdAsync",async(id)=>{
    const projects=getUserProjectById(id)
    return projects
})
export const getProjectDetailsByIdAsync=createAsyncThunk("projects/getProjectDetailsByIdAsync",async(id)=>{
    const selectedProjectDetails=getProjectDetailsById(id)
    return selectedProjectDetails
})
export const createProjectAsync=createAsyncThunk("projects/createProjectAsync",async(data)=>{
    const createdProject=createProject(data)
    return createdProject
})
export const addMemberByProjectIdAsync=createAsyncThunk("projects/addMemberByProjectIdAsync",async({projectId,memberId})=>{
    const updatedProject=addMemberByProjectId(projectId,memberId)
    return updatedProject
})
export const deleteMemberByProjectIdAsync=createAsyncThunk("projects/deleteMemberByProjectIdAsync",async({projectId,memberId})=>{
    const updatedProject=deleteMemberByProjectId(projectId,memberId)
    return updatedProject
})

const projectSlice=createSlice({
    name:"projectSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getProjectByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getProjectByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.projects=action.payload
            })
            .addCase(getProjectByIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(createProjectAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(createProjectAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.projects.push(action.payload)
            })
            .addCase(createProjectAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(getProjectDetailsByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getProjectDetailsByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.selectProject=action.payload
            })
            .addCase(getProjectDetailsByIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(addMemberByProjectIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(addMemberByProjectIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.selectProject=action.payload
            })
            .addCase(addMemberByProjectIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(deleteMemberByProjectIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(deleteMemberByProjectIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.selectProject=action.payload
            })
            .addCase(deleteMemberByProjectIdAsync.rejected,(state)=>{
                state.status='error'
            })
    }
})


export const selectProjects=(state)=>state.ProjectSlice.projects
export const selectSelectedProject=(state)=>state.ProjectSlice.selectProject

export default projectSlice.reducer