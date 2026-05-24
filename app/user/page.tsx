"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Shield,
  KeyRound,
  Banknote,
  FolderOpen,
  GraduationCap,
  Wifi,
  CalendarCheck,
  LogOut,
  History,
  Trash2,
  CheckCircle2,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getSimulationResults,
  saveSimulationResult,
  clearSimulationResults,
  type SimulationResult,
} from "@/lib/storage"

/* ------------------------------------------------------------------ */
/*  Scenario Data                                                      */
/* ------------------------------------------------------------------ */

const iconMap = {
  KeyRound,
  Banknote,
  FolderOpen,
  GraduationCap,
  Wifi,
  CalendarCheck,
} as const

type IconName = keyof typeof iconMap

interface Scenario {
  id: string
  name: string
  description: string
  icon: IconName
  color: string
  difficulty: "Mudah" | "Sedang" | "Sulit"
}

const scenarios: Scenario[] = [
  {
    id: "tpl-001",
    name: "Reset Password Office 365",
    description:
      "Email dari IT Support yang meminta Anda segera mereset password Office 365",
    icon: "KeyRound",
    color: "from-red-500 to-orange-500",
    difficulty: "Mudah",
  },
  {
    id: "tpl-003",
    name: "Bonus THR Pegawai",
    description:
      "Email dari Bagian Keuangan tentang konfirmasi penerimaan THR",
    icon: "Banknote",
    color: "from-green-500 to-emerald-500",
    difficulty: "Mudah",
  },
  {
    id: "tpl-005",
    name: "Google Drive Sharing",
    description:
      "Notifikasi Google Drive bahwa dokumen penting telah dibagikan",
    icon: "FolderOpen",
    color: "from-blue-500 to-cyan-500",
    difficulty: "Sedang",
  },
  {
    id: "tpl-006",
    name: "Beasiswa S3 Luar Negeri",
    description:
      "Email dari Direktorat Riset tentang seleksi beasiswa S3",
    icon: "GraduationCap",
    color: "from-purple-500 to-violet-500",
    difficulty: "Sulit",
  },
  {
    id: "tpl-007",
    name: "WiFi Kampus Upgrade",
    description: "Permintaan re-aktivasi akun WiFi dari Unit TIK",
    icon: "Wifi",
    color: "from-teal-500 to-cyan-500",
    difficulty: "Sedang",
  },
  {
    id: "tpl-004",
    name: "Undangan Rapat Pimpinan",
    description:
      "Undangan rapat koordinasi pimpinan yang meminta konfirmasi kehadiran",
    icon: "CalendarCheck",
    color: "from-amber-500 to-yellow-500",
    difficulty: "Sulit",
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const difficultyStyle: Record<string, string> = {
  Mudah: "bg-green-100 text-green-700 ring-green-300",
  Sedang: "bg-yellow-100 text-yellow-700 ring-yellow-300",
  Sulit: "bg-red-100 text-red-700 ring-red-300",
}

const statusEmoji: Record<string, string> = {
  opened: "📧",
  clicked: "⚠️",
  submitted: "❌",
  completed: "✅",
}

const statusLabel: Record<string, string> = {
  opened: "Dibuka",
  clicked: "Diklik",
  submitted: "Tersubmit",
  completed: "Selesai",
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function UserPortalPage() {
  const router = useRouter()
  const [results, setResults] = useState<SimulationResult[]>([])
  const [mounted, setMounted] = useState(false)

  // Load results from localStorage (client-only)
  useEffect(() => {
    setMounted(true)
    setResults(getSimulationResults())
  }, [])

  function handleStart(scenario: Scenario) {
    saveSimulationResult({
      id: `sim-${Date.now()}`,
      scenarioId: scenario.id,
      scenarioName: scenario.name,
      status: "opened",
      startedAt: new Date().toISOString(),
    })
    router.push("/inbox/peg-001")
  }

  function handleClear() {
    clearSimulationResults()
    setResults([])
  }

  function isCompleted(scenarioId: string) {
    return results.some(
      (r) => r.scenarioId === scenarioId && r.status === "completed"
    )
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50">
      {/* Subtle background pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Left — Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-md">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-emerald-900">
                PhishGuard
              </h1>
              <p className="text-xs text-emerald-600/70">
                Portal Simulasi Phishing
              </p>
            </div>
          </div>

          {/* Right — User info + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-bold text-white shadow-sm">
                B
              </div>
              <span className="text-sm font-medium text-gray-700">
                Budi Santoso
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/login")}
              className="gap-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ============ MAIN ============ */}
      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Selamat Datang, <span className="text-emerald-700">Budi</span> 👋
          </h2>
          <p className="mt-1 text-gray-500">
            Pilih skenario simulasi phishing di bawah ini untuk menguji
            kewaspadaan Anda.
          </p>
        </section>

        {/* ============ SCENARIO GRID ============ */}
        <section className="mb-14">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((s) => {
              const Icon = iconMap[s.icon]
              const done = isCompleted(s.id)

              return (
                <div
                  key={s.id}
                  className="group relative flex flex-col rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-emerald-200"
                >
                  {/* Completed badge */}
                  {done && (
                    <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md ring-2 ring-white">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-md transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Title + difficulty */}
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 leading-snug">
                      {s.name}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${difficultyStyle[s.difficulty]}`}
                    >
                      {s.difficulty}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-5 flex-1 text-sm text-gray-500 leading-relaxed">
                    {s.description}
                  </p>

                  {/* Button */}
                  <Button
                    onClick={() => handleStart(s)}
                    className="w-full gap-2 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-sm hover:from-emerald-800 hover:to-emerald-900"
                  >
                    <Play className="h-4 w-4" />
                    Mulai Simulasi
                  </Button>
                </div>
              )
            })}
          </div>
        </section>

        {/* ============ HISTORY SECTION ============ */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <History className="h-5 w-5 text-emerald-600" />
              📊 Riwayat Simulasi Anda
            </h2>
            {results.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="gap-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Hapus Riwayat
              </Button>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm">
            {results.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-gray-400">
                Belum ada riwayat simulasi. Pilih skenario di atas untuk
                memulai.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/60 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      <th className="px-5 py-3">Skenario</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[...results].reverse().map((r) => (
                      <tr
                        key={r.id}
                        className="transition-colors hover:bg-emerald-50/40"
                      >
                        <td className="whitespace-nowrap px-5 py-3 font-medium text-gray-800">
                          {r.scenarioName}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3">
                          <span className="inline-flex items-center gap-1.5">
                            <span>{statusEmoji[r.status] ?? "❓"}</span>
                            <span className="text-gray-600">
                              {statusLabel[r.status] ?? r.status}
                            </span>
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-gray-500">
                          {new Date(r.startedAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="mt-8 border-t border-gray-100 bg-white/50 py-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} PhishGuard — Universitas Teknologi
        Yogyakarta
      </footer>
    </div>
  )
}
