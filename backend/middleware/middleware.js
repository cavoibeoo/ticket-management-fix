require('dotenv').config()
const jwt=require("jsonwebtoken")

exports.verifyToken=async(req,res,next)=>{
    try {
        const {token}=req.cookies
        console.log(token)
        const decodedInfo=jwt.verify(token,process.env.SECRET_KEY)
        if(decodedInfo && decodedInfo._id &&  decodedInfo.name){
            req.user=decodedInfo
            next()
        }
        else{
            res.status(401).json({"message":"Token has expired, please login again"})
        }
    } catch (error) {
        res.status(500).json({'message':"internal server error"})
        console.log(error)
    }
}