Task: Generate Controller & Route untuk Manajemen Kampanye Phishing

Input dari user:
- Nama controller (mis. CampaignController).
- Nama model & tabel terkait (Campaign, EmailTemplate, Pegawai, SimulationLog).
- Use case utama: CRUD kampanye + halaman index & detail.

Output yang harus kamu berikan:
1. Rancangan route:
   - Tunjukkan definisi Route::resource atau kombinasi route manual yang diperlukan.[web:115]
   - Jelaskan singkat URL utama (index, create, store, show, report).

2. Skeleton controller:
   - Buat method: index, create, store, show, edit, update, destroy.
   - Tambahkan 1 method khusus misalnya: run (untuk trigger kampanye secara manual) jika perlu.

3. Potongan kode Laravel:
   - Contoh isi method store() yang:
     - Validasi input.
     - Simpan campaign + relasi dengan template.
   - Contoh isi method index() yang:
     - Ambil data campaign + sedikit statistik dasar (jumlah target, jumlah log).

Gaya:
- Hanya potongan kode penting, tidak perlu full file.
- Tambahkan komentar singkat di tiap method agar mudah dipahami.
