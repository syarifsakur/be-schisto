const express = require("express")
const router = express.Router()
const poligon = require("../contorollers/lokasi")
const verify = require("../middlewares/verify")


router.post("/lokasi",poligon.add)
router.post("/lokasi/add_desa",verify,poligon.add_desa)
router.get("/lokasi",poligon.get)
router.get("/jml",poligon.get_jml)
router.get("/desa",poligon.get_desa)
router.delete("/delete/:id",poligon.deleteTitik)
router.put("/edit/:id",poligon.edit)
router.get("/lokasi/:id",poligon.getId)

module.exports=router