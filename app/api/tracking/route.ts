import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const logs = await prisma.simulationLog.findMany({
      orderBy: { sentAt: "desc" },
      include: {
        pegawai: { select: { nama: true, email: true, departemen: true } },
        campaign: { select: { name: true, template: { select: { nama: true, tipe: true } } } },
      },
    })
    return NextResponse.json(logs)
  } catch (error) {
    console.error("Error fetching tracking:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
