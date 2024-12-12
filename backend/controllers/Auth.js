require('dotenv').config()
const { sanitizeUser } = require("../common/common")
const User = require("../model/Admin")
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const Member = require('../model/Member')


exports.signup=async(req,res)=>{
    try {
        const isExistingUser=await User.findOne({email:req.body.email})

        if(isExistingUser){
            return res.status(400).json({'message':'User already Exists'})
        }

        const hashedPassword=await bcrypt.hash(req.body.password,10)
        req.body.password=hashedPassword

        const newUser=new User(req.body)
        await newUser.save()

        const sanitizedUser=sanitizeUser(newUser)

        const token=jwt.sign(sanitizedUser,process.env.SECRET_KEY)
        res.cookie('token',token,{
            httpOnly:true,
            sameSite:'Lax',
            maxAge: 3600000,
        })
        res.status(201).json(sanitizedUser)

    } catch (error) {
        console.log(error)
        res.status(500).json({'message':"Internal server Error"})
    }
}
exports.login=async(req,res)=>{
    try {
        const isExistingUser=await User.findOne({email:req.body.email})
        
        console.log('work',req.body.email);

        if(isExistingUser && (await bcrypt.compare(req.body.password,isExistingUser.password))){
            const sanitizedUser=sanitizeUser(isExistingUser)
            const token=jwt.sign(sanitizedUser,process.env.SECRET_KEY)
            res.cookie('token',token,{
                httpOnly:true,
                sameSite:"Lax",
                maxAge: 3600000
            })
            return res.status(200).json(sanitizedUser)
        }
                
        else{
            return res.status(400).json({"message":"Invalid Credentails"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({"message":"internal server error"})
    }
}
exports.loginMember=async(req,res)=>{
    try {
        const isExistingUser=await Member.findOne({email:req.body.email})
        
        if(isExistingUser){
            const sanitizedUser=sanitizeUser(isExistingUser)
            const token=jwt.sign(sanitizedUser,process.env.SECRET_KEY)
            res.cookie('token',token,{
                httpOnly:true,
                sameSite:"Lax",
                maxAge: 3600000
            })
            return res.status(200).json(sanitizedUser)
        }
                
        else{
            return res.status(400).json({"message":"Invalid Credentails"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({"message":"internal server error"})
    }
}
exports.checkAuth=async(req,res)=>{
    try {
        if(req.user){
            return res.status(200).json(req.user)
        }
        else{
            return res.status(401).json({'message':"Please login again"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({'message':'interval server error'})
    }
}
exports.logout=async(req,res)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true})
    res.status(200).json({"message":"logout succesfull"})
}