const db = require("../config/db")
const { link } = require("../routes/statistik")

module.exports={

    post: async (req, res) => {
        const { platform, link } = req.body;
        console.log(platform, link);
        
        try {
            // Periksa apakah platform sudah ada
            const cek = await db.query(
                "SELECT * FROM medsos WHERE platform = $1",
                [platform]
            );
    
            // Jika platform sudah ada, kembalikan pesan kesalahan
            if (cek.rows.length > 0) {
                return res.status(400).json({ message: "Platform sudah ada" });
            }
    
            // Jika belum ada, masukkan data baru
            await db.query(
                "INSERT INTO medsos (platform, link) VALUES ($1, $2)",
                [platform, link]
            );
    
            return res.status(201).json({ message: "Berhasil simpan medsos" });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ error: "Terjadi kesalahan saat menyimpan data" });
        }
    },

    id:async(req,res)=>{
        const{id}=req.params
        try {
            const result = await db.query(
                "SELECT * FROM medsos WHERE id=$1",
                [id]
            )
            if(result.rowCount === 0){
                return rsestatus(404).json({message:"data tidak di temukan"})
            }
            return res.status(200).json(result.rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    edit:async(req,res)=>{
        const {id}=req.params
        const { platform, link } = req.body;
        const cek = await db.query(
            "SELECT * FROM medsos WHERE id=$1",
            [id]
        )
        const cek2 = await db.query(
            "SELECT * FROM medsos WHERE platform=$1",
            [id]
        )
        if(!cek){
            return res.status(400).json({message:"tidak ada data"})
        }
        if(!cek2){
            return res.status(400).json({message:"Platform sudah ada"})
        }
        try {
            const result = await db.query(
                "UPDATE medsos SET platform=$1,link=$2 WHERE id=$3",
                [platform,link,id]
            )
            return res.status(200).json({message:"berhasil mengupdate data"})
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    delete:async(req,res)=>{
        const {id}=req.params
        try {
            const result = await db.query(
                "DELETE FROM medsos WHERE id=$1",
                [id]
            )
            return res.status(200).json({Message:"berhasil menghapus medsos"})
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    get:async(req,res)=>{
        try {
            const result = await db.query(
                "SELECT * FROM medsos"
            )
            return res.status(200).json(result.rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}