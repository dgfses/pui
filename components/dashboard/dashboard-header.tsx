"use client"

import { Button } from "@/components/ui/button"
import { Download, Shield } from "lucide-react"

interface DashboardHeaderProps {
  onExportReport: () => void
}

export function DashboardHeader({ onExportReport }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard Analitik
          </h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan Kampanye Simulasi Phishing
          </p>
        </div>
      </div>
      <Button onClick={onExportReport} className="w-full sm:w-auto">
        <Download className="h-4 w-4" />
        Export Laporan
      </Button>
    </header>
  )
}
