const db = require("../config/db");

module.exports = {
  add: async (req, res) => {
    const { nama, kontak, alasan, isi } = req.body;
    try {
      const result = await db.query(
        "INSERT INTO keluhan (nama,kontak,alasan,isi)VALUES($1,$2,$3,$4)",
        [nama, kontak, alasan, isi]
      );

      return res.status(200).json({ message: "berhasil menyimpan keluhan" });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "error", error });
    }
  },

  get: async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM keluhan");

      return res.status(200).json({ data_keluhan: result.rows });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: error });
    }
  },

  put: async (req, res) => {
    const { id } = req.params;
    const { nama, kontak, alasan, isi } = req.body;
    try {
      const result = await db.query(
        "UPDATE keluhan SET nama=$1,kontak=$2,alasan=$3,isi=$4 WHERE id = $5",
        [nama, kontak, alasan, isi, id]
      );

      return res.status(200).json({message:"berhasil perbarui keluhan"})
    } catch (error) {
      console.log("error : ", error);
      return res.status(500).json({ error: error });
    }
  },

  delete:async(req,res)=>{
    const {id}=req.params
    try {
        const result = await db.query(
            "DELETE FROM keluhan WHERE id=$1",
            [id]
        )

        return res.status(200).json({message:"berhasil menghapus keluhan"})
    } catch (error) {
        console.log("error : ".error)
        return res.status(500).json({error:error})
    }
  }
};
