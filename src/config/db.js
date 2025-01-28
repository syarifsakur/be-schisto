const { Pool } = require("pg");

// const db = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "ta",
//     password: "09agustus2003",
//     port: 5432,
// })

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ta",
    password: "09agustus2003",
    port: 5432,
})


db.connect()
    .then(() => {
        console.log("Koneksi ke database berhasil!");
    })
    .catch((err) => {
        console.error("Koneksi ke database gagal:", err);
    })

module.exports=db