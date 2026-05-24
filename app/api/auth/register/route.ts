import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// POST /api/auth/register — Register a new user account
export async function POST(request: Request) {
  try {
    const { name, email, password, departemen, jabatan } = await request.json()

    // Validasi
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 }
      )
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan gunakan email lain." },
        { status: 409 }
      )
    }

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Untuk demo/tugas. Produksi harus di-hash!
        role: "user",
      },
    })

    // Juga buat data pegawai agar bisa ikut simulasi
    const existingPegawai = await prisma.pegawai.findUnique({ where: { email } })
    if (!existingPegawai) {
      await prisma.pegawai.create({
        data: {
          nama: name,
          email,
          departemen: departemen || "Umum",
          jabatan: jabatan || "Staff",
        },
      })
    }

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: "Registrasi berhasil! Silakan login.",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Registrasi gagal" }, { status: 500 })
  }
}
