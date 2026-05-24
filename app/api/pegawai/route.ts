import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/pegawai — List all employees
export async function GET() {
  try {
    const pegawai = await prisma.pegawai.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { logs: true } },
      },
    })
    return NextResponse.json(pegawai)
  } catch (error) {
    console.error("Error fetching pegawai:", error)
    return NextResponse.json({ error: "Failed to fetch pegawai" }, { status: 500 })
  }
}
