// ============================================================
// Mock Data untuk Platform Simulasi Phishing - UTY
// ============================================================

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
  { id: "peg-001", nama: "Budi Santoso", email: "budi.santoso@uty.ac.id", departemen: departemenList[0], jabatan: "Dosen", createdAt: "2024-01-05" },
  { id: "peg-002", nama: "Siti Aminah", email: "siti.aminah@uty.ac.id", departemen: departemenList[1], jabatan: "Dosen", createdAt: "2024-01-05" },
  { id: "peg-003", nama: "Agus Prasetyo", email: "agus.prasetyo@uty.ac.id", departemen: departemenList[3], jabatan: "Staff Administrasi", createdAt: "2024-01-05" },
  { id: "peg-004", nama: "Dewi Lestari", email: "dewi.lestari@uty.ac.id", departemen: departemenList[4], jabatan: "Staff Keuangan", createdAt: "2024-01-06" },
  { id: "peg-005", nama: "Rizki Maulana", email: "rizki.maulana@uty.ac.id", departemen: departemenList[6], jabatan: "Staff IT", createdAt: "2024-01-06" },
  { id: "peg-006", nama: "Nur Hidayah", email: "nur.hidayah@uty.ac.id", departemen: departemenList[5], jabatan: "Pustakawan", createdAt: "2024-01-07" },
  { id: "peg-007", nama: "Fajar Ramadhan", email: "fajar.ramadhan@uty.ac.id", departemen: departemenList[2], jabatan: "Dosen", createdAt: "2024-01-08" },
  { id: "peg-008", nama: "Rina Wulandari", email: "rina.wulandari@uty.ac.id", departemen: departemenList[7], jabatan: "Staff Kemahasiswaan", createdAt: "2024-01-08" },
  { id: "peg-009", nama: "Hendra Kurniawan", email: "hendra.kurniawan@uty.ac.id", departemen: departemenList[0], jabatan: "Dosen", createdAt: "2024-01-10" },
  { id: "peg-010", nama: "Yuli Astuti", email: "yuli.astuti@uty.ac.id", departemen: departemenList[3], jabatan: "Staff Administrasi", createdAt: "2024-01-10" },
  { id: "peg-011", nama: "Wahyu Setiawan", email: "wahyu.setiawan@uty.ac.id", departemen: departemenList[1], jabatan: "Dosen", createdAt: "2024-01-12" },
  { id: "peg-012", nama: "Putri Handayani", email: "putri.handayani@uty.ac.id", departemen: departemenList[4], jabatan: "Kepala Bagian", createdAt: "2024-01-12" },
  { id: "peg-013", nama: "Dimas Arya", email: "dimas.arya@uty.ac.id", departemen: departemenList[6], jabatan: "Kepala Unit TIK", createdAt: "2024-01-15" },
  { id: "peg-014", nama: "Lina Marlina", email: "lina.marlina@uty.ac.id", departemen: departemenList[2], jabatan: "Staff Administrasi", createdAt: "2024-01-15" },
  { id: "peg-015", nama: "Andi Firmansyah", email: "andi.firmansyah@uty.ac.id", departemen: departemenList[0], jabatan: "Kaprodi", createdAt: "2024-01-18" },
  { id: "peg-016", nama: "Sri Mulyani", email: "sri.mulyani@uty.ac.id", departemen: departemenList[7], jabatan: "Kepala Bagian", createdAt: "2024-01-18" },
  { id: "peg-017", nama: "Bambang Suryadi", email: "bambang.suryadi@uty.ac.id", departemen: departemenList[3], jabatan: "Staff Administrasi", createdAt: "2024-01-20" },
  { id: "peg-018", nama: "Mega Safitri", email: "mega.safitri@uty.ac.id", departemen: departemenList[5], jabatan: "Pustakawan", createdAt: "2024-01-20" },
  { id: "peg-019", nama: "Rendi Pratama", email: "rendi.pratama@uty.ac.id", departemen: departemenList[6], jabatan: "Staff IT", createdAt: "2024-01-22" },
  { id: "peg-020", nama: "Intan Permata", email: "intan.permata@uty.ac.id", departemen: departemenList[1], jabatan: "Dosen", createdAt: "2024-01-22" },
]

