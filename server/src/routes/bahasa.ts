import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nama_bahasa, deskripsi, icon, status FROM bahasa_daerah WHERE status = "aktif"');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data bahasa' });
  }
});

export default router;
