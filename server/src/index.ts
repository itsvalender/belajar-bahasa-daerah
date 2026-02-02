import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bahasaRoutes from './routes/bahasa';
import materiRoutes from './routes/materi';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bahasa', bahasaRoutes);
app.use('/api/materi', materiRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Root route to avoid `Cannot GET /` and provide quick info
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Bahasa API</title></head>
      <body style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;line-height:1.6;padding:2rem;">
        <h1>Bahasa API Server</h1>
        <p>Server is running. Use the API endpoints:</p>
        <ul>
          <li><a href="/api/health">/api/health</a></li>
          <li><a href="/api/bahasa">/api/bahasa</a></li>
          <li><a href="/api/materi">/api/materi</a></li>
        </ul>
        <p>See <code>server/README.md</code> for setup instructions.</p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
