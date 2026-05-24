import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/logs/[campaignId] — Simulation logs for a campaign
export async function GET(
  request: Request,
  { params }: { params: Promise<{ campaignId: string }> }
) {
  try {
    const { campaignId } = await params
    const logs = await prisma.simulationLog.findMany({
      where: { campaignId },
      include: {
        pegawai: { select: { nama: true, email: true, departemen: true } },
      },
      orderBy: { sentAt: "desc" },
    })
    return NextResponse.json(logs)
  } catch (error) {
    console.error("Error fetching logs:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}
