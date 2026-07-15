const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Konfigurasi PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Mahasiswa',
    password: 'dito1309',
    port: 5432,
});

// Middleware
app.use(express.json());

/* =========================================
   GET - Menampilkan Semua Data Biodata
========================================= */
app.get('/biodata', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM biodata ORDER BY id');

        res.status(200).json({
            message: 'Berhasil mengambil data biodata',
            data: result.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: 'Terjadi kesalahan pada server'
        });
    }
});

/* =========================================
   GET - Menampilkan Data Berdasarkan ID
========================================= */
app.get('/biodata/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM biodata WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Data tidak ditemukan'
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: 'Terjadi kesalahan pada server'
        });
    }
});

/* =========================================
   POST - Menambahkan Data Baru
========================================= */
app.post('/biodata', async (req, res) => {
    const { nama, nim, kelas } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO biodata (nama, nim, kelas)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nama, nim, kelas]
        );

        res.status(201).json({
            message: 'Data berhasil ditambahkan',
            data: result.rows[0]
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: 'Gagal menambahkan data'
        });
    }
});

