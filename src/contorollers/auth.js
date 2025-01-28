const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

  register: async (req, res) => {
    const { username, password } = req.body;
    // const foto = req.file

    if (!username ) {
      return res.status(404).json({ message: "harus di isi semua" });
    }
    if (!password ) {
      return res.status(404).json({ message: "harus di isi semua awkawokawok katasanadi" });
    }
        
    try {
      const result = await db.query("SELECT * FROM admin where username = $1", [
        username,
      ]);
      console.log(result)
      if (result) {
        return res.status(402).json({ message: "username sudah terdaftar" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      // const fotoPath = `${req.protocol}://${req.get('host')}/${foto.path}`;
      // const fotos = fotoPath.replace(/\\/g, '/')
      const data = await db.query(
        "INSERT INTO admin(username, password) VALUES($1,$2)",
        [username, hashPassword]
      );
      return res
        .status(201)
        .json({ message: "berhasil tersimpan", data: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
        // Ambil pengguna berdasarkan username
        const result = await db.query('SELECT * FROM admin WHERE username = $1', [username]);

        // Cek apakah ada hasil
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }

        // Bandingkan password
        const isMatch = await bcrypt.compare(password, result.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password salah" });
        }
        const token = jwt.sign(
            {
              id: result.rows[0].id,
            },
            "qwertyuiop",
            { expiresIn: "1d" }
          );
    
          res.cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000
          })

        // Lanjutkan dengan proses login
        return res
        .status(200)
        .json({ 
            message: "Login berhasil",
            user: result.rows[0],
            token:token
        });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: "Terjadi kesalahan di server" });
    }
  },

  delete:async(req,res)=>{
    const{id}=req.params
    try {
        const result = await db.query(
            "DELETE FROM admin WHERE id=$1",
            [id]
        )
        return res.status(200).json({message:"brhasil menghapus akun admin"})
    } catch (error) {
        return res.status(500).json(error)
    }
  },

  profil:async(req,res)=>{
    const {id:id} = req.akun;
    try {
      const sql = await db.query("SELECT * FROM user WHERE id=?",[id])
      return res.status(200).json({message:"berhasil",data:sql[0]})
    } catch (error) {
      return res.status(500).json({message:"internal server error"})
    }
  }
};
