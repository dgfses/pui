// ============================================================
// Mock Data untuk Platform Simulasi Phishing - UTY
// ============================================================

// --- Dynamic Date Helpers ---
// Tanggal dihitung relatif terhadap hari ini agar selalu terlihat "fresh"

const NOW = new Date()
const YEAR = NOW.getFullYear()

/** Menghasilkan tanggal ISO string (YYYY-MM-DD) dari N hari yang lalu */
function daysAgo(n: number): string {
  const d = new Date(NOW)
  d.setDate(d.getDate() - n)
  return d.toISOString().split("T")[0]
}

/** Menghasilkan tanggal ISO datetime dari N hari yang lalu + jam:menit tertentu */
function daysAgoAt(n: number, hour: number, minute: number): string {
  const d = new Date(NOW)
  d.setDate(d.getDate() - n)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString().replace("Z", "").split(".")[0]
}

/** Menghasilkan tanggal N hari ke depan */
function daysFromNow(n: number): string {
  const d = new Date(NOW)
  d.setDate(d.getDate() + n)
  return d.toISOString().split("T")[0]
}
// --- Type Definitions ---

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "superadmin"
  password: string
}

export interface Pegawai {
  id: string
  nama: string
  email: string
  departemen: string
  jabatan: string
  createdAt: string
}

export interface EmailTemplate {
  id: string
  nama: string
  subject: string
  kontenHtml: string
  tipe: "phishing" | "spear-phishing" | "social-engineering"
  createdAt: string
}

export interface MateriEdukasi {
  id: string
  judul: string
  konten: string
  tipe: "artikel" | "video" | "infografis"
  createdAt: string
}

export interface Campaign {
  id: string
  name: string
  templateId: string
  materiEdukasiId: string
  date: string
  scheduledDate: string
  status: "draft" | "scheduled" | "running" | "completed"
  targets: number
  targetIds: string[]
  openRate: number
  clickRate: number
  submissionRate: number
}

export interface SimulationLog {
  id: string
  campaignId: string
  pegawaiId: string
  token: string
  status: "sent" | "opened" | "clicked" | "submitted"
  sentAt: string
  openedAt?: string
  clickedAt?: string
  submittedAt?: string
  ipAddress?: string
  userAgent?: string
}

export interface SUSResponse {
  id: string
  campaignId: string
  respondentName: string
  answers: number[]
  score: number
  createdAt: string
}

// --- Data: Users ---

export const users: User[] = [
  { id: "usr-001", name: "Admin UTY", email: "admin@uty.ac.id", role: "superadmin", password: "admin123" },
  { id: "usr-002", name: "Staff TIK", email: "tik@uty.ac.id", role: "admin", password: "admin123" },
]

// --- Data: Pegawai ---

const departemenList = [
  "Fakultas Teknologi Informasi",
  "Fakultas Teknik",
  "Fakultas Ekonomi & Bisnis",
  "Bagian Administrasi Umum",
  "Bagian Keuangan",
  "Unit Perpustakaan",
  "Bagian TIK",
  "Bagian Kemahasiswaan",
]

