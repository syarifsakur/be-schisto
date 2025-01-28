const db = require("../config/db")

module.exports={
    add:async(req,res)=>{
        const {judul,deskripsi}=req.body
        const foto = req.file
        try {
            const fotoPath = `${req.protocol}://${req.get("host")}/${foto.path}`;
            const fotos = fotoPath.replace(/\\/g, "/");
            const result = await db.query(
                "INSERT INTO edukasi (judul,foto,deskripsi)VALUES($1,$2,$3)",
                [judul,fotos,deskripsi]
            )

            return res.status(201).json({message:"berhasil menyimpan edukasi"})
        } catch (error) {
            console.log("error : ",error)
            return res.status(500).json({error:error})
        }
    },
    get:async(req,res)=>{
        try {
            const result = await db.query(
                "SELECT * FROM edukasi"
            )

            return res.status(200).json(result.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:error})
        }
    }
}