Task: Generate ERD & Migrations untuk Platform Simulasi Phishing

Input dari user:
- Daftar entitas (mis. users, pegawai, campaigns, email_templates, simulation_logs, education_materials).
- Atribut penting per entitas.
- Relasi dasar antar entitas (one-to-many, many-to-many).

Output yang harus kamu berikan:
1. Deskripsi ERD singkat:
   - Jelaskan entitas, primary key, dan relasi (one-to-many / many-to-many).
   - Tulis narasi 1–2 paragraf tentang bagaimana data mengalir di sistem.

2. Daftar tabel final:
   - Tabel + kolom + tipe data (ringkas).
   - Tandai primary key, foreign key.

3. Contoh Laravel migration:
   - Buat migration Laravel untuk setiap tabel (minimal struktur utama).
   - Gunakan praktik baik: nama tabel jamak, nama migration deskriptif, dan tipe data yang tepat (bigIncrements, foreignId, timestamps).[web:108]

Gaya:
- Bahasa Indonesia teknis, rapi, dan padat.
- Fokus ke struktur; jangan isi seeder dulu.