export const pegawaiList: Pegawai[] = [
  { id: "peg-001", nama: "Budi Santoso", email: "budi.santoso@uty.ac.id", departemen: departemenList[0], jabatan: "Dosen", createdAt: daysAgo(180) },
  { id: "peg-002", nama: "Siti Aminah", email: "siti.aminah@uty.ac.id", departemen: departemenList[1], jabatan: "Dosen", createdAt: daysAgo(180) },
  { id: "peg-003", nama: "Agus Prasetyo", email: "agus.prasetyo@uty.ac.id", departemen: departemenList[3], jabatan: "Staff Administrasi", createdAt: daysAgo(178) },
  { id: "peg-004", nama: "Dewi Lestari", email: "dewi.lestari@uty.ac.id", departemen: departemenList[4], jabatan: "Staff Keuangan", createdAt: daysAgo(175) },
  { id: "peg-005", nama: "Rizki Maulana", email: "rizki.maulana@uty.ac.id", departemen: departemenList[6], jabatan: "Staff IT", createdAt: daysAgo(175) },
  { id: "peg-006", nama: "Nur Hidayah", email: "nur.hidayah@uty.ac.id", departemen: departemenList[5], jabatan: "Pustakawan", createdAt: daysAgo(172) },
  { id: "peg-007", nama: "Fajar Ramadhan", email: "fajar.ramadhan@uty.ac.id", departemen: departemenList[2], jabatan: "Dosen", createdAt: daysAgo(170) },
  { id: "peg-008", nama: "Rina Wulandari", email: "rina.wulandari@uty.ac.id", departemen: departemenList[7], jabatan: "Staff Kemahasiswaan", createdAt: daysAgo(170) },
  { id: "peg-009", nama: "Hendra Kurniawan", email: "hendra.kurniawan@uty.ac.id", departemen: departemenList[0], jabatan: "Dosen", createdAt: daysAgo(165) },
  { id: "peg-010", nama: "Yuli Astuti", email: "yuli.astuti@uty.ac.id", departemen: departemenList[3], jabatan: "Staff Administrasi", createdAt: daysAgo(165) },
  { id: "peg-011", nama: "Wahyu Setiawan", email: "wahyu.setiawan@uty.ac.id", departemen: departemenList[1], jabatan: "Dosen", createdAt: daysAgo(160) },
  { id: "peg-012", nama: "Putri Handayani", email: "putri.handayani@uty.ac.id", departemen: departemenList[4], jabatan: "Kepala Bagian", createdAt: daysAgo(160) },
  { id: "peg-013", nama: "Dimas Arya", email: "dimas.arya@uty.ac.id", departemen: departemenList[6], jabatan: "Kepala Unit TIK", createdAt: daysAgo(155) },
  { id: "peg-014", nama: "Lina Marlina", email: "lina.marlina@uty.ac.id", departemen: departemenList[2], jabatan: "Staff Administrasi", createdAt: daysAgo(155) },
  { id: "peg-015", nama: "Andi Firmansyah", email: "andi.firmansyah@uty.ac.id", departemen: departemenList[0], jabatan: "Kaprodi", createdAt: daysAgo(150) },
  { id: "peg-016", nama: "Sri Mulyani", email: "sri.mulyani@uty.ac.id", departemen: departemenList[7], jabatan: "Kepala Bagian", createdAt: daysAgo(150) },
  { id: "peg-017", nama: "Bambang Suryadi", email: "bambang.suryadi@uty.ac.id", departemen: departemenList[3], jabatan: "Staff Administrasi", createdAt: daysAgo(145) },
  { id: "peg-018", nama: "Mega Safitri", email: "mega.safitri@uty.ac.id", departemen: departemenList[5], jabatan: "Pustakawan", createdAt: daysAgo(145) },
  { id: "peg-019", nama: "Rendi Pratama", email: "rendi.pratama@uty.ac.id", departemen: departemenList[6], jabatan: "Staff IT", createdAt: daysAgo(140) },
  { id: "peg-020", nama: "Intan Permata", email: "intan.permata@uty.ac.id", departemen: departemenList[1], jabatan: "Dosen", createdAt: daysAgo(140) },
]

// --- Data: Email Templates ---

