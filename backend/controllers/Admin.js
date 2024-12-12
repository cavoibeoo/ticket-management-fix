const Admin = require("../model/Admin")


exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const user=(await Admin.findById(id)).toObject()
        delete user.password
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.getAll=async(req,res)=>{
    try {
        const users=await Admin.find({})
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Admin.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)

    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}
exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Admin.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"})
        console.log(error)
    }
}