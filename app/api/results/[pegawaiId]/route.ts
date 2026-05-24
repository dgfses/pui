import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pegawaiId: string }> }
) {
  try {
    const { pegawaiId } = await params
    const logs = await prisma.simulationLog.findMany({
      where: { pegawaiId },
      include: {
        campaign: {
          select: {
            name: true,
            template: { select: { nama: true, tipe: true, subject: true } },
          },
        },
      },
      orderBy: { sentAt: "desc" },
    })
    return NextResponse.json(logs)
  } catch (error) {
    console.error("Error fetching results:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
