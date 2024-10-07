const db = require("../config/db")

module.exports={
    add:async(req,res)=>{
        const {title,image,content}=req.body
        try {
            const result = await db.query(
                "INSERT INTO edukasi (title,image,content)VALUES($1,$2,$3)",
                [title,image,content]
            )

            return res.status(201).json({message:"berhasil menyimpan edukasi"})
        } catch (error) {
            console.log("error : ",error)
            return res.status(500).json({error:error})
        }
    }
}