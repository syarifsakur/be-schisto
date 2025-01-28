const express = require("express")
const app = express()
require("dotenv").config()
const db = require("./config/db")
const artikel = require("./routes/artikel")
const keluhan = require("./routes/keluhan")
const statistik = require("./routes/statistik")
const edukasi = require("./routes/edukasi")
const diagnosa = require("./routes/diagnosa")
const lokasi = require("./routes/poligon")
const auth = require("./routes/auth")
const medsos = require("./routes/medsos")

const cors = require("cors")

const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(artikel)
app.use(keluhan)
app.use(statistik)
app.use(diagnosa)
app.use(lokasi)
app.use(edukasi)
app.use(auth)
app.use(medsos)

app.use("/src/public/upload", express.static("src/public/upload"))

app.get("/",(req,res)=>{
    console.log("halo this is homepage")
})

app.listen(port,()=>{
    console.log("server berjalan di port",port)
})