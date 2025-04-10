const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Database connection is working: ${result.rows[0].now}`);
    } catch (error) {
        res.status(500).send('Database connection failed.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});