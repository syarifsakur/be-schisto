const db = require("../config/db");

module.exports = {
  add: async (req, res) => {
    const { judul, isi,subJudul,subDeskripsi,kategori } = req.body;
    const foto = req.file
    if(!judul || !isi || subJudul && !subDeskripsi || !subJudul && subDeskripsi){
      return res.status(400).json({message:"kolom tidak boleh kosong!"})
    }
    try {
      const fotoPath = `${req.protocol}://${req.get("host")}/${foto.path}`;
      const fotos = fotoPath.replace(/\\/g, "/");
      const result = await db.query(
        "INSERT INTO artikel (judul,deskripsi,kategori,subJudul,subDeskripsi,position,foto)VALUES($1,$2,$3,$4,$5,$6,$7)",
        [judul, isi,kategori,subJudul,subDeskripsi,"bottom",fotos]
      );

      return res.status(201).json({ mesaage: "berhasil menngupload artikel" });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "error", error });
    }
  },
  put: async (req, res) => {
    const { id } = req.params;
    const { judul, isi ,kategori,subjudul,subdeskripsi} = req.body;
    try {
      const result = await db.query(
        "UPDATE artikel SET judul = $1, deskripsi = $2,kategori = $3, subjudul = $4, subdeskripsi=$5 WHERE id = $6",
        [judul, isi,kategori,subjudul,subdeskripsi, id]
      );

      // Mengecek apakah ada baris yang diperbarui
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Artikel tidak ditemukan" });
      }

      return res.status(200).json({ message: "Berhasil memperbarui artikel" });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "error", error });
    }
  },
  getById:async(req,res)=>{
    const {id} = req.params
    try {
      const result = await db.query(
        "SELECT * FROM artikel WHERE id=$1",
        [id]
      )
      return res.status(200).json(result.rows[0])

    } catch (error) {
      console.log(error)
      return res.status(500).json({error:error})
    }
  },
  get: async (req, res) => {
    const result = await db.query("SELECT * FROM artikel");

    return res.status(200).json({ artikel: result.rows });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query(
        "DELETE FROM artikel WHERE id = $1",
        [id]
      );

      return res.status(200).json({ message: "berhasil menghapus artikel" });
    } catch (error) {
      console.log("error : ".error);
      return res.status(500).json({ message: "error", error });
    }
  },
};
