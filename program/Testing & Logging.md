Task: Generate Template Testing & Logging untuk Platform Simulasi Phishing

Tujuan:
Menyediakan kerangka *feature test* dasar (auth, kirim kampanye, klik token) dan konfigurasi logging yang terpisah untuk event keamanan, supaya insiden mudah dilacak.[web:133][web:125][web:131]

Input dari user:
- Route penting yang ingin diuji (mis. /login, /campaigns, /t/{token}).
- Kanal log yang diinginkan (mis. file harian security.log).

Output yang harus kamu berikan:
1. Template Feature Test:
   - Contoh *feature test* autentikasi:
     - Menggunakan `actingAs()` untuk mensimulasikan admin yang sudah login.[web:133]
     - Assert halaman dashboard bisa diakses.
   - Contoh *feature test* kirim kampanye:
     - Membuat campaign dummy via factory/seeder.
     - Panggil endpoint store/run kampanye dan assert response OK + job email ter‑dispatch (jika pakai queue).
   - Contoh *feature test* klik token:
     - Buat satu `simulation_logs` dengan token tertentu.
     - Panggil route `/t/{token}` dan assert:
       - status_interaksi berubah (mis. menjadi "clicked"),
       - redirect ke halaman edukasi.

2. Konfigurasi Logging:
   - Rekomendasikan pembuatan channel khusus, mis. `security` di `config/logging.php` yang menulis ke file sendiri (mis. `security.log`) dengan driver `daily`.[web:125][web:134]
   - Jelaskan bahwa event penting seperti:
     - login gagal berulang,
     - eksekusi kampanye,
     - klik token mencurigakan,
     harus dicatat menggunakan `Log::channel('security')->info(...)`.

3. Praktik baik keamanan log:
   - Ingatkan agar:
     - Log tidak menyimpan password atau token asli (hanya ID/hashed).
     - File log tidak boleh bisa diakses publik via web server.[web:137]
   - Sarankan rotasi log otomatis (driver `daily`) untuk produksi.[web:125]

Gaya:
- Jelaskan dalam bentuk poin singkat + sedikit contoh kode.
- Fokus ke apa yang perlu diuji dan dicatat, bukan ke implementasi test runner secara penuh.