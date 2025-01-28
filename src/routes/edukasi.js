const express = require("express")
const router = express.Router()
const upload = require(".././middlewares/upload_img")
const edukasi = require("../contorollers/edukasi")

router.post("/edukasi",upload.single("foto"),edukasi.add)
router.get("/edukasi",edukasi.get)

module.exports = router