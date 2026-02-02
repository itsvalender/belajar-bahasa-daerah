import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const bahasaId = req.query.bahasaId ? Number(req.query.bahasaId) : undefined;
    const params: any[] = [];
    let sql = 'SELECT * FROM materi WHERE status = "aktif"';
    if (bahasaId) {
      sql += ' AND bahasa_id = ?';
      params.push(bahasaId);
    }
    sql += ' ORDER BY urutan ASC';
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data materi' });
  }
});

export default router;
