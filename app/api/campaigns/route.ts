import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/campaigns — List all campaigns with template info
export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        template: { select: { nama: true, tipe: true } },
        materiEdukasi: { select: { judul: true } },
        _count: { select: { logs: true, susResponses: true } },
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

// POST /api/campaigns — Create a new campaign
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const campaign = await prisma.campaign.create({
      data: {
        name: body.name,
        templateId: body.templateId,
        materiEdukasiId: body.materiEdukasiId,
        status: body.status || "draft",
        targets: body.targets || 0,
        scheduledDate: body.scheduledDate ? new Date(body.scheduledDate) : null,
      },
    })
    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
