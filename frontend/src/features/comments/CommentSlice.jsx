import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createComment, deleteCommentsById, getCommentsByTicketId, updateCommentById } from "./CommentApi"


const initialState={
    status:"idle",
    comments:[],
}

export const getCommentsByTicketIdAsync=createAsyncThunk('comments/getCommentsByTicketIdAsync',async(id)=>{
    const comments=await getCommentsByTicketId(id)
    return comments
})
export const createCommentAsync=createAsyncThunk('comments/createCommentAsync',async(data)=>{
    const createdComment=await createComment(data)
    return createdComment
})
export const updateCommentByIdAsync=createAsyncThunk('comments/updateCommentByIdAsync',async(id)=>{
    const updatedComment=await updateCommentById(id)
    return updatedComment
})
export const deleteCommentsByIdAsync=createAsyncThunk('comments/deleteCommentsByIdAsync',async(id)=>{
    const deletedComment=await deleteCommentsById(id)
    return deletedComment
})

const commentSlice=createSlice({
    name:"commentSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getCommentsByTicketIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getCommentsByTicketIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.comments=action.payload
            })
            .addCase(getCommentsByTicketIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(createCommentAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(createCommentAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.comments.push(action.payload)
            })
            .addCase(createCommentAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(updateCommentByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(updateCommentByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                const index=state.comments.findIndex((comment)=>comment._id===action.payload._id)
                state.comments[index]=action.payload
            })
            .addCase(updateCommentByIdAsync.rejected,(state)=>{
                state.status='error'
            })

            .addCase(deleteCommentsByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(deleteCommentsByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.comments=state.comments.filter((comment)=>comment._id!==action.payload._id)
            })
            .addCase(deleteCommentsByIdAsync.rejected,(state)=>{
                state.status='error'
            })

    }

})


export const selectComments=(state)=>state.CommentSlice.comments

export default commentSlice.reducer