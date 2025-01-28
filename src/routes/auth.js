const express = require("express")
const router=express.Router()
const auth = require("../contorollers/auth")
const verify = require("../middlewares/verify")

router.post("/register",auth.register)
router.post("/login",auth.login)
router.delete("/admin/delete/:id",auth.delete)


module.exports=router