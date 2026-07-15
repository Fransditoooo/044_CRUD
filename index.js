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

