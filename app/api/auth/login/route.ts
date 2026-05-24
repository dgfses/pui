import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// POST /api/auth/login — Simple login handler
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      )
    }

    // Return user info (no JWT for simplicity in demo)
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
