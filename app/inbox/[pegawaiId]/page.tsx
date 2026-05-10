"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { getPegawaiById, campaigns, getTemplateById, simulationLogs } from "@/lib/mock-data"
import { Mail, Star, Trash2, Archive, Search, Menu, Inbox, Send, FileText, AlertTriangle, ChevronLeft, Paperclip, Reply, Forward, MoreVertical, Clock } from "lucide-react"

// Static time formatter to avoid hydration mismatch from toLocaleTimeString
function formatLogTime(sentAt: string): string {
  const d = new Date(sentAt)
  const h = String(d.getHours()).padStart(2, "0")
  const m = String(d.getMinutes()).padStart(2, "0")
  return `${h}:${m}`
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
function formatLogDate(sentAt: string): string {
  const d = new Date(sentAt)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

// Simulated normal (safe) emails
const safeEmails: EmailItem[] = [
  { id: "safe-1", from: "Bagian SDM UTY", fromEmail: "sdm@uty.ac.id", subject: "Jadwal Cuti Bersama Tahun 2024", preview: "Dengan hormat, berikut kami sampaikan jadwal cuti bersama...", body: "Dengan hormat,\n\nBerikut kami sampaikan jadwal cuti bersama tahun 2024 sesuai dengan Surat Keputusan Rektor:\n\n1. 10-11 April 2024 (Hari Raya Idul Fitri)\n2. 1 Mei 2024 (Hari Buruh)\n3. 9 Mei 2024 (Kenaikan Isa Al Masih)\n4. 1 Juni 2024 (Hari Lahir Pancasila)\n\nMohon menyesuaikan jadwal kerja Anda.\n\nHormat kami,\nBagian SDM UTY", time: "10:30", date: "15 Jan", read: true, starred: false, hasAttachment: true, category: "primary" },
  { id: "safe-2", from: "Google Scholar", fromEmail: "scholar-noreply@google.com", subject: "New citations to your articles", preview: "Your article 'Machine Learning for IoT Security' has 3 new citations...", body: "Hi,\n\nYour article 'Machine Learning for IoT Security' has been cited by 3 new articles:\n\n1. 'Deep Learning Approaches in Cybersecurity' - Journal of AI Research\n2. 'IoT Security Framework' - IEEE Conference 2024\n3. 'Smart Campus Security Systems' - Elsevier\n\nView all citations on Google Scholar.\n\nBest,\nGoogle Scholar Team", time: "09:15", date: "15 Jan", read: true, starred: true, hasAttachment: false, category: "updates" },
  { id: "safe-3", from: "Zoom", fromEmail: "no-reply@zoom.us", subject: "Rapat Jurusan - Reminder", preview: "This is a reminder that you have a meeting tomorrow at 09:00...", body: "Hi,\n\nThis is a reminder for your upcoming meeting:\n\nTopic: Rapat Koordinasi Jurusan\nDate: 16 Jan 2024, 09:00 WIB\nDuration: 1 hour\n\nJoin Zoom Meeting:\nhttps://zoom.us/j/123456789\n\nMeeting ID: 123 456 789\nPasscode: jurusan2024", time: "08:00", date: "15 Jan", read: false, starred: false, hasAttachment: false, category: "primary" },
  { id: "safe-4", from: "Perpustakaan UTY", fromEmail: "lib@uty.ac.id", subject: "Pengingat Pengembalian Buku", preview: "Buku yang Anda pinjam sudah mendekati batas waktu pengembalian...", body: "Yth. Bapak/Ibu,\n\nBuku yang Anda pinjam sudah mendekati batas waktu pengembalian:\n\n- 'Keamanan Jaringan Komputer' (Jatuh tempo: 20 Jan 2024)\n- 'Pengantar Kriptografi' (Jatuh tempo: 22 Jan 2024)\n\nMohon segera mengembalikan atau memperpanjang pinjaman melalui portal perpustakaan.\n\nTerima kasih,\nPerpustakaan UTY", time: "14:20", date: "14 Jan", read: true, starred: false, hasAttachment: false, category: "primary" },
  { id: "safe-5", from: "GitHub", fromEmail: "notifications@github.com", subject: "[uty-lab/web-project] Pull request #42 merged", preview: "Pull request #42 has been merged by @admin...", body: "Pull request #42 'Fix authentication module' has been merged into main by @admin.\n\nChanges:\n- Fixed login redirect bug\n- Updated session timeout\n- Added CSRF protection\n\nView on GitHub: https://github.com/uty-lab/web-project/pull/42", time: "16:45", date: "14 Jan", read: true, starred: false, hasAttachment: false, category: "updates" },
]

interface EmailItem {
  id: string; from: string; fromEmail: string; subject: string; preview: string; body: string
  time: string; date: string; read: boolean; starred: boolean; hasAttachment: boolean
  category: string; isPhishing?: boolean; trackingToken?: string
}

// Deterministic interleave: safe1, phish1, safe2, phish2, safe3, ...
function interleaveEmails(phishing: EmailItem[], safe: EmailItem[]): EmailItem[] {
  const result: EmailItem[] = []
  const maxLen = Math.max(phishing.length, safe.length)
  for (let i = 0; i < maxLen; i++) {
    if (i < safe.length) result.push(safe[i])
    if (i < phishing.length) result.push(phishing[i])
  }
  return result
}

// Map template to realistic sender names
function getSenderName(template: { nama: string; tipe: string }): string {
  if (template.nama.includes("Password")) return "IT Support UTY"
  if (template.nama.includes("Google Drive")) return "Google Drive"
  if (template.nama.includes("Beasiswa")) return "Direktorat Riset UTY"
  if (template.nama.includes("WiFi")) return "Unit TIK UTY"
  if (template.nama.includes("THR") || template.nama.includes("Bonus")) return "Bagian Keuangan UTY"
  if (template.tipe === "spear-phishing") return "Sekretariat Rektorat UTY"
  return "Admin Kepegawaian UTY"
}

function getSenderEmail(template: { nama: string; tipe: string }): string {
  if (template.nama.includes("Password")) return "support@office365-uty.com"
  if (template.nama.includes("Google Drive")) return "drive-noreply@google-uty.com"
  if (template.nama.includes("Beasiswa")) return "riset@uty-scholarship.com"
  if (template.nama.includes("WiFi")) return "tik@uty-network.com"
  if (template.nama.includes("THR") || template.nama.includes("Bonus")) return "keuangan@uty-finance.com"
  if (template.tipe === "spear-phishing") return "rektorat@uty-portal.com"
  return "sdm@uty-update.com"
}

export default function InboxPage() {
  const params = useParams()
  const pegawaiId = params.pegawaiId as string
  const pegawai = getPegawaiById(pegawaiId)

  // Build phishing emails from simulation logs (memoized, deterministic)
  const allEmails = useMemo(() => {
    const phishingEmails: EmailItem[] = simulationLogs
      .filter(log => log.pegawaiId === pegawaiId)
      .map((log, i) => {
        const campaign = campaigns.find(c => c.id === log.campaignId)
        const template = campaign ? getTemplateById(campaign.templateId) : null
        if (!template || !campaign) return null
        const htmlBody = template.kontenHtml
          .replace(/\{\{nama\}\}/g, pegawai?.nama || "Pengguna")
          .replace(/\{\{link\}\}/g, `/t/${log.token}`)
          .replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
        return {
          id: `phish-${i}`,
          from: getSenderName(template),
          fromEmail: getSenderEmail(template),
          subject: template.subject, preview: htmlBody.substring(0, 80) + "...", body: htmlBody,
          time: formatLogTime(log.sentAt),
          date: formatLogDate(log.sentAt),
          read: false, starred: false, hasAttachment: false, category: "primary",
          isPhishing: true, trackingToken: log.token,
        }
      }).filter(Boolean) as EmailItem[]

    return interleaveEmails(phishingEmails, safeEmails)
  }, [pegawaiId, pegawai?.nama])

  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null)
  const [activeFolder, setActiveFolder] = useState("inbox")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const filteredEmails = allEmails.filter(e =>
    e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.from.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!pegawai) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center space-y-3">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
          <h1 className="text-xl font-bold">Pegawai tidak ditemukan</h1>
          <p className="text-sm text-gray-500">ID: {pegawaiId}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Gmail-style Header */}
      <header className="bg-white border-b h-16 flex items-center px-4 gap-4 sticky top-0 z-50 shadow-sm">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-full">
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 flex items-center justify-center">
            <Mail className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl text-gray-700 font-light hidden sm:inline">UTY Mail</span>
        </div>
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Cari email" className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white focus:shadow-md rounded-full pl-10 pr-4 py-2.5 text-sm outline-none transition border border-transparent focus:border-gray-300" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium text-sm">
            {pegawai.nama.charAt(0)}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r p-3 space-y-1 hidden md:block">
            <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-2xl px-6 py-3.5 text-sm font-medium flex items-center gap-3 shadow-sm mb-4 transition">
              <Mail className="h-5 w-5" /> Tulis Email
            </button>
            {[
              { icon: Inbox, label: "Kotak Masuk", count: filteredEmails.length, id: "inbox" },
              { icon: Star, label: "Berbintang", count: allEmails.filter(e => e.starred).length, id: "starred" },
              { icon: Clock, label: "Ditunda", count: 0, id: "snoozed" },
              { icon: Send, label: "Terkirim", count: 0, id: "sent" },
              { icon: FileText, label: "Draf", count: 0, id: "drafts" },
              { icon: Trash2, label: "Sampah", count: 0, id: "trash" },
            ].map(item => (
              <button key={item.id} onClick={() => setActiveFolder(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-r-full text-sm transition ${activeFolder === item.id ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`}>
                <item.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count > 0 && <span className="text-xs font-medium">{item.count}</span>}
              </button>
            ))}
            <div className="pt-4 px-4">
              <p className="text-xs text-gray-400 mb-2">Login sebagai:</p>
              <p className="text-xs font-medium text-gray-600">{pegawai.nama}</p>
              <p className="text-xs text-gray-400">{pegawai.email}</p>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 bg-white">
          {!selectedEmail ? (
            /* Email List */
            <div className="divide-y">
              {filteredEmails.map(email => (
                <button key={email.id} onClick={() => setSelectedEmail(email)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:shadow-sm transition cursor-pointer group ${!email.read ? "bg-white font-semibold" : "bg-gray-50/60"} ${email.isPhishing ? "" : ""}`}>
                  {/* Avatar */}
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 ${
                    email.from === "Google Drive" ? "bg-yellow-500" :
                    email.from === "Direktorat Riset UTY" ? "bg-purple-500" :
                    email.from === "Unit TIK UTY" ? "bg-cyan-600" :
                    email.from === "IT Support UTY" ? "bg-red-400" :
                    email.from === "Bagian Keuangan UTY" ? "bg-orange-500" :
                    email.from === "Sekretariat Rektorat UTY" ? "bg-rose-600" :
                    email.fromEmail.includes("google") ? "bg-blue-500" :
                    email.fromEmail.includes("zoom") ? "bg-blue-600" :
                    email.fromEmail.includes("github") ? "bg-gray-800" :
                    "bg-emerald-600"
                  }`}>
                    {email.from.charAt(0)}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm truncate ${!email.read ? "text-gray-900" : "text-gray-600"}`}>{email.from}</span>
                      {email.isPhishing && !email.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                    </div>
                    <div className="flex gap-1 text-sm">
                      <span className={`truncate ${!email.read ? "text-gray-900" : "text-gray-600"}`}>{email.subject}</span>
                      <span className="text-gray-400 truncate hidden sm:inline"> — {email.preview}</span>
                    </div>
                  </div>
                  {/* Meta */}
                  <div className="flex items-center gap-2 shrink-0">
                    {email.hasAttachment && <Paperclip className="h-3.5 w-3.5 text-gray-400" />}
                    <span className={`text-xs ${!email.read ? "text-gray-900 font-semibold" : "text-gray-500"}`}>{email.date}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Email Detail */
            <div className="max-w-4xl">
              {/* Toolbar */}
              <div className="flex items-center gap-1 px-4 py-2 border-b">
                <button onClick={() => setSelectedEmail(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full"><Archive className="h-4 w-4 text-gray-600" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-full"><Trash2 className="h-4 w-4 text-gray-600" /></button>
                <div className="flex-1" />
                <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical className="h-4 w-4 text-gray-600" /></button>
              </div>
              {/* Subject */}
              <div className="px-6 py-4">
                <h1 className="text-xl text-gray-900">{selectedEmail.subject}</h1>
              </div>
              {/* Sender */}
              <div className="px-6 pb-4 flex items-start gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium shrink-0 ${selectedEmail.isPhishing ? "bg-red-400" : "bg-emerald-600"}`}>
                  {selectedEmail.from.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{selectedEmail.from}</span>
                    <span className="text-xs text-gray-400">&lt;{selectedEmail.fromEmail}&gt;</span>
                  </div>
                  <p className="text-xs text-gray-500">kepada saya</p>
                </div>
                <span className="text-xs text-gray-400">{selectedEmail.date}, {selectedEmail.time}</span>
              </div>
              {/* Body */}
              <div className="px-6 pb-6 pl-[4.5rem]">
                {selectedEmail.isPhishing ? (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{selectedEmail.body}</div>
                    <a href={`/t/${selectedEmail.trackingToken}`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition shadow-sm">
                      {selectedEmail.subject.includes("Reset") ? "Reset Password Sekarang" :
                       selectedEmail.subject.includes("THR") ? "Verifikasi Sekarang" :
                       selectedEmail.subject.includes("Undangan") ? "Konfirmasi Kehadiran" :
                       selectedEmail.subject.includes("Google Drive") ? "Buka Dokumen" :
                       selectedEmail.subject.includes("Beasiswa") ? "Konfirmasi Beasiswa" :
                       selectedEmail.subject.includes("WiFi") ? "Re-aktivasi Akun WiFi" :
                       "Lengkapi Data"}
                    </a>
                    <p className="text-xs text-gray-400">Klik tombol di atas untuk menyelesaikan proses.</p>
                  </div>
                ) : (
                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{selectedEmail.body}</div>
                )}
              </div>
              {/* Reply bar */}
              <div className="px-6 pb-6 pl-[4.5rem] flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-50"><Reply className="h-4 w-4" /> Balas</button>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-50"><Forward className="h-4 w-4" /> Teruskan</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