export const emailTemplates: EmailTemplate[] = [
  {
    id: "tpl-001",
    nama: "Reset Password Office 365",
    subject: "Segera Reset Password Anda - Office 365",
    kontenHtml: "<p>Yth. {{nama}},</p><p>Kami mendeteksi aktivitas mencurigakan pada akun Office 365 Anda. Segera reset password Anda melalui link berikut:</p><p><a href='{{link}}'>Reset Password Sekarang</a></p><p>Tim IT UTY</p>",
    tipe: "phishing",
    createdAt: daysAgo(120),
  },
  {
    id: "tpl-002",
    nama: "Update Data Kepegawaian",
    subject: "URGENT: Pembaruan Data Pegawai Semester Genap",
    kontenHtml: "<p>Kepada Yth. {{nama}},</p><p>Sehubungan dengan pembaruan data kepegawaian semester genap, mohon segera lengkapi data Anda melalui portal berikut:</p><p><a href='{{link}}'>Lengkapi Data</a></p><p>Bagian SDM UTY</p>",
    tipe: "social-engineering",
    createdAt: daysAgo(110),
  },
  {
    id: "tpl-003",
    nama: "Bonus THR Pegawai",
    subject: "Konfirmasi Penerimaan THR - Segera Verifikasi",
    kontenHtml: "<p>Yth. {{nama}},</p><p>THR Anda sebesar Rp 5.000.000 telah diproses. Untuk konfirmasi, silakan verifikasi rekening Anda:</p><p><a href='{{link}}'>Verifikasi Sekarang</a></p><p>Bagian Keuangan UTY</p>",
    tipe: "phishing",
    createdAt: daysAgo(90),
  },
  {
    id: "tpl-004",
    nama: "Undangan Rapat Pimpinan",
    subject: "Undangan Rapat Koordinasi Pimpinan - Konfirmasi Kehadiran",
    kontenHtml: "<p>Yth. {{nama}},</p><p>Anda diundang dalam rapat koordinasi pimpinan. Konfirmasi kehadiran Anda:</p><p><a href='{{link}}'>Konfirmasi Hadir</a></p><p>Sekretariat Rektorat UTY</p>",
    tipe: "spear-phishing",
    createdAt: daysAgo(80),
  },
  {
    id: "tpl-005",
    nama: "Google Drive Sharing",
    subject: "[Google Drive] Dokumen penting telah dibagikan kepada Anda",
    kontenHtml: `<p>Halo {{nama}},</p><p>Rektor UTY telah membagikan dokumen <b>'Surat Keputusan Kenaikan Jabatan ${YEAR}.pdf'</b> kepada Anda melalui Google Drive.</p><p>Dokumen ini memerlukan verifikasi identitas sebelum dapat diakses.</p><p><a href='{{link}}'>Buka Dokumen</a></p><p>Anda menerima email ini karena seseorang membagikan file kepada Anda. — Google Drive</p>`,
    tipe: "phishing",
    createdAt: daysAgo(60),
  },
  {
    id: "tpl-006",
    nama: "Beasiswa Dosen",
    subject: "Selamat! Anda Terpilih Program Beasiswa S3 Luar Negeri",
    kontenHtml: `<p>Yth. {{nama}},</p><p>Dengan bangga kami informasikan bahwa Anda <b>terpilih</b> sebagai kandidat penerima beasiswa S3 Luar Negeri kerja sama UTY-LPDP Tahun ${YEAR}.</p><p>Batas waktu konfirmasi: <b>3 hari kerja.</b></p><p>Segera lengkapi formulir penerimaan:</p><p><a href='{{link}}'>Konfirmasi Beasiswa</a></p><p>Direktorat Riset & Pengabdian Masyarakat UTY</p>`,
    tipe: "spear-phishing",
    createdAt: daysAgo(45),
  },
  {
    id: "tpl-007",
    nama: "WiFi Kampus Upgrade",
    subject: "Aksi Diperlukan: Upgrade Akun WiFi Kampus Anda",
    kontenHtml: `<p>Dear {{nama}},</p><p>Sistem WiFi kampus UTY telah di-upgrade ke jaringan baru <b>UTY-Secure 5G</b>. Semua pengguna wajib melakukan re-aktivasi akun sebelum <b>${daysFromNow(14).split('-').reverse().join('/')}}</b>, atau akses WiFi Anda akan dinonaktifkan.</p><p><a href='{{link}}'>Re-aktivasi Akun WiFi</a></p><p>Unit Teknologi Informasi & Komunikasi (TIK) UTY</p>`,
    tipe: "social-engineering",
    createdAt: daysAgo(30),
  },
]

// --- Data: Materi Edukasi ---

export const materiEdukasiList: MateriEdukasi[] = [
  {
    id: "edu-001",
    judul: "Mengenali Email Phishing",
    konten: "Email phishing adalah upaya penipuan yang menyamar sebagai komunikasi resmi untuk mencuri data sensitif. Ciri-ciri utama: 1) Alamat pengirim mencurigakan, 2) Link URL tidak sesuai domain resmi, 3) Urgensi berlebihan, 4) Permintaan data pribadi. Selalu periksa URL sebelum mengklik link apapun.",
    tipe: "artikel",
    createdAt: daysAgo(130),
  },
  {
    id: "edu-002",
    judul: "Cara Melaporkan Email Mencurigakan",
    konten: "Jika Anda menerima email mencurigakan: 1) Jangan klik link apapun, 2) Jangan unduh lampiran, 3) Forward email ke security@uty.ac.id, 4) Hapus email dari inbox. Laporkan ke Unit TIK untuk investigasi lebih lanjut.",
    tipe: "artikel",
    createdAt: daysAgo(120),
  },
  {
    id: "edu-003",
    judul: "Keamanan Password yang Kuat",
    konten: "Password kuat harus memiliki: 1) Minimal 12 karakter, 2) Kombinasi huruf besar-kecil, angka, dan simbol, 3) Tidak menggunakan informasi pribadi, 4) Berbeda untuk setiap akun. Gunakan password manager untuk mengelola password.",
    tipe: "infografis",
    createdAt: daysAgo(100),
  },
]

