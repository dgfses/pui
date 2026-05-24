import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Campaign stats
    const campaigns = await prisma.campaign.findMany({
      include: {
        template: { select: { nama: true, tipe: true } },
        materiEdukasi: { select: { judul: true } },
        _count: { select: { logs: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    // Department stats from logs
    const logs = await prisma.simulationLog.findMany({
      include: {
        pegawai: { select: { departemen: true } },
      },
    })

    // Group by department
    const deptMap: Record<string, { sent: number; opened: number; clicked: number; submitted: number }> = {}
    for (const log of logs) {
      const dept = log.pegawai.departemen
      if (!deptMap[dept]) deptMap[dept] = { sent: 0, opened: 0, clicked: 0, submitted: 0 }
      deptMap[dept].sent++
      if (log.openedAt) deptMap[dept].opened++
      if (log.clickedAt) deptMap[dept].clicked++
      if (log.submittedAt) deptMap[dept].submitted++
    }

    const departmentStats = Object.entries(deptMap).map(([name, stats]) => ({
      departemen: name,
      ...stats,
      clickRate: stats.sent > 0 ? ((stats.clicked / stats.sent) * 100).toFixed(1) : "0",
    }))

    // Overall stats
    const totalSent = logs.length
    const totalOpened = logs.filter(l => l.openedAt).length
    const totalClicked = logs.filter(l => l.clickedAt).length
    const totalSubmitted = logs.filter(l => l.submittedAt).length

    return NextResponse.json({
      campaigns,
      departmentStats,
      overall: { totalSent, totalOpened, totalClicked, totalSubmitted },
    })
  } catch (error) {
    console.error("Error fetching laporan:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
