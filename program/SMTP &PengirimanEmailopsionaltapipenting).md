Task: Setup SMTP & Queue Pengiriman Email Simulasi

Input dari user:
- Jenis SMTP (contoh: Mailtrap / SMTP institusi).
- Apakah ingin pakai queue (yes/no).

Output yang harus kamu berikan:
1. Konfigurasi .env:
   - Contoh blok MAIL_* untuk SMTP (host, port, user, password, encryption).[web:113][web:122]

2. Mailable & queue:
   - Contoh pembuatan Mailable untuk email phishing.
   - Contoh dispatch ke queue (mis. dispatch(new SendPhishingMailJob(...))).

3. Best practice:
   - Singgung kenapa pengiriman email sebaiknya pakai queue (tidak beratkan response time).[web:119][web:116]

Gaya:
- Ringkas, cukup 1–2 snippet kode.