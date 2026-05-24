"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, UserPlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

const departemenOptions = [
  "Fakultas Teknologi Informasi",
  "Fakultas Teknik",
  "Fakultas Ekonomi & Bisnis",
  "Bagian Administrasi Umum",
  "Bagian Keuangan",
  "Unit Perpustakaan",
  "Bagian TIK",
  "Bagian Kemahasiswaan",
]

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    departemen: "",
    jabatan: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!form.name || !form.email || !form.password) {
      setError("Nama, email, dan password wajib diisi")
      return
    }
    if (form.password.length < 6) {
      setError("Password minimal 6 karakter")
      return
    }
    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          departemen: form.departemen,
          jabatan: form.jabatan,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registrasi gagal")
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch {
      setError("Terjadi kesalahan jaringan")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 p-4">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Registrasi Berhasil! 🎉</h2>
          <p className="text-emerald-200/70">Akun Anda telah terdaftar. Mengalihkan ke halaman login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-emerald-500/30">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Buat Akun <span className="text-emerald-400">PhishGuard</span>
          </h1>
          <p className="text-emerald-200/60 text-sm mt-1">Daftar untuk ikut simulasi phishing awareness</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl space-y-5"
        >
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-300 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Nama */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-emerald-200/80" htmlFor="reg-name">
              Nama Lengkap *
            </label>
            <input
              id="reg-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-emerald-200/80" htmlFor="reg-email">
              Email *
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@uty.ac.id"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Departemen */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-emerald-200/80" htmlFor="reg-dept">
              Departemen
            </label>
            <select
              id="reg-dept"
              name="departemen"
              value={form.departemen}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all appearance-none"
            >
              <option value="" className="bg-gray-900">-- Pilih Departemen --</option>
              {departemenOptions.map((d) => (
                <option key={d} value={d} className="bg-gray-900">{d}</option>
              ))}
            </select>
          </div>

          {/* Jabatan */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-emerald-200/80" htmlFor="reg-jabatan">
              Jabatan
            </label>
            <input
              id="reg-jabatan"
              name="jabatan"
              type="text"
              value={form.jabatan}
              onChange={handleChange}
              placeholder="Dosen / Staff / Kaprodi"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-emerald-200/80" htmlFor="reg-password">
              Password *
            </label>
            <input
              id="reg-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-emerald-200/80" htmlFor="reg-confirm">
              Konfirmasi Password *
            </label>
            <input
              id="reg-confirm"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Mendaftar...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Daftar Akun
              </>
            )}
          </button>

          {/* Link to Login */}
          <p className="text-center text-sm text-emerald-200/50">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Login di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
