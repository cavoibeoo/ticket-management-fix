const express=require('express')
const router=express.Router()
const memberController=require("../controllers/Member")

router
    .post("/",memberController.create)
    .get("/",memberController.getAll)
    .get("/:id",memberController.getById)
    .get('/admin/:id',memberController.getByAdminId)
    .patch("/:id",memberController.updateById)
    .delete("/:id",memberController.deleteById)


module.exports=router