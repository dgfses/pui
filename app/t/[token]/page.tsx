"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { simulationLogs, getCampaignById, getMateriById } from "@/lib/mock-data"
import { Shield, AlertTriangle, Loader2 } from "lucide-react"

export default function TrackingRedirectPage() {
  const params = useParams()
  const token = params.token as string
  const [status, setStatus] = useState<"loading" | "found" | "notfound">("loading")
  const [eduUrl, setEduUrl] = useState("")

  useEffect(() => {
    // Simulate tracking: look up token, update status, redirect
    const timer = setTimeout(() => {
      const log = simulationLogs.find((l) => l.token === token)
      if (log) {
        const campaign = getCampaignById(log.campaignId)
        if (campaign) {
          setEduUrl(`/phish/${token}`)
          setStatus("found")
          // Auto redirect to phishing page after 2s
          setTimeout(() => {
            window.location.href = `/phish/${token}`
          }, 2000)
        } else {
          setStatus("notfound")
        }
      } else {
        setStatus("notfound")
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4">
      <div className="text-center space-y-4 max-w-md">
        {status === "loading" && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-emerald-700 mx-auto" />
            <p className="text-lg font-medium text-emerald-900">Memproses...</p>
            <p className="text-sm text-muted-foreground">Mengverifikasi token tracking Anda</p>
          </>
        )}
        {status === "found" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
            <p className="text-lg font-bold text-amber-800">Klik Terdeteksi!</p>
            <p className="text-sm text-muted-foreground">
              Mengalihkan Anda ke halaman yang diminta...
            </p>
            <a href={eduUrl} className="text-sm text-emerald-700 underline">Klik di sini jika tidak redirect otomatis</a>
          </>
        )}
        {status === "notfound" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-lg font-bold text-red-800">Token Tidak Ditemukan</p>
            <p className="text-sm text-muted-foreground">Token tracking ini tidak valid atau sudah kedaluwarsa.</p>
          </>
        )}
      </div>
    </div>
  )
}
