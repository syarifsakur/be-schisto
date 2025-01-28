const db = require("../config/db")

module.exports={
    post: async (req, res) => {
        const { desa, jumlah_kasus, tahun } = req.body; // Pastikan menggunakan jumlah_kasus
    
        // Validasi input
        if (jumlah_kasus === null || isNaN(jumlah_kasus) || jumlah_kasus <= 0) {
            return res.status(400).json({ message: "Jumlah_kasus tidak boleh null dan harus berupa angka positif." });
        }
    
        try {
            const checkData = await db.query(
                "SELECT * FROM statistik WHERE desa = $1 AND tahun = $2",
                [desa, tahun]
            );
    
            const check = checkData.rows.length;
    
            if (check > 0) 
                return res.status(200).json({ message: "Data desa dan tahun sudah ada" });
            
    
            const result = await db.query(
                "INSERT INTO statistik (desa, jumlah_kasus, tahun) VALUES ($1, $2, $3)",
                [desa, jumlah_kasus, tahun]
            );
    
            return res.status(201).json({ message: "Berhasil menyimpan data statistik" });
        } catch (error) {
            console.log("error: ", error);
            return res.status(500).json({ error: error.message });
        }
    },

    getdata: async (req, res) => {
        try {
            const result = await db.query("SELECT * FROM statistik");
    
            // Inisialisasi array untuk menyimpan statistik
            const statistik = [];
    
            // Mengelompokkan data berdasarkan desa
            result.rows.forEach(item => {
                const desaKey = item.desa;
    
                // Tambahkan objek ke array statistik
                statistik.push({
                    id:item.id,
                    desa: desaKey,
                    jumlah_kasus: item.jumlah_kasus,
                    tahun: item.tahun
                });
            });
    
            // Mengembalikan data statistik dalam format yang diinginkan
            res.status(200).json({ data_statistik: statistik });
        } catch (error) {
            console.error("Error fetching statistik:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    id:async(req,res)=>{
        const {id} = req.params
        try {
            const result = await db.query(
                "SELECT * FROM statistik WHERE id=$1",
                [id]
            )

            return res.status(200).json(result.rows[0])
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    get: async (req, res) => {
        try {
            const result = await db.query("SELECT * FROM statistik");
    
            // Inisialisasi objek statistik
            const statistik = {};
    
            // Mengelompokkan data berdasarkan desa
            result.rows.forEach(item => {
                const desaKey = item.desa;
    
                // Inisialisasi objek desa jika belum ada
                if (!statistik[desaKey]) {
                    statistik[desaKey] = [];
                }
    
                // Tambahkan tahun dan jumlah kasus ke array desa
                statistik[desaKey].push({
                    tahun: item.tahun,
                    jumlah_kasus: item.jumlah_kasus
                });
            });
    
            // Mengembalikan respons dengan struktur yang diinginkan
            return res.status(200).json({ data_statistik: statistik });
        } catch (error) {
            console.error("Error fetching statistik:", error);
            return res.status(500).json({ error: "Terjadi kesalahan pada server." });
        }
    },
    delete:async(req,res)=>{
        const {id} = req.params
        try {
            const result = await db.query(
                "DELETE FROM statistik WHERE id=$1",
                [id]
            )
            return res.status(200).json({message:"berhasil menghapus data statistik desa"})
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    put: async (req, res) => {
        const { id } = req.params;
        const { desa, jumlah_kasus, tahun } = req.body;
    
        // Memastikan jumlah_kasus tidak null dan valid
        if (jumlah_kasus === null || isNaN(jumlah_kasus) || jumlah_kasus <= 0) {
            return res.status(400).json({ message: "Jumlah_kasus tidak boleh null dan harus berupa angka positif." });
        }
    
        try {
            const check = await db.query(
                "SELECT * FROM statistik WHERE id = $1",
                [id]
            );
    
            // Memeriksa apakah data ditemukan
            if (check.rows.length === 0) {
                return res.status(404).json({ message: "Data tidak ditemukan" });
            }
    
            await db.query(
                "UPDATE statistik SET desa = $1, jumlah_kasus = $2, tahun = $3 WHERE id = $4",
                [desa, jumlah_kasus, tahun, id]
            );
    
            res.status(200).json({ message: "Berhasil update data statistik" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}