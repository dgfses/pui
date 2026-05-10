"use client"

import { useParams } from "next/navigation"
import { simulationLogs, getCampaignById, getMateriById, getPegawaiById } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, BookOpen, CheckCircle2, XCircle, ExternalLink, ClipboardList } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const tips = [
  { icon: CheckCircle2, text: "Selalu periksa alamat pengirim email sebelum mengklik apapun", do: true },
  { icon: CheckCircle2, text: "Hover pada link untuk melihat URL tujuan yang sebenarnya", do: true },
  { icon: CheckCircle2, text: "Laporkan email mencurigakan ke Unit TIK (security@uty.ac.id)", do: true },
  { icon: CheckCircle2, text: "Gunakan autentikasi 2 faktor (2FA) pada semua akun", do: true },
  { icon: XCircle, text: "Jangan pernah memasukkan password di link yang diterima via email", do: false },
  { icon: XCircle, text: "Jangan unduh lampiran dari pengirim yang tidak dikenal", do: false },
  { icon: XCircle, text: "Jangan terburu-buru oleh email yang mengandung urgensi berlebihan", do: false },
]

export default function EducationPage() {
  const params = useParams()
  const token = params.token as string

  const log = simulationLogs.find((l) => l.token === token)
  const campaign = log ? getCampaignById(log.campaignId) : null
  const materi = campaign ? getMateriById(campaign.materiEdukasiId) : null
  const pegawai = log ? getPegawaiById(log.pegawaiId) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold">Pelatihan Keamanan Siber</h1>
          <p className="text-emerald-100 text-sm">
            Universitas Teknologi Yogyakarta — Program Kesadaran Phishing
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Warning */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="py-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Anda baru saja mengklik link dari email simulasi phishing.</p>
              <p className="text-sm text-amber-700 mt-1">
                Ini adalah bagian dari program pelatihan keamanan siber UTY. Tidak ada data Anda yang diretas. Namun, jika ini adalah serangan nyata, data Anda bisa saja dicuri.
              </p>
              {pegawai && (
                <p className="text-xs text-amber-600 mt-2">
                  Target: <strong>{pegawai.nama}</strong> ({pegawai.departemen})
                  {campaign && <> — Kampanye: <strong>{campaign.name}</strong></>}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Materi Edukasi */}
        {materi && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-700" />
                <CardTitle>{materi.judul}</CardTitle>
              </div>
              <Badge variant="outline" className="w-fit capitalize">{materi.tipe}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{materi.konten}</p>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tips Menghindari Phishing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tips.map((tip, i) => {
              const Icon = tip.icon
              return (
                <div key={i} className={`flex items-start gap-3 rounded-lg border p-3 ${tip.do ? "border-emerald-200 bg-emerald-50/50" : "border-red-200 bg-red-50/50"}`}>
                  <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${tip.do ? "text-emerald-600" : "text-red-600"}`} />
                  <p className="text-sm">{tip.text}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white border-0">
          <CardContent className="py-6 text-center space-y-3">
            <p className="font-semibold">Perlu bantuan atau ingin melaporkan email mencurigakan?</p>
            <p className="text-sm text-emerald-100">Hubungi Unit TIK UTY di <strong>security@uty.ac.id</strong></p>
            <a href="mailto:security@uty.ac.id" className="inline-flex items-center gap-2 bg-white text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition">
              <ExternalLink className="h-4 w-4" /> Kirim Laporan
            </a>
          </CardContent>
        </Card>

        {/* SUS Survey CTA */}
        {campaign && (
          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardContent className="py-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                <ClipboardList className="h-6 w-6 text-emerald-700" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold text-emerald-900">Bantu kami evaluasi sistem ini!</p>
                <p className="text-sm text-emerald-700/70 mt-1">
                  Isi kuesioner singkat (2 menit) untuk membantu meningkatkan program keamanan siber UTY.
                </p>
              </div>
              <a
                href={`/survey/${campaign.id}`}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shrink-0"
              >
                <ClipboardList className="h-4 w-4" />
                Isi Kuesioner
              </a>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-muted-foreground pb-8">
          © {new Date().getFullYear()} PhishGuard — Universitas Teknologi Yogyakarta. Simulasi ini dilakukan untuk tujuan edukasi.
        </p>
      </div>
    </div>
  )
}
