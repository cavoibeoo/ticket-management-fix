const express=require('express')
const router=express.Router()
const projectController=require("../controllers/Project")


router
    .post("/",projectController.create)
    .post("/:projectId/members",projectController.addMember)
    .get("/",projectController.getAll)
    .get("/:id",projectController.getById)
    .get("/admin/:id",projectController.getByAdminId)
    .patch("/:id",projectController.updateById)
    .delete("/:id",projectController.deleteById)
    .delete("/:projectId/members/:memberId", projectController.deleteMember)


module.exports=router