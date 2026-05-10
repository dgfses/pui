# Roadmap Pengembangan Aplikasi: Campaign Manager & Tracking System

Dokumen ini menjelaskan alur kerja pengembangan aplikasi dari nol hingga tahap publikasi (*hosting*) menggunakan kombinasi **Next.js (Vercel)** dan **Cloudflare (Workers & D1)**.

---

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS, shadcn/ui, Tremor (Analytics).
- **Backend:** Cloudflare Workers (Hono.js).
- **Database:** Cloudflare D1 (Relational SQL).
- **Hosting:** Vercel (Frontend) & Cloudflare (Backend).

---

## 🏁 Tahap 1: Persiapan Lingkungan (Setup)
1. **Inisialisasi Git:** Buat repository di GitHub/GitLab.
2. **Install Tools:** Pastikan Node.js terinstall dan pasang Wrangler CLI (`npm install -g wrangler`) untuk manajemen Cloudflare.
3. **Struktur Project:** Pisahkan folder `frontend` (Next.js) dan `backend` (Workers) atau gunakan pendekatan Monorepo.

---

## 📊 Tahap 2: Desain Database (Cloudflare D1)
1. **Perancangan ERD:** Menentukan skema tabel.
   - `users`: Data admin/pengguna.
   - `campaigns`: Nama kampanye, URL tujuan, tanggal mulai/berakhir.
   - `tracking_logs`: Log setiap klik (IP, User Agent, Timestamp, Token).
2. **Setup D1:** Jalankan `wrangler d1 create <nama-db>`.
3. **Migrasi:**
   - Tulis file `schema.sql`.
   - Jalankan migrasi lokal: `wrangler d1 execute <nama-db> --local --file=./schema.sql`.

---

## ⚙️ Tahap 3: Pengembangan Backend (Cloudflare Workers)
1. **Setup Hono.js:** Framework ringan untuk routing di Workers.
2. **Pembuatan Endpoint CRUD:** - `GET /campaigns`: List semua kampanye.
   - `POST /campaigns`: Membuat kampanye baru.
   - `DELETE /campaigns/:id`: Menghapus kampanye.
3. **Logika Tracking & Redirect (Core):**
   - Buat route `GET /t/:token`.
   - Logika: Ambil `token` -> Simpan log klik ke D1 -> Redirect ke URL tujuan asli secara instan (302 Redirect).
4. **Testing API:** Gunakan Postman atau Insomnia untuk memastikan API merespon dengan benar.

---

## 🎨 Tahap 4: Pengembangan Frontend (Next.js & shadcn/ui)
1. **Instalasi Next.js:** `npx create-next-app@latest frontend`.
2. **Setup UI:** Pasang **shadcn/ui** untuk komponen dasar (Button, Input, Table, Card).
3. **Dashboard Building:**
   - Gunakan **v0.dev** untuk draf desain dashboard dengan cepat.
   - Gunakan **Tremor** untuk membuat grafik analitik jumlah klik kampanye.
4. **State Management:** Gunakan React Hooks (useState, useEffect) atau library seperti `SWR` atau `TanStack Query` untuk memanggil API dari Backend.

---

## 🔗 Tahap 5: Integrasi & Koneksi
1. **Environment Variables:** Simpan URL API Cloudflare di file `.env.local` pada project Next.js.
2. **CORS Setup:** Pastikan Backend (Workers) mengizinkan request dari domain Vercel.
3. **Form Handling:** Hubungkan form "Tambah Kampanye" di dashboard dengan endpoint `POST` di Workers.

---

## 🚀 Tahap 6: Deployment (Go Live)
1. **Deploy Backend (Cloudflare):**
   - Jalankan migrasi ke production: `wrangler d1 execute <nama-db> --remote --file=./schema.sql`.
   - Publish Worker: `wrangler deploy`.
2. **Deploy Frontend (Vercel):**
   - Hubungkan repository GitHub ke Vercel Dashboard.
   - Masukkan Environment Variables API URL di setting Vercel.
   - Klik **Deploy**.

---

## 📈 Tahap 7: Monitoring & Iterasi
1. **Analisis Data:** Cek apakah klik tercatat dengan benar di dashboard.
2. **Optimasi:** Jika traffic tinggi, tambahkan **Cloudflare KV** untuk caching URL redirect agar lebih cepat.
3. **Fitur Tambahan:** Tambahkan sistem login (Auth) untuk mengamankan dashboard.