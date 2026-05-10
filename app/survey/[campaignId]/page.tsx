"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { campaigns } from "@/lib/mock-data"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Shield, CheckCircle2, ClipboardList } from "lucide-react"

const SUS_QUESTIONS = [
  "Saya merasa sistem ini mudah digunakan.",
  "Saya merasa sistem ini terlalu kompleks.",
  "Saya merasa sistem ini mudah dipelajari.",
  "Saya memerlukan bantuan teknis untuk menggunakan sistem.",
  "Saya menemukan berbagai fungsi terintegrasi dengan baik.",
  "Saya merasa ada banyak inkonsistensi di sistem.",
  "Saya merasa kebanyakan orang akan cepat belajar menggunakan sistem.",
  "Saya merasa sistem ini sangat merepotkan.",
  "Saya merasa percaya diri menggunakan sistem ini.",
  "Saya perlu banyak belajar sebelum bisa menggunakan sistem.",
]

function getSUSGrade(score: number) {
  if (score >= 80.3) return { grade: "Excellent", color: "text-emerald-700", bg: "bg-emerald-50" }
  if (score >= 68) return { grade: "Good", color: "text-blue-700", bg: "bg-blue-50" }
  if (score >= 51) return { grade: "OK", color: "text-amber-700", bg: "bg-amber-50" }
  return { grade: "Poor", color: "text-red-700", bg: "bg-red-50" }
}

export default function SurveyPage() {
  const params = useParams()
  const campaignId = params.campaignId as string
  const campaign = campaigns.find((c) => c.id === campaignId)

  const [nama, setNama] = useState("")
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0))
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  function handleAnswer(index: number, value: number) {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  function calculateScore() {
    let total = 0
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) total += answers[i] - 1
      else total += 5 - answers[i]
    }
    return total * 2.5
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nama || answers.some((a) => a === 0)) return
    const finalScore = calculateScore()
    setScore(finalScore)
    setSubmitted(true)
  }

  const allFilled = nama.trim() !== "" && answers.every((a) => a > 0)
  const gradeInfo = getSUSGrade(score)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-6 px-4 shadow-lg">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">Kuesioner Evaluasi Sistem</h1>
          <p className="text-emerald-100 text-sm">
            Universitas Teknologi Yogyakarta — Program Kesadaran Phishing
          </p>
          {campaign && (
            <p className="text-xs text-emerald-200 bg-white/10 inline-block px-3 py-1 rounded-full">
              Kampanye: {campaign.name}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Intro */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-emerald-700" />
                <h2 className="font-semibold text-lg">System Usability Scale (SUS)</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Kuesioner ini bertujuan untuk mengevaluasi kemudahan penggunaan sistem simulasi phishing yang telah Anda alami. Jawaban Anda bersifat <strong>anonim</strong> dan hanya digunakan untuk keperluan perbaikan sistem.
              </p>
              <p className="text-xs text-gray-500">
                Pilih skala 1 (Sangat Tidak Setuju) sampai 5 (Sangat Setuju) untuk setiap pertanyaan.
              </p>
            </div>

            {/* Name */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-3">
              <label htmlFor="survey-nama" className="block text-sm font-medium text-gray-700">
                Nama Anda <span className="text-red-500">*</span>
              </label>
              <input
                id="survey-nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            {/* Questions */}
            {SUS_QUESTIONS.map((q, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                <p className="text-sm font-medium text-gray-800">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mr-2">
                    {i + 1}
                  </span>
                  {q}
                </p>
                <RadioGroup
                  value={String(answers[i] || "")}
                  onValueChange={(v) => handleAnswer(i, Number(v))}
                  className="flex justify-between"
                >
                  {[1, 2, 3, 4, 5].map((v) => (
                    <div key={v} className="flex flex-col items-center gap-2">
                      <RadioGroupItem value={String(v)} id={`sq${i}-${v}`} />
                      <Label htmlFor={`sq${i}-${v}`} className="text-xs text-gray-500 font-normal">
                        {v}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex justify-between text-[10px] text-gray-400 px-1">
                  <span>Sangat Tidak Setuju</span>
                  <span>Sangat Setuju</span>
                </div>
              </div>
            ))}

            {/* Submit */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <button
                type="submit"
                disabled={!allFilled}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg text-sm transition"
              >
                Kirim Jawaban
              </button>
              {!allFilled && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Isi nama dan jawab semua pertanyaan untuk mengirim.
                </p>
              )}
            </div>
          </form>
        ) : (
          /* Result */
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Terima Kasih, {nama}!</h2>
              <p className="text-sm text-gray-500 mt-1">Jawaban Anda telah berhasil dicatat.</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Skor SUS Anda</p>
              <p className={`text-5xl font-bold ${gradeInfo.color}`}>{score.toFixed(1)}</p>
              <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${gradeInfo.bg} ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-emerald-600 transition-all duration-1000"
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              Skor SUS berkisar 0–100. Skor di atas 68 dianggap &quot;above average&quot;.
            </p>
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} PhishGuard — Universitas Teknologi Yogyakarta
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
