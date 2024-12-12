const express=require('express')
const router=express.Router()
const ticketController=require("../controllers/Ticket")

router
    .post("/",ticketController.create)
    .get("/",ticketController.getAll)
    .get("/:id",ticketController.getById)
    .get("/member/:id",ticketController.getByMemberId)
    .get("/project/:id",ticketController.getByProjectId)
    .patch("/:id",ticketController.updateById)
    .delete("/:id",ticketController.deleteById)


module.exports=router