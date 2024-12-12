const Member = require("../model/Member")

exports.create=async(req,res)=>{
    try {
        const newMember=new Member(req.body)
        await newMember.save()

        delete newMember.password
        res.status(201).json(newMember)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const member=await Member.findById(id)
        res.status(200).json(member)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.getByAdminId=async(req,res)=>{
    try {
        const {id}=req.params
        const member=await Member.find({admin:id})
        res.status(200).json(member)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}


exports.getAll=async(req,res)=>{
    try {
        const members=await Member.find({})
        res.status(200).json(members)
    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Member.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Member.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}