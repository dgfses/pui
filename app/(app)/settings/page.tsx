"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Lock, Globe, Server, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface CheckItem {
  id: string
  label: string
  description: string
  category: string
  priority: "critical" | "high" | "medium"
}

const checklist: CheckItem[] = [
  { id: "auth-1", label: "Password di-hash dengan bcrypt", description: "Pastikan semua password disimpan dalam bentuk hash, bukan plain text", category: "Autentikasi", priority: "critical" },
  { id: "auth-2", label: "CSRF protection aktif", description: "Middleware CSRF diaktifkan untuk semua form submission", category: "Autentikasi", priority: "critical" },
  { id: "auth-3", label: "Rate limiting pada login", description: "Batasi percobaan login maksimal 5x per menit", category: "Autentikasi", priority: "high" },
  { id: "auth-4", label: "Session timeout diatur", description: "Session otomatis expire setelah 30 menit inaktivitas", category: "Autentikasi", priority: "medium" },
  { id: "input-1", label: "Validasi input dengan Form Request", description: "Semua input user divalidasi sebelum diproses", category: "Validasi Input", priority: "critical" },
  { id: "input-2", label: "Sanitasi HTML output", description: "Escape output untuk mencegah XSS attack", category: "Validasi Input", priority: "critical" },
  { id: "input-3", label: "SQL Injection prevention", description: "Gunakan Eloquent ORM / Prepared Statements", category: "Validasi Input", priority: "critical" },
  { id: "token-1", label: "Token tidak mengandung data sensitif", description: "Token tracking berupa hash/UUID acak, bukan data user langsung", category: "Token & Tracking", priority: "high" },
  { id: "token-2", label: "Rate limiting pada endpoint tracking", description: "Cegah brute force token /t/{token}", category: "Token & Tracking", priority: "high" },
  { id: "token-3", label: "Token memiliki expiry time", description: "Token tracking kadaluarsa setelah periode kampanye berakhir", category: "Token & Tracking", priority: "medium" },
  { id: "log-1", label: "Security logging channel terpisah", description: "Event keamanan dicatat di file log terpisah (security.log)", category: "Logging", priority: "high" },
  { id: "log-2", label: "Log tidak menyimpan data sensitif", description: "Password dan token asli tidak dicatat dalam log", category: "Logging", priority: "critical" },
  { id: "log-3", label: "Log file tidak publik accessible", description: "File log tidak bisa diakses via web browser", category: "Logging", priority: "high" },
  { id: "log-4", label: "Rotasi log otomatis", description: "Gunakan driver daily untuk rotasi log harian", category: "Logging", priority: "medium" },
  { id: "deploy-1", label: "Environment production mode", description: "APP_DEBUG=false dan APP_ENV=production", category: "Deployment", priority: "critical" },
  { id: "deploy-2", label: "HTTPS aktif", description: "Semua traffic melalui HTTPS", category: "Deployment", priority: "critical" },
  { id: "deploy-3", label: "CORS dikonfigurasi dengan benar", description: "Hanya domain frontend yang diizinkan", category: "Deployment", priority: "high" },
  { id: "deploy-4", label: "Database backup otomatis", description: "Backup database terjadwal secara berkala", category: "Deployment", priority: "medium" },
]

const categories = [...new Set(checklist.map(c => c.category))]
const categoryIcons: Record<string, React.ElementType> = {
  "Autentikasi": Lock,
  "Validasi Input": Shield,
  "Token & Tracking": Globe,
  "Logging": AlertTriangle,
  "Deployment": Server,
}

export default function SettingsPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const total = checklist.length
  const done = checked.size
  const progress = (done / total) * 100

  function getPriorityBadge(p: string) {
    const colors: Record<string, string> = {
      critical: "bg-red-50 text-red-700 border-red-200",
      high: "bg-amber-50 text-amber-700 border-amber-200",
      medium: "bg-blue-50 text-blue-700 border-blue-200",
    }
    return <Badge variant="outline" className={`text-xs ${colors[p]}`}>{p}</Badge>
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800">
          <Settings className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Security Checklist</h1>
          <p className="text-sm text-muted-foreground">Checklist keamanan sebelum deployment</p>
        </div>
      </div>

      {/* Progress */}
      <Card className="py-4">
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progres: {done}/{total} item selesai</span>
            <Badge variant={progress === 100 ? "default" : "outline"}>
              {progress === 100 ? "✅ Siap Deploy" : `${progress.toFixed(0)}%`}
            </Badge>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Checklist by Category */}
      {categories.map((cat) => {
        const Icon = categoryIcons[cat] || Shield
        const items = checklist.filter(c => c.category === cat)
        const catDone = items.filter(c => checked.has(c.id)).length
        return (
          <Card key={cat}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-emerald-700" />
                  <CardTitle className="text-base">{cat}</CardTitle>
                </div>
                <span className="text-xs text-muted-foreground">{catDone}/{items.length}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 rounded-lg border p-3 transition-colors cursor-pointer ${checked.has(item.id) ? "bg-emerald-50/50 border-emerald-200" : "hover:bg-muted/50"}`}
                  onClick={() => toggle(item.id)}
                >
                  <Checkbox checked={checked.has(item.id)} onCheckedChange={() => toggle(item.id)} className="mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${checked.has(item.id) ? "line-through text-muted-foreground" : ""}`}>{item.label}</span>
                      {getPriorityBadge(item.priority)}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}
    </main>
  )
}
