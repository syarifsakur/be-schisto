const db = require("../config/db")

module.exports={
    post:async(req,res)=>{
        const {desa,jumlah,tahun}= req.body
        try {
            const checkData = await db.query(
                "SELECT * FROM statistik WHERE desa=$1 and tahun=$2",
                [desa,tahun]
            )

            const check = checkData.rows.length

            if(check>0){
                return res.status(200).json({message:"data desa dan tahun nya sudah ada"})
            }
            const result = await db.query(
                "INSERT INTO statistik (desa,jumlah_kasus,tahun)VALUES($1,$2,$3)",
                [desa,jumlah,tahun]
            )

            return res.status(201).json({message:"berhasil menyimpan data statistik"})
        } catch (error) {
            console.log("error : ",error)
            return res.status(500).json({error:error})
        }
    },
    get:async(req,res)=>{
        try {
            const result = await db.query(
                "SELECT * FROM statistik"
            )

            const statistik = {};
            result.rows.forEach(item => {
                if (!statistik[item.tahun]) {
                    statistik[item.tahun] = []; 
                }
                statistik[item.tahun].push({
                    desa: item.desa,
                    jumlah_kasus: item.jumlah_kasus
                });
            });

            return res.status(200).json({data_statistik:statistik})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:error})
        }
    },
    put:async(req,res)=>{
        const {id} = req.params
        const {jumlah}= req.body
        try {
            const result = await db.query(
                "UPDATE statistik set jumlah_kasus=$1 WHERE id=$2",
                [jumlah,id]
            )
            const check = await db.query(
                "SELECT * FROM statistik WHERE id = $1",
                [id]
            );
    
            // Memeriksa apakah data ditemukan
            if (check.rows.length === 0) {
                return res.status(404).json({ message: "Data tidak ditemukan" });
            }
            res.status(200).json({message:"berhasil update data statistik",})
        } catch (error) {
            console.log(error)
            res.status(500).json({error:error})
        }
    }
}