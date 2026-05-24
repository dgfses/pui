"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      // Admin accounts
      if (
        (email === "admin@uty.ac.id" && password === "admin123") ||
        (email === "tik@uty.ac.id" && password === "admin123")
      ) {
        router.push("/dashboard")
      // User/victim account — goes to inbox simulation
      } else if (email === "budi@uty.ac.id" && password === "user123") {
        router.push("/user")
      } else {
        setError("Email atau password salah.")
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <Card className="w-full max-w-md relative shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-emerald-900">PhishGuard</CardTitle>
            <CardDescription className="text-emerald-700/70">
              Platform Simulasi Phishing — Universitas Teknologi Yogyakarta
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-emerald-800">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@uty.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-emerald-800">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-medium shadow-md"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Masuk...
                </span>
              ) : (
                "Masuk"
              )}
            </Button>

            <div className="text-center space-y-2 mt-4">
              <p className="text-xs text-muted-foreground bg-emerald-50 rounded-lg p-3 space-y-1">
                <span className="block"><strong>🔑 Admin:</strong> admin@uty.ac.id / admin123</span>
                <span className="block"><strong>👤 User:</strong> budi@uty.ac.id / user123</span>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
