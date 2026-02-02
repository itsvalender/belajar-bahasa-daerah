# Bahasa Backend (Express + MySQL)

Minimal API backend untuk aplikasi Belajar Bahasa Daerah.

Setup:
1. Import `public/belajar_bahasa_daerah.sql` ke MySQL (mis. via phpMyAdmin atau mysql CLI).
2. Salin `.env.example` ke `.env` dan isi variabel koneksi MySQL serta `JWT_SECRET`.
3. Install dependencies: `npm install`.
4. Jalankan dev server: `npm run dev`.

Endpoints:
- GET `/api/bahasa` - daftar bahasa aktif
- GET `/api/materi?bahasaId=1` - daftar materi (opsional filter bahasa)
- POST `/api/auth/login` - body `{ email, password }`
- POST `/api/auth/register` - body `{ nama, email, password }`

Catatan: Ini hanya setup minimal. Untuk produksi, tambahkan validasi, rate limiting, dan manajemen migrasi.
