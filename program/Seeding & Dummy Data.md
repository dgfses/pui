Task: Generate Seeder & Dummy Data untuk Platform Simulasi Phishing

Tujuan:
Menyediakan data awal (admin, pegawai, kampanye contoh, dan log simulasi) agar sistem bisa langsung di‑demo dan diuji tanpa input manual. Database seeding adalah praktik standar di Laravel untuk mengisi data pengujian dengan cepat.[web:135][web:132]

Input dari user:
- Nama model/tabel yang ingin di‑seed (users, pegawai, campaigns, simulation_logs).
- Jumlah data dummy yang diinginkan per entitas (mis. 1 admin, 20 pegawai, 2 kampanye).

Output yang harus kamu berikan:
1. Desain seeding:
   - Jelaskan urutan seeding (mis. Users → Pegawai → Campaigns → SimulationLogs) agar foreign key tidak bermasalah.[web:126]
   - Beri rekomendasi kapan seeding dijalankan (hanya env local/staging, bukan production).

2. Contoh seeder Laravel:
   - Potongan kode `DatabaseSeeder` yang memanggil seeder lain (UserSeeder, PegawaiSeeder, CampaignSeeder, SimulationLogSeeder).[web:135][web:126]
   - Contoh isi satu seeder (mis. PegawaiSeeder) yang:
     - Menggunakan factory atau `DB::table()->insert()` untuk mengisi data dummy.
     - Menggunakan email unik dan departemen acak.

3. Cara pakai:
   - Perintah artisan yang perlu dijalankan:  
     - `php artisan migrate:fresh --seed` untuk reset + isi data.  
     - Atau `php artisan db:seed --class=NamaSeeder`.
   - Jelaskan singkat bahwa seeder ini hanya untuk pengembangan/demonstrasi, jangan dijalankan di database production.

Gaya:
- Bahasa Indonesia teknis, ringkas.
- Kode fokus ke struktur seeder; tidak perlu factory lengkap.