// --- Data: Campaigns ---

export const campaigns: Campaign[] = [
  {
    id: "camp-001",
    name: "Kampanye Kesadaran Q1",
    templateId: "tpl-001",
    materiEdukasiId: "edu-001",
    date: daysAgo(90),
    scheduledDate: daysAgo(90),
    status: "completed",
    targets: 20,
    targetIds: pegawaiList.slice(0, 20).map(p => p.id),
    openRate: 72.4,
    clickRate: 28.8,
    submissionRate: 12.4,
  },
  {
    id: "camp-002",
    name: "Drill Departemen TIK",
    templateId: "tpl-002",
    materiEdukasiId: "edu-002",
    date: daysAgo(75),
    scheduledDate: daysAgo(75),
    status: "completed",
    targets: 5,
    targetIds: pegawaiList.filter(p => p.departemen === "Bagian TIK").map(p => p.id),
    openRate: 84.4,
    clickRate: 15.6,
    submissionRate: 4.4,
  },
  {
    id: "camp-003",
    name: "Test Spear Phishing Pimpinan",
    templateId: "tpl-004",
    materiEdukasiId: "edu-001",
    date: daysAgo(60),
    scheduledDate: daysAgo(60),
    status: "completed",
    targets: 8,
    targetIds: pegawaiList.filter(p => p.jabatan.includes("Kepala") || p.jabatan.includes("Kaprodi")).map(p => p.id),
    openRate: 94.4,
    clickRate: 38.9,
    submissionRate: 16.7,
  },
  {
    id: "camp-004",
    name: "Test Bagian Keuangan",
    templateId: "tpl-003",
    materiEdukasiId: "edu-002",
    date: daysAgo(45),
    scheduledDate: daysAgo(45),
    status: "completed",
    targets: 4,
    targetIds: pegawaiList.filter(p => p.departemen === "Bagian Keuangan").map(p => p.id),
    openRate: 78.1,
    clickRate: 21.9,
    submissionRate: 9.4,
  },
  {
    id: "camp-005",
    name: "Assessment Seluruh Kampus",
    templateId: "tpl-001",
    materiEdukasiId: "edu-003",
    date: daysAgo(30),
    scheduledDate: daysAgo(30),
    status: "completed",
    targets: 20,
    targetIds: pegawaiList.map(p => p.id),
    openRate: 68.5,
    clickRate: 24.2,
    submissionRate: 11.2,
  },
  {
    id: "camp-006",
    name: "Orientasi Pegawai Baru",
    templateId: "tpl-002",
    materiEdukasiId: "edu-001",
    date: daysAgo(7),
    scheduledDate: daysAgo(7),
    status: "running",
    targets: 6,
    targetIds: pegawaiList.slice(14, 20).map(p => p.id),
    openRate: 89.3,
    clickRate: 35.7,
    submissionRate: 17.9,
  },
  {
    id: "camp-007",
    name: "Drill Bagian Administrasi",
    templateId: "tpl-003",
    materiEdukasiId: "edu-002",
    date: daysAgo(2),
    scheduledDate: daysFromNow(3),
    status: "scheduled",
    targets: 5,
    targetIds: pegawaiList.filter(p => p.departemen === "Bagian Administrasi Umum").map(p => p.id),
    openRate: 0,
    clickRate: 0,
    submissionRate: 0,
  },
  // --- 3 New Campaigns for the new phishing templates ---
  {
    id: "camp-gdrive",
    name: "Simulasi Google Drive Phishing",
    templateId: "tpl-005",
    materiEdukasiId: "edu-001",
    date: daysAgo(14),
    scheduledDate: daysAgo(14),
    status: "running",
    targets: 20,
    targetIds: pegawaiList.map(p => p.id),
    openRate: 71.2,
    clickRate: 32.5,
    submissionRate: 14.8,
  },
  {
    id: "camp-beasiswa",
    name: "Test Beasiswa Palsu",
    templateId: "tpl-006",
    materiEdukasiId: "edu-003",
    date: daysAgo(10),
    scheduledDate: daysAgo(10),
    status: "running",
    targets: 10,
    targetIds: pegawaiList.filter(p => p.jabatan === "Dosen").map(p => p.id),
    openRate: 92.0,
    clickRate: 48.0,
    submissionRate: 22.0,
  },
  {
    id: "camp-wifi",
    name: "Simulasi WiFi Upgrade",
    templateId: "tpl-007",
    materiEdukasiId: "edu-002",
    date: daysAgo(5),
    scheduledDate: daysAgo(5),
    status: "completed",
    targets: 20,
    targetIds: pegawaiList.map(p => p.id),
    openRate: 65.8,
    clickRate: 19.4,
    submissionRate: 8.6,
  },
]

