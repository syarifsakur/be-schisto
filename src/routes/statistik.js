const express = require("express")
const router = express.Router()
const stastistik = require("../contorollers/statistik")
const statistik = require("../contorollers/statistik")

router.post("/statistik",stastistik.post)
router.get("/statistik",stastistik.get)
router.put("/statistik/:id",statistik.put)

module.exports=router