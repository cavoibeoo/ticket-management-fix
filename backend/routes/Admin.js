const express=require('express')
const router=express.Router()
const adminController=require("../controllers/Admin")

router
    .get("/",adminController.getAll)
    .get("/:id",adminController.getById)
    .patch("/:id",adminController.updateById)
    .delete("/:id",adminController.deleteById)


module.exports=router