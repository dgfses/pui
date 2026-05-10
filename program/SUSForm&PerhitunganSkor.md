Task: Generate Modul Kuesioner SUS & Perhitungan Skor

Input dari user:
- Lokasi form (mis. /sus/{campaign}).
- Siapa responden (mahasiswa / admin).

Output yang harus kamu berikan:
1. Struktur form SUS:
   - Daftar 10 pertanyaan SUS (generik, tidak perlu isi text aslinya).
   - Form input skala Likert 1–5.

2. Tabel database:
   - Tabel sus_responses (campaign_id, respondent_id/anon_id, jawaban_1..jawaban_10).

3. Fungsi perhitungan:
   - Potongan fungsi PHP/Laravel untuk menghitung skor SUS dari 10 jawaban.
   - Jelaskan cara interpretasi skor (Excellent/Good/OK/Poor).

Gaya:
- Fokus ke struktur data dan fungsi hitung, bukan tampilan.