// --- Data: Simulation Logs ---

export const simulationLogs: SimulationLog[] = [
  { id: "log-001", campaignId: "camp-001", pegawaiId: "peg-001", token: "a1b2c3d4e5", status: "submitted", sentAt: daysAgoAt(90, 8, 0), openedAt: daysAgoAt(90, 8, 15), clickedAt: daysAgoAt(90, 8, 16), submittedAt: daysAgoAt(90, 8, 17), ipAddress: "192.168.1.10", userAgent: "Chrome/120" },
  { id: "log-002", campaignId: "camp-001", pegawaiId: "peg-002", token: "f6g7h8i9j0", status: "clicked", sentAt: daysAgoAt(90, 8, 0), openedAt: daysAgoAt(90, 9, 30), clickedAt: daysAgoAt(90, 9, 32), ipAddress: "192.168.1.22", userAgent: "Firefox/121" },
  { id: "log-003", campaignId: "camp-001", pegawaiId: "peg-003", token: "k1l2m3n4o5", status: "opened", sentAt: daysAgoAt(90, 8, 0), openedAt: daysAgoAt(90, 10, 0), ipAddress: "192.168.1.33", userAgent: "Edge/120" },
  { id: "log-004", campaignId: "camp-001", pegawaiId: "peg-004", token: "p6q7r8s9t0", status: "sent", sentAt: daysAgoAt(90, 8, 0) },
  { id: "log-005", campaignId: "camp-001", pegawaiId: "peg-005", token: "u1v2w3x4y5", status: "opened", sentAt: daysAgoAt(90, 8, 0), openedAt: daysAgoAt(90, 11, 20), ipAddress: "192.168.1.55", userAgent: "Chrome/120" },
  { id: "log-006", campaignId: "camp-002", pegawaiId: "peg-005", token: "z6a7b8c9d0", status: "opened", sentAt: daysAgoAt(75, 9, 0), openedAt: daysAgoAt(75, 9, 10), ipAddress: "192.168.1.55", userAgent: "Chrome/121" },
  { id: "log-007", campaignId: "camp-002", pegawaiId: "peg-013", token: "e1f2g3h4i5", status: "sent", sentAt: daysAgoAt(75, 9, 0) },
  { id: "log-008", campaignId: "camp-002", pegawaiId: "peg-019", token: "j6k7l8m9n0", status: "clicked", sentAt: daysAgoAt(75, 9, 0), openedAt: daysAgoAt(75, 10, 30), clickedAt: daysAgoAt(75, 10, 32), ipAddress: "192.168.1.77", userAgent: "Chrome/121" },
  { id: "log-009", campaignId: "camp-003", pegawaiId: "peg-012", token: "o1p2q3r4s5", status: "submitted", sentAt: daysAgoAt(60, 8, 0), openedAt: daysAgoAt(60, 8, 5), clickedAt: daysAgoAt(60, 8, 6), submittedAt: daysAgoAt(60, 8, 8), ipAddress: "192.168.1.44", userAgent: "Safari/17" },
  { id: "log-010", campaignId: "camp-003", pegawaiId: "peg-013", token: "t6u7v8w9x0", status: "clicked", sentAt: daysAgoAt(60, 8, 0), openedAt: daysAgoAt(60, 8, 20), clickedAt: daysAgoAt(60, 8, 22), ipAddress: "192.168.1.55", userAgent: "Chrome/122" },
  { id: "log-011", campaignId: "camp-005", pegawaiId: "peg-001", token: "y1z2a3b4c5", status: "opened", sentAt: daysAgoAt(30, 8, 0), openedAt: daysAgoAt(30, 9, 0), ipAddress: "192.168.1.10", userAgent: "Chrome/123" },
  { id: "log-012", campaignId: "camp-005", pegawaiId: "peg-007", token: "d6e7f8g9h0", status: "submitted", sentAt: daysAgoAt(30, 8, 0), openedAt: daysAgoAt(30, 8, 30), clickedAt: daysAgoAt(30, 8, 31), submittedAt: daysAgoAt(30, 8, 33), ipAddress: "192.168.1.66", userAgent: "Firefox/123" },
  // --- 3 new phishing logs for peg-001 (Budi Santoso) using new templates ---
  { id: "log-013", campaignId: "camp-gdrive", pegawaiId: "peg-001", token: "gd1v2e3r4i5", status: "sent", sentAt: daysAgoAt(14, 10, 30) },
  { id: "log-014", campaignId: "camp-beasiswa", pegawaiId: "peg-001", token: "bs6w7a8s9i0", status: "sent", sentAt: daysAgoAt(10, 14, 0) },
  { id: "log-015", campaignId: "camp-wifi", pegawaiId: "peg-001", token: "wf1u2p3g4r5", status: "sent", sentAt: daysAgoAt(5, 9, 15) },
]

