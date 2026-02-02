import { Router, Request, Response } from 'express';
import db from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email dan password diperlukan' });
  try {
    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Email atau password salah' });

    // Passwords may be stored plaintext in seed; attempt bcrypt first then fallback
    const match = await bcrypt.compare(password, user.password).catch(() => false);
    const isValid = match || password === user.password;

    if (!isValid) return res.status(401).json({ error: 'Email atau password salah' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, nama: user.nama, email: user.email, role: user.role, status: user.status } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal login' });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  const { nama, email, password } = req.body;
  if (!nama || !email || !password) return res.status(400).json({ error: 'Data registrasi tidak lengkap' });

  try {
    const [existing]: any = await db.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
    if (existing.length > 0) return res.status(409).json({ error: 'Email sudah terdaftar' });

    const hashed = await bcrypt.hash(password, 10);
    const [result]: any = await db.query('INSERT INTO users (nama, email, password) VALUES (?, ?, ?)', [nama, email, hashed]);
    const insertId = result.insertId;
    const [rows]: any = await db.query('SELECT id, nama, email, role, status FROM users WHERE id = ?', [insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal registrasi' });
  }
});

export default router;
