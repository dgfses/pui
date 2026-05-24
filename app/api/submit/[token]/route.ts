import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// POST /api/submit/[token] — Record credential submission on phishing page
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

    // Update status to "submitted"
    await prisma.simulationLog.update({
      where: { token },
      data: {
        status: "submitted",
        submittedAt: new Date(),
        openedAt: log.openedAt || new Date(),
        clickedAt: log.clickedAt || new Date(),
      },
    })

    return NextResponse.json({ success: true, redirectTo: `/edu/${token}` })
  } catch (error) {
    console.error("Error recording submission:", error)
    return NextResponse.json({ error: "Failed to record" }, { status: 500 })
  }
}
