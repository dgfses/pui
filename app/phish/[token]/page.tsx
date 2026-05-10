"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { simulationLogs, getCampaignById } from "@/lib/mock-data"
import { Loader2 } from "lucide-react"

export default function PhishingPage() {
  const params = useParams()
  const router = useRouter()
  const token = params.token as string
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const log = simulationLogs.find((l) => l.token === token)
  const campaign = log ? getCampaignById(log.campaignId) : null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError("Silakan masukkan email dan password Anda.")
      return
    }
    setSubmitting(true)
    setError("")

    // Simulate a "processing" delay, then redirect to education page
    setTimeout(() => {
      // In a real system, this would POST to the backend to log "submitted" status
      // The credentials are NOT actually stored — this is a simulation
      router.push(`/edu/${token}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Fake UTY SSO Header */}
      <header className="bg-blue-900 text-white py-3 px-6 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              U
            </div>
            <div>
              <p className="font-semibold text-sm">Universitas Teknologi Yogyakarta</p>
              <p className="text-[11px] text-blue-200">Single Sign-On Portal</p>
            </div>
          </div>
          <p className="text-xs text-blue-300 hidden sm:block">sso.uty.ac.id</p>
        </div>
      </header>

      {/* Fake Login Form */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
            {/* Card Header */}
            <div className="bg-blue-800 px-6 py-5 text-center text-white">
              <h1 className="text-lg font-semibold">Portal Akademik UTY</h1>
              <p className="text-xs text-blue-200 mt-1">
                Silakan login untuk mengakses layanan akademik
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Fake urgency notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  <strong>⚠️ Penting:</strong> Sesi Anda telah berakhir. Silakan login ulang untuk melanjutkan akses ke sistem akademik.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="phish-email" className="block text-sm font-medium text-gray-700">
                  Email / NIP
                </label>
                <input
                  id="phish-email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@uty.ac.id"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phish-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="phish-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={submitting}
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memverifikasi...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <div className="flex justify-between text-xs text-gray-500">
                <a href="#" className="hover:text-blue-700" onClick={(e) => e.preventDefault()}>
                  Lupa Password?
                </a>
                <a href="#" className="hover:text-blue-700" onClick={(e) => e.preventDefault()}>
                  Bantuan
                </a>
              </div>
            </form>
          </div>

          {/* Fake footer */}
          <p className="text-center text-[11px] text-gray-400 mt-4">
            © 2024 Universitas Teknologi Yogyakarta. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  )
}
