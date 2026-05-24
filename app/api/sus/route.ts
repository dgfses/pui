import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// POST /api/sus — Submit SUS questionnaire
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Calculate SUS score
    let score = 0
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) score += body.answers[i] - 1
      else score += 5 - body.answers[i]
    }
    score *= 2.5

    const response = await prisma.sUSResponse.create({
      data: {
        campaignId: body.campaignId,
        respondentName: body.respondentName,
        answers: body.answers,
        score,
      },
    })

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error("Error submitting SUS:", error)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}

// GET /api/sus — Get all SUS responses
export async function GET() {
  try {
    const responses = await prisma.sUSResponse.findMany({
      include: {
        campaign: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(responses)
  } catch (error) {
    console.error("Error fetching SUS:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
