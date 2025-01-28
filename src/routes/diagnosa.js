const express = require("express")
const router = express.Router()
const diagnosa = require("../contorollers/diagnosa")

router.put("/diagnosa/:id",diagnosa.diagnosa)
router.post("/diagnosa",diagnosa.daftar)

module.exports=router