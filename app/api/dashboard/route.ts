import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/dashboard — Summary statistics for admin dashboard
export async function GET() {
  try {
    const [
      totalPegawai,
      totalCampaigns,
      totalLogs,
      campaigns,
      recentLogs,
    ] = await Promise.all([
      prisma.pegawai.count(),
      prisma.campaign.count(),
      prisma.simulationLog.count(),
      prisma.campaign.findMany({
        where: { status: { in: ["completed", "running"] } },
        select: { openRate: true, clickRate: true, submissionRate: true, targets: true },
      }),
      prisma.simulationLog.findMany({
        take: 10,
        orderBy: { sentAt: "desc" },
        include: {
          pegawai: { select: { nama: true, departemen: true } },
          campaign: { select: { name: true } },
        },
      }),
    ])

    // Calculate averages
    const completedCampaigns = campaigns.length
    const totalTargets = campaigns.reduce((sum, c) => sum + c.targets, 0)
    const avgOpenRate = completedCampaigns > 0
      ? (campaigns.reduce((sum, c) => sum + c.openRate, 0) / completedCampaigns).toFixed(1)
      : "0"
    const avgClickRate = completedCampaigns > 0
      ? (campaigns.reduce((sum, c) => sum + c.clickRate, 0) / completedCampaigns).toFixed(1)
      : "0"
    const avgSubmissionRate = completedCampaigns > 0
      ? (campaigns.reduce((sum, c) => sum + c.submissionRate, 0) / completedCampaigns).toFixed(1)
      : "0"

    return NextResponse.json({
      totalPegawai,
      totalCampaigns,
      totalLogs,
      totalTargets,
      avgOpenRate,
      avgClickRate,
      avgSubmissionRate,
      recentLogs,
    })
  } catch (error) {
    console.error("Error fetching dashboard:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard" }, { status: 500 })
  }
}
