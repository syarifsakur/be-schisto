const express = require("express")
const router = express.Router()
const stastistik = require("../contorollers/statistik")
const statistik = require("../contorollers/statistik")

router.post("/statistik",stastistik.post)
router.get("/statistik",stastistik.get)
router.put("/statistik/edit/:id",statistik.put)
router.delete("/statistik/:id",stastistik.delete)
router.get("/statistik2",stastistik.getdata)
router.get("/statistik/:id",stastistik.id)

module.exports=router