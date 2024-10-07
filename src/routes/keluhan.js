const express = require("express")
const router = express.Router()
const keluhan = require("../contorollers/keluhan")

router.post("/keluhan",keluhan.add)
router.get("/keluhan",keluhan.get)
router.put("/keluhan/:id",keluhan.put)
router.delete("/keluhan/:id",keluhan.delete)

module.exports=router