const express = require("express")
const router = express.Router()
const edukasi = require("../contorollers/edukasi")

router.post("/edukasi",edukasi.add)

module.exports = router