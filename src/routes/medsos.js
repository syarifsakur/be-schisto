const express = require("express")
const router=express.Router()
const medsos=require("../contorollers/medsos")

router.get("/medsos",medsos.get)
router.post("/medsos",medsos.post)
router.delete("/medsos/:id",medsos.delete)
router.put("/medsos/:id",medsos.edit)
router.get("/medsos/:id",medsos.id)


module.exports=router