// --- Data: Email Templates ---

export const emailTemplates: EmailTemplate[] = [
  {
    id: "tpl-001",
    nama: "Reset Password Office 365",
    subject: "Segera Reset Password Anda - Office 365",
    kontenHtml: "<p>Yth. {{nama}},</p><p>Kami mendeteksi aktivitas mencurigakan pada akun Office 365 Anda. Segera reset password Anda melalui link berikut:</p><p><a href='{{link}}'>Reset Password Sekarang</a></p><p>Tim IT UTY</p>",
    tipe: "phishing",
    createdAt: "2024-01-10",
  },
  {
    id: "tpl-002",
    nama: "Update Data Kepegawaian",
    subject: "URGENT: Pembaruan Data Pegawai Semester Genap",
    kontenHtml: "<p>Kepada Yth. {{nama}},</p><p>Sehubungan dengan pembaruan data kepegawaian semester genap, mohon segera lengkapi data Anda melalui portal berikut:</p><p><a href='{{link}}'>Lengkapi Data</a></p><p>Bagian SDM UTY</p>",
    tipe: "social-engineering",
    createdAt: "2024-01-15",
  },
  {
    id: "tpl-003",
    nama: "Bonus THR Pegawai",
    subject: "Konfirmasi Penerimaan THR - Segera Verifikasi",
    kontenHtml: "<p>Yth. {{nama}},</p><p>THR Anda sebesar Rp 5.000.000 telah diproses. Untuk konfirmasi, silakan verifikasi rekening Anda:</p><p><a href='{{link}}'>Verifikasi Sekarang</a></p><p>Bagian Keuangan UTY</p>",
    tipe: "phishing",
    createdAt: "2024-02-01",
  },
  {
    id: "tpl-004",
    nama: "Undangan Rapat Pimpinan",
    subject: "Undangan Rapat Koordinasi Pimpinan - Konfirmasi Kehadiran",
    kontenHtml: "<p>Yth. {{nama}},</p><p>Anda diundang dalam rapat koordinasi pimpinan. Konfirmasi kehadiran Anda:</p><p><a href='{{link}}'>Konfirmasi Hadir</a></p><p>Sekretariat Rektorat UTY</p>",
    tipe: "spear-phishing",
    createdAt: "2024-02-10",
  },
  {
    id: "tpl-005",
    nama: "Google Drive Sharing",
    subject: "[Google Drive] Dokumen penting telah dibagikan kepada Anda",
    kontenHtml: "<p>Halo {{nama}},</p><p>Rektor UTY telah membagikan dokumen <b>'Surat Keputusan Kenaikan Jabatan 2024.pdf'</b> kepada Anda melalui Google Drive.</p><p>Dokumen ini memerlukan verifikasi identitas sebelum dapat diakses.</p><p><a href='{{link}}'>Buka Dokumen</a></p><p>Anda menerima email ini karena seseorang membagikan file kepada Anda. — Google Drive</p>",
    tipe: "phishing",
    createdAt: "2024-03-01",
  },
  {
    id: "tpl-006",
    nama: "Beasiswa Dosen",
    subject: "Selamat! Anda Terpilih Program Beasiswa S3 Luar Negeri",
    kontenHtml: "<p>Yth. {{nama}},</p><p>Dengan bangga kami informasikan bahwa Anda <b>terpilih</b> sebagai kandidat penerima beasiswa S3 Luar Negeri kerja sama UTY-LPDP Tahun 2024.</p><p>Batas waktu konfirmasi: <b>3 hari kerja.</b></p><p>Segera lengkapi formulir penerimaan:</p><p><a href='{{link}}'>Konfirmasi Beasiswa</a></p><p>Direktorat Riset & Pengabdian Masyarakat UTY</p>",
    tipe: "spear-phishing",
    createdAt: "2024-03-15",
  },
  {
    id: "tpl-007",
    nama: "WiFi Kampus Upgrade",
    subject: "Aksi Diperlukan: Upgrade Akun WiFi Kampus Anda",
    kontenHtml: "<p>Dear {{nama}},</p><p>Sistem WiFi kampus UTY telah di-upgrade ke jaringan baru <b>UTY-Secure 5G</b>. Semua pengguna wajib melakukan re-aktivasi akun sebelum <b>31 Januari 2024</b>, atau akses WiFi Anda akan dinonaktifkan.</p><p><a href='{{link}}'>Re-aktivasi Akun WiFi</a></p><p>Unit Teknologi Informasi & Komunikasi (TIK) UTY</p>",
    tipe: "social-engineering",
    createdAt: "2024-04-01",
  },
]

