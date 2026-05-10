Task: Generate Mekanisme Unique Token, Tracking, & Redirect Edukasi

Input dari user:
- Nama tabel log (mis. simulation_logs).
- Struktur minimal kolom: campaign_id, pegawai_id, token, status_interaksi, waktu_interaksi.
- URL halaman edukasi (mis. /edu/{token}).

Output yang harus kamu berikan:
1. Desain skema token:
   - Jelaskan format token (string acak, UUID, hash kombinasi id + timestamp).
   - Jelaskan di tabel mana token disimpan dan kapan dibuat (saat kampanye di-generate).

2. Kode generate token:
   - Potongan kode Laravel (mis. di Job / Service) untuk generate token per target.
   - Contoh pembuatan URL tracking dengan token di query/segment.

3. Route & controller tracking:
   - Route untuk menangani klik tautan: GET /t/{token}.
   - Method controller yang:
     - Cari log berdasarkan token.
     - Update status_interaksi (clicked/submitted) + timestamp.
     - Redirect ke halaman edukasi yang sesuai.

4. Keamanan:
   - Jelaskan singkat kenapa token tidak boleh mengandung data sensitif langsung.
   - Anjurkan penggunaan middleware minimal untuk mencegah brute force token.

Gaya:
- Jelaskan langkah-langkah terurut (1–2 paragraf) + potongan kode inti.