const express = require("express")
const router = express.Router()
const artikel = require("../contorollers/artikel")
const upload = require("../middlewares/upload_img")

router.post("/artikel",upload.single("foto"),artikel.add)
router.put("/artikel/:id",artikel.put)
router.get("/artikel",artikel.get)
router.delete("/artikel/:id",artikel.delete)

module.exports=router