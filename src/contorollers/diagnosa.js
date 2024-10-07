const db = require("../config/db")

module.exports={
    
    daftar:async(req,res)=>{
        const{nama,alamat,kontak,email} = req.body
        try {
            const result = await db.query(
                "INSERT INTO diagnosa (nama,alamat,kontak,email)VALUES($1,$2,$3,$4)",
                [nama,alamat,kontak,email]
            )

            return res.status(201).json({message:"berhasil daftar diagnosa"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:error})
        }
    },
    diagnosa:async(req,res)=>{
        const {id} = req.params
        const {penyakit}= req.body
        try {
            const points={
                demam:2,
                batuk:1,
                nyeri_perut:3,
                muntah_darah:5,
                penurunan_berat_badan:4,
                diare_berdarah:4
            }

            let totalPoint = 0;
            penyakit.forEach(item => {
                if(points[item]){
                totalPoint += points[item]
            }
        });

        let diagnosa;
        if(totalPoint>=10){
            diagnosa="Terdapat kemungkinan besar Anda terkena schistosomiasis. Silakan konsultasikan ke dokter segera."
        }
        if(totalPoint>=5){
            diagnosa="Terdapat kemungkinan Anda terkena schistosomiasis. Periksakan diri Anda lebih lanjut."
        }
        else{
            diagnosa="Gejala yang Anda alami tidak menunjukkan adanya schistosomiasis. Namun, tetap jaga kesehatan Anda dan waspada."
        }

        const result = await db.query(
            "UPDATE diagnosa SET total_point=$1,diagnosa=$2 WHERE id=$3",
            [totalPoint,diagnosa,id]
        )

        return res.status(200).json({totalPoint:totalPoint,diagnosa:diagnosa})

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:error})
        }
    }

}