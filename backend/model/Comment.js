const mongoose=require('mongoose')
const {Schema}=mongoose


const commentSchema=new Schema({
    message:{
        type:String,
        required:true
    },
    member:{
        type:Schema.Types.ObjectId,
        ref:"Member"
    },
    ticket:{
        type:Schema.Types.ObjectId,
        ref:"Ticket"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Comment",commentSchema)