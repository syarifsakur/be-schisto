const db = require("../config/db");

module.exports = {
  add_desa: async (req, res) => {
    const { desa, kordinat } = req.body;
    if (!Array.isArray(kordinat)) {
      return res
        .status(400)
        .json({ message: "Name and at least 3 coordinates are required" });
    }
    // Mengonversi koordinat ke format WKT
    const coordString = `${kordinat
      .map((coord) => `${coord.longitude} ${coord.latitude}`)
      .join(",")}`;

    try {
      const result = await db.query(
        "INSERT INTO desa(nama_desa,kordinat)VALUES($1,$2)",
        [desa, coordString]
      );
      return res.status(201).json({ message: "berhasil menyimpan data desa" });
    } catch (error) {
      console.log(error);
    }
  },

  getId: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query("SELECT * FROM poligon WHERE id=$1", [id]);
      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  add: async (req, res) => {
    const { nama, desa, jenis, kordinat } = req.body;

    if (!nama || !desa || !kordinat) {
      return res.status(400).json({ message: "eror pengissian kolom" });
    }

    // Mengonversi koordinat ke format WKT
    const coordString = `${kordinat
      .map((coord) => `${coord.longitude} ${coord.latitude}`)
      .join(",")}`;

    try {
      const result = await db.query(
        "INSERT INTO poligon (nama,desa,jenis,kordinat) VALUES ($1, $2,$3,$4) RETURNING *",
        [nama, desa, jenis, coordString] // Simpan sebagai string
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error inserting polygon:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  get_desa: async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM desa");
      return res.status(200).json(result.rows);
    } catch (error) {
      console.log(error);
    }
  },
  get_jml: async (req, res) => {
    try {
      const t = await db.query(
        `SELECT 
                d.nama_desa,
                MAX(d.kordinat) AS kordinat,  
                COUNT(DISTINCT k.nama) AS jumlah_kordinat  
            FROM 
                desa d
            LEFT JOIN 
                poligon k ON d.nama_desa = k.desa
            GROUP BY 
                d.id, d.nama_desa
            ORDER BY 
                d.nama_desa;`
      );

      const kordinat = await db.query("SELECT * FROM poligon");
      return res.status(200).json({ desa: t.rows, titik_keong: kordinat.rows });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },
  get: async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM poligon");

      return res.status(200).json(result.rows);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const { nama, desa, jenis, kordinat } = req.body;
    try {
      const result = await db.query(
        "UPDATE poligon SET nama=$1,desa=$2,jenis=$3,kordinat=$4 WHERE id=$5",
        [nama, desa, jenis, kordinat, id]
      );
      return res.status(201).json({ message: "update succes", result });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteTitik: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query("DELETE FROM poligon WHERE id=$1", [id]);
      console.log(result);
      return res.status(200).json({ message: "berhasil menghapus : ", result });
    } catch (error) {
      console.log("server eror", error);
    }
  },
};
