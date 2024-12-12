const express=require("express")
const router=express.Router()
const authController=require("../controllers/Auth")
const { verifyToken } = require("../middleware/middleware")


router
    .post("/login",authController.login)
    .post("/member/login",authController.loginMember)
    .post("/signup",authController.signup)
    .get("/checkauth",verifyToken,authController.checkAuth)
    .get("/logout",authController.logout)

module.exports=router