// --- Data: Materi Edukasi ---

export const materiEdukasiList: MateriEdukasi[] = [
  {
    id: "edu-001",
    judul: "Mengenali Email Phishing",
    konten: "Email phishing adalah upaya penipuan yang menyamar sebagai komunikasi resmi untuk mencuri data sensitif. Ciri-ciri utama: 1) Alamat pengirim mencurigakan, 2) Link URL tidak sesuai domain resmi, 3) Urgensi berlebihan, 4) Permintaan data pribadi. Selalu periksa URL sebelum mengklik link apapun.",
    tipe: "artikel",
    createdAt: "2024-01-10",
  },
  {
    id: "edu-002",
    judul: "Cara Melaporkan Email Mencurigakan",
    konten: "Jika Anda menerima email mencurigakan: 1) Jangan klik link apapun, 2) Jangan unduh lampiran, 3) Forward email ke security@uty.ac.id, 4) Hapus email dari inbox. Laporkan ke Unit TIK untuk investigasi lebih lanjut.",
    tipe: "artikel",
    createdAt: "2024-01-15",
  },
  {
    id: "edu-003",
    judul: "Keamanan Password yang Kuat",
    konten: "Password kuat harus memiliki: 1) Minimal 12 karakter, 2) Kombinasi huruf besar-kecil, angka, dan simbol, 3) Tidak menggunakan informasi pribadi, 4) Berbeda untuk setiap akun. Gunakan password manager untuk mengelola password.",
    tipe: "infografis",
    createdAt: "2024-02-01",
  },
]

// --- Data: Campaigns ---

