import bcrypt from 'bcrypt';
import express from 'express';
import { pool } from './lib/db.js';

const app = express();
app.use(express.json());

app.get('/api/users', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT id, email FROM users');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(3000, () => console.log('Server running on localhost:3000'));