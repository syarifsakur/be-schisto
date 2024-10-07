const db = require("../config/db")

module.exports={
    add:async(req,res)=>{
        const {nama,kordinat} = req.body
        if(!nama || !kordinat || !Array.isArray(kordinat || kordinat.length <2)){
            return res.status(400).json({message:"nama dan 2 kordinat harus di isi"})
        }
        const coordString = `(${kordinat.map(coord => `${coord.longitude} ${coord.latitude}`).join(',')})`;
        try {
            const result = await db.query(
                "INSERT INTO poligon(nama,kordinat)VALUES($1,$2) RETURNING *",
                [nama,coordString]
            )

            return res.status(201).json({Message:"berhasil menyimpan kordinat",titik_kordinxat:result.rows[0]})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:error})
        }
    },
    get:async(req,res)=>{
        try {
            const result = await db.query(
                "SELECT * FROM poligon"
            )

            return res.status(200).json(result.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:error})
        }
    }
}