export const campaigns: Campaign[] = [
  {
    id: "camp-001",
    name: "Kampanye Kesadaran Q1",
    templateId: "tpl-001",
    materiEdukasiId: "edu-001",
    date: "2024-01-15",
    scheduledDate: "2024-01-15",
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
    date: "2024-02-10",
    scheduledDate: "2024-02-10",
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
    date: "2024-02-28",
    scheduledDate: "2024-02-28",
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
    date: "2024-03-12",
    scheduledDate: "2024-03-12",
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
    date: "2024-03-25",
    scheduledDate: "2024-03-25",
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
    date: "2024-04-05",
    scheduledDate: "2024-04-05",
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
    date: "2024-04-18",
    scheduledDate: "2024-04-20",
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
    date: "2024-04-02",
    scheduledDate: "2024-04-02",
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
    date: "2024-04-10",
    scheduledDate: "2024-04-10",
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
    date: "2024-04-15",
    scheduledDate: "2024-04-15",
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
  { id: "log-001", campaignId: "camp-001", pegawaiId: "peg-001", token: "a1b2c3d4e5", status: "submitted", sentAt: "2024-01-15T08:00:00", openedAt: "2024-01-15T08:15:00", clickedAt: "2024-01-15T08:16:00", submittedAt: "2024-01-15T08:17:00", ipAddress: "192.168.1.10", userAgent: "Chrome/120" },
  { id: "log-002", campaignId: "camp-001", pegawaiId: "peg-002", token: "f6g7h8i9j0", status: "clicked", sentAt: "2024-01-15T08:00:00", openedAt: "2024-01-15T09:30:00", clickedAt: "2024-01-15T09:32:00", ipAddress: "192.168.1.22", userAgent: "Firefox/121" },
  { id: "log-003", campaignId: "camp-001", pegawaiId: "peg-003", token: "k1l2m3n4o5", status: "opened", sentAt: "2024-01-15T08:00:00", openedAt: "2024-01-15T10:00:00", ipAddress: "192.168.1.33", userAgent: "Edge/120" },
  { id: "log-004", campaignId: "camp-001", pegawaiId: "peg-004", token: "p6q7r8s9t0", status: "sent", sentAt: "2024-01-15T08:00:00" },
  { id: "log-005", campaignId: "camp-001", pegawaiId: "peg-005", token: "u1v2w3x4y5", status: "opened", sentAt: "2024-01-15T08:00:00", openedAt: "2024-01-15T11:20:00", ipAddress: "192.168.1.55", userAgent: "Chrome/120" },
  { id: "log-006", campaignId: "camp-002", pegawaiId: "peg-005", token: "z6a7b8c9d0", status: "opened", sentAt: "2024-02-10T09:00:00", openedAt: "2024-02-10T09:10:00", ipAddress: "192.168.1.55", userAgent: "Chrome/121" },
  { id: "log-007", campaignId: "camp-002", pegawaiId: "peg-013", token: "e1f2g3h4i5", status: "sent", sentAt: "2024-02-10T09:00:00" },
  { id: "log-008", campaignId: "camp-002", pegawaiId: "peg-019", token: "j6k7l8m9n0", status: "clicked", sentAt: "2024-02-10T09:00:00", openedAt: "2024-02-10T10:30:00", clickedAt: "2024-02-10T10:32:00", ipAddress: "192.168.1.77", userAgent: "Chrome/121" },
  { id: "log-009", campaignId: "camp-003", pegawaiId: "peg-012", token: "o1p2q3r4s5", status: "submitted", sentAt: "2024-02-28T08:00:00", openedAt: "2024-02-28T08:05:00", clickedAt: "2024-02-28T08:06:00", submittedAt: "2024-02-28T08:08:00", ipAddress: "192.168.1.44", userAgent: "Safari/17" },
  { id: "log-010", campaignId: "camp-003", pegawaiId: "peg-013", token: "t6u7v8w9x0", status: "clicked", sentAt: "2024-02-28T08:00:00", openedAt: "2024-02-28T08:20:00", clickedAt: "2024-02-28T08:22:00", ipAddress: "192.168.1.55", userAgent: "Chrome/122" },
  { id: "log-011", campaignId: "camp-005", pegawaiId: "peg-001", token: "y1z2a3b4c5", status: "opened", sentAt: "2024-03-25T08:00:00", openedAt: "2024-03-25T09:00:00", ipAddress: "192.168.1.10", userAgent: "Chrome/123" },
  { id: "log-012", campaignId: "camp-005", pegawaiId: "peg-007", token: "d6e7f8g9h0", status: "submitted", sentAt: "2024-03-25T08:00:00", openedAt: "2024-03-25T08:30:00", clickedAt: "2024-03-25T08:31:00", submittedAt: "2024-03-25T08:33:00", ipAddress: "192.168.1.66", userAgent: "Firefox/123" },
  // --- 3 new phishing logs for peg-001 (Budi Santoso) using new templates ---
  { id: "log-013", campaignId: "camp-gdrive", pegawaiId: "peg-001", token: "gd1v2e3r4i5", status: "sent", sentAt: "2024-04-02T10:30:00" },
  { id: "log-014", campaignId: "camp-beasiswa", pegawaiId: "peg-001", token: "bs6w7a8s9i0", status: "sent", sentAt: "2024-04-10T14:00:00" },
  { id: "log-015", campaignId: "camp-wifi", pegawaiId: "peg-001", token: "wf1u2p3g4r5", status: "sent", sentAt: "2024-04-15T09:15:00" },
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
  createdAt: `2024-04-${String(10 + i).padStart(2, "0")}`,
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
