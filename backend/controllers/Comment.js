const Comment = require("../model/Comment")

// create
exports.create=async(req,res)=>{
    try {
        const newComment=new Comment(req.body)
        await newComment.save()
        res.status(201).json(newComment)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.getByTicketId=async(req,res)=>{
    try {
        const {id}=req.params
        const comments=await Comment.find({ticket:id})
        res.status(200).json(comments)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Comment.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Comment.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}