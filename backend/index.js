import 'dotenv/config';
import bcrypt from 'bcrypt';
import express from 'express';
import { pool } from './lib/db.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// app.get('/api/users', async (req, res) => {
//     try {
//         const { rows } = await pool.query('SELECT id, email FROM users');
//         res.json(rows);
//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

function createToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2d' });
}

app.post('/api/users', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ error: "Email and password can't be empty" });
    }

    try {
        const hash = await bcrypt.hash(password, 12);
        const { rows } = await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id', [email, hash]);
        const token = createToken(rows[0].id);
        res.status(201).json({ token });
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

app.post('/api/auth/login', async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ error: "Email and password are required"});
    }

    try {
        const users = await pool.query('SELECT users.id, users.password_hash FROM users WHERE users.email = $1', [email]);
        // Check if no user was found
        const user = users.rows[0];
        if(!user){
            return res.status(401).json({ error: 'Email not registered' });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password_hash);
        if(passwordCorrect){
            const token = createToken(user.id);
            res.status(200).json({ token});
        }
        else{
            res.status(401).json({ error: 'Incorrect password' });
        }
    } catch (err){
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
})

app.listen(3000, () => console.log('Server running on localhost:3000'));