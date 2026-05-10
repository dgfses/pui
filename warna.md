**Warna Original Dashboard:**

| Elemen | Text Color | Background
|-----|-----|-----
| Total Targets | `text-blue-600` | `bg-blue-50`
| Avg Open Rate | `text-amber-600` | `bg-amber-50`
| Avg Click Rate | `text-rose-600` | `bg-rose-50`
| Avg Submission Rate | `text-red-700` | `bg-red-50`
| Good Indicator (Table) | `text-green-600` | -
| Warning Indicator | `text-amber-600` | -
| Danger Indicator | `text-red-600` | -
| Header Icon | `text-primary-foreground` | `bg-primary`
| Chart Open | `oklch(0.75 0.15 220)` - Sky Blue | -
| Chart Click | `oklch(0.75 0.18 45)` - Peach/Orange | -
| Chart Submit | `oklch(0.65 0.2 25)` - Coral/Red | -

**Tema Baru (Neutral / Hijau Tentara)**

| Elemen | Text Color | Background
|-----|-----|-----
| Total Targets | `text-emerald-700` | `bg-emerald-50`
| Avg Open Rate | `text-emerald-700` | `bg-emerald-50`
| Avg Click Rate | `text-emerald-700` | `bg-emerald-50`
| Avg Submission Rate | `text-emerald-700` | `bg-emerald-50`
| Good Indicator (Table) | `text-emerald-600` | -
| Warning Indicator | `text-amber-600` | -
| Danger Indicator | `text-red-600` | -
| Header Icon | `text-primary-foreground` | `bg-emerald-800` (Navy)
| Chart Open | `oklch(0.65 0.18 140)` - Teal/Mint | -
| Chart Click | `oklch(0.70 0.16 110)` - Sage | -
| Chart Submit | `oklch(0.60 0.18 90)` - Forest Green | -


# 
**Desain Template Laporan Kampanye (Versi 2: Modern & Rapi)**

**1. Blueprint / Tata Letak**

*   **Header:**Logo & Judul Laporan (Hijau Army)
*   **Ringkasan (Summary Cards):**Statistik Utama (Open/Click/Submit)
*   **Visualisasi Tren (Grafik):**Garis Waktu (Timeline) Metrik
*   **Tabel Detail:**Daftar Responden & Status
*   **Footer:**Tanggal Laporan & Peringatan

**2. Komponen & Props (Konsep React)**

Berikut adalah struktur komponen Next.js yang bisa Anda gunakan (menggunakan library Tremor + shadcn/ui).

* **Komponen Ringkasan (Stat Cards)**
    * Props: `title`, `value`, `icon`, `color`
    * Contoh Penggunaan: Menggunakan `Card` dari shadcn/ui dan `Metric` dari Tremor.

* **Komponen Grafik (Trend Chart)**
    * Props: `data`, `XAxisKey`, `YAxisKey`, `color`
    * Contoh Penggunaan: Menggunakan `AreaChart` atau `LineChart` dari Tremor untuk menampilkan tren metrik harian.

* **Komponen Tabel (Detail Table)**
    * Props: `data`, `columns`, `searchable`, `pageSize`
    * Contoh Penggunaan: Menggunakan `DataTable` dari shadcn/ui atau `Table` dari Tremor.

**3. Alur Data (Data Flow)**

1.  **Backend:** Mengirim data JSON ringkasan dan data seri waktu (time series).
2.  **Next.js:** Menggunakan `useQuery` atau `fetch` untuk mengambil data tersebut.
3.  **Rendering:** Mengirim data ke komponen `StatCard`, `TrendChart`, dan `DataTable`.
4.  **Export:** Saat tombol export ditekan, skrip akan menggabungkan elemen-elemen ini menjadi satu file PDF/HTML.

**4. Saran Estetika Tambahan**

* **Spacing (Jarak):** Berikan jarak `gap-6` atau `space-y-6` antar elemen agar tidak terlihat padat.
* **Padding:** Gunakan `p-6` atau `p-8` pada container utama laporan.
* **Typography:** Pastikan ukuran font untuk judul laporan lebih besar (mis. `text-2xl`) dan gunakan font yang profesional (seperti system default atau Inter).
* **Iconography:** Gunakan ikon yang konsisten (mis. `EyeIcon` untuk open rate, `MousePointerIcon` untuk click rate).