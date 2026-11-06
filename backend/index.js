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

app.post('/api/users', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ error: "Email and password can't be empty" });
    }

    try {
        const hash = await bcrypt.hash(password, 12);
        // Fiugre out how async stuff workds after you write code
        await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2)', [email, hash]);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        if(err.code === '23505'){
            res.status(409).json({ error: 'Email already registered' });
        }
        else{
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    }
})

app.listen(3000, () => console.log('Server running on localhost:3000'));