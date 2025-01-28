-- Membuat database
CREATE DATABASE ta;

-- Menggunakan database yang baru dibuat
\c ta;

-- Tabel artikel
CREATE TABLE artikel (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    subjudul VARCHAR(255),
    subdeskripsi TEXT,
    position VARCHAR(50) NOT NULL
);

-- Tabel diagnosa
CREATE TABLE diagnosa (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    alamat TEXT,
    kontak VARCHAR(20),
    email VARCHAR(100),
    total_point INT,
    diagnosa TEXT
);

-- Tabel edukasi
CREATE TABLE edukasi (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    foto VARCHAR(255),
    deskripsi TEXT
);

-- Tabel keluhan
CREATE TABLE keluhan (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    kontak VARCHAR(20),
    alasan TEXT,
    isi TEXT
);

-- Tabel poligon
CREATE TABLE poligon (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    kordinat GEOMETRY(Point, 4326) NOT NULL
);

-- Tabel statistik
CREATE TABLE statistik (
    id SERIAL PRIMARY KEY,
    desa VARCHAR(100) NOT NULL,
    jumlah_kasus INT,
    tahun INT
);