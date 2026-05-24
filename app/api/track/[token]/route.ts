import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// POST /api/track/[token] — Record a tracking link click
export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const log = await prisma.simulationLog.findUnique({ where: { token } })
    
    if (!log) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 })
    }

    // Update status to "clicked" if not already further along
    if (log.status === "sent" || log.status === "opened") {
      await prisma.simulationLog.update({
        where: { token },
        data: {
          status: "clicked",
          openedAt: log.openedAt || new Date(),
          clickedAt: new Date(),
          ipAddress: request.headers.get("x-forwarded-for") || undefined,
          userAgent: request.headers.get("user-agent") || undefined,
        },
      })
    }

    return NextResponse.json({ success: true, redirectTo: `/phish/${token}` })
  } catch (error) {
    console.error("Error tracking click:", error)
    return NextResponse.json({ error: "Failed to track" }, { status: 500 })
  }
}
