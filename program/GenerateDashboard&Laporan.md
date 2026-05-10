# Task: Generate Dashboard Analitik & Fitur Laporan (Next.js + shadcn/ui + Tremor)

**Input dari user:**
- Metrik yang ingin ditampilkan (open rate, click rate, submission rate per campaign).
- Bentuk laporan yang dibutuhkan (tabel di web + export PDF/Excel).

**Output yang harus kamu berikan:**
1. Desain integrasi API & struktur data:
   - Jelaskan bentuk *payload* JSON (API Response) dari backend Laravel yang diharapkan oleh frontend untuk menampilkan *open rate*, *click rate*, dan *submission rate*.
   - Berikan contoh pemanggilan data (*Data Fetching*) di Next.js (misalnya menggunakan *Server Components* atau SWR/TanStack Query).

2. Struktur tampilan dashboard (Next.js & UI Libraries):
   - Deskripsikan komposisi komponen utama: penggunaan `Card` (shadcn/ui) untuk ringkasan statistik, `DataTable` (shadcn/ui) untuk daftar kampanye, dan grafik seperti `BarChart` atau `DonutChart` (Tremor) untuk visualisasi metrik.
   - Berikan contoh struktur komponen (JSX kasar, fokus pada alur data, hierarki komponen, dan *props*, bukan *styling* Tailwind secara penuh).

3. Export laporan:
   - Rancang mekanisme *frontend* untuk memicu ekspor data (misalnya: *button handler* yang memanggil *endpoint* API backend `GET /api/campaigns/{id}/export`).
   - Jelaskan secara tekstual bagaimana *frontend* menangani *response* berupa *file blob* agar otomatis terunduh di *browser* pengguna.

**Gaya:**
- Fokus pada aliran data (*data flow*) dari API ke komponen antarmuka, komposisi React Component, dan logika *state*, bukan pada detail kelas utilitas CSS.
- Tulis jawaban dalam bahasa Indonesia teknis, singkat, dan *to the point*.
