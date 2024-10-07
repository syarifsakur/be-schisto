const express = require("express")
const router = express.Router()
const poligon = require("../contorollers/lokasi")

router.post("/lokasi",poligon.add)
router.get("/lokasi",poligon.get)

module.exports=router