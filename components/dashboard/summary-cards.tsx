"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Mail, MousePointerClick, FileCheck } from "lucide-react"

interface SummaryCardsProps {
  totalTargets: number
  avgOpenRate: string
  avgClickRate: string
  avgSubmissionRate: string
}

const cardData = [
  {
    key: "totalTargets",
    title: "Total Target",
    icon: Users,
    format: (value: number | string) => value.toLocaleString(),
    description: "Semua kampanye",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
  },
  {
    key: "avgOpenRate",
    title: "Rata-rata Open Rate",
    icon: Mail,
    format: (value: number | string) => `${value}%`,
    description: "Email dibuka",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
  },
  {
    key: "avgClickRate",
    title: "Rata-rata Click Rate",
    icon: MousePointerClick,
    format: (value: number | string) => `${value}%`,
    description: "Link diklik",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
  },
  {
    key: "avgSubmissionRate",
    title: "Rata-rata Submit Rate",
    icon: FileCheck,
    format: (value: number | string) => `${value}%`,
    description: "Form disubmit",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
  },
]

export function SummaryCards({
  totalTargets,
  avgOpenRate,
  avgClickRate,
  avgSubmissionRate,
}: SummaryCardsProps) {
  const values: Record<string, number | string> = {
    totalTargets,
    avgOpenRate,
    avgClickRate,
    avgSubmissionRate,
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.key} className="py-4 transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">
                {card.format(values[card.key])}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