// --- Data: SUS Responses ---

function calculateSUSScore(answers: number[]): number {
  let score = 0
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) score += answers[i] - 1
    else score += 5 - answers[i]
  }
  return score * 2.5
}

const susAnswerSets = [
  [4, 2, 5, 1, 4, 2, 5, 1, 4, 2],
  [3, 3, 4, 2, 3, 2, 4, 2, 4, 3],
  [5, 1, 5, 1, 5, 1, 5, 1, 5, 1],
  [3, 4, 3, 3, 3, 3, 4, 2, 3, 3],
  [4, 2, 4, 2, 5, 1, 4, 2, 5, 2],
  [2, 4, 3, 3, 3, 3, 3, 3, 3, 3],
]

export const susResponses: SUSResponse[] = susAnswerSets.map((answers, i) => ({
  id: `sus-${String(i + 1).padStart(3, "0")}`,
  campaignId: campaigns[i % campaigns.length].id,
  respondentName: pegawaiList[i].nama,
  answers,
  score: calculateSUSScore(answers),
  createdAt: daysAgo(20 - i),
}))

// --- Helper Functions ---

export function getSummaryStats(data: Campaign[]) {
  const completed = data.filter(c => c.status === "completed" || c.status === "running")
  if (completed.length === 0) return { totalTargets: 0, avgOpenRate: "0", avgClickRate: "0", avgSubmissionRate: "0" }
  const totalTargets = completed.reduce((sum, c) => sum + c.targets, 0)
  const avgOpenRate = completed.reduce((sum, c) => sum + c.openRate, 0) / completed.length
  const avgClickRate = completed.reduce((sum, c) => sum + c.clickRate, 0) / completed.length
  const avgSubmissionRate = completed.reduce((sum, c) => sum + c.submissionRate, 0) / completed.length
  return {
    totalTargets,
    avgOpenRate: avgOpenRate.toFixed(1),
    avgClickRate: avgClickRate.toFixed(1),
    avgSubmissionRate: avgSubmissionRate.toFixed(1),
  }
}

export function getChartData(data: Campaign[]) {
  return data
    .filter(c => c.status === "completed" || c.status === "running")
    .slice(-5)
    .map((c) => ({
      name: c.name.length > 20 ? c.name.substring(0, 18) + "..." : c.name,
      fullName: c.name,
      open: c.openRate,
      click: c.clickRate,
      submit: c.submissionRate,
    }))
}

export function getPegawaiById(id: string) {
  return pegawaiList.find(p => p.id === id)
}

export function getTemplateById(id: string) {
  return emailTemplates.find(t => t.id === id)
}

export function getMateriById(id: string) {
  return materiEdukasiList.find(m => m.id === id)
}

export function getCampaignById(id: string) {
  return campaigns.find(c => c.id === id)
}

export function getLogsByCampaign(campaignId: string) {
  return simulationLogs.filter(l => l.campaignId === campaignId)
}

export function getAvgSUSScore(): number {
  if (susResponses.length === 0) return 0
  return susResponses.reduce((sum, r) => sum + r.score, 0) / susResponses.length
}

export function getSUSGrade(score: number): string {
  if (score >= 80.3) return "Excellent"
  if (score >= 68) return "Good"
  if (score >= 51) return "OK"
  return "Poor"
}

export { departemenList }
