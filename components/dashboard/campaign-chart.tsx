"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartDataItem {
  name: string
  fullName: string
  open: number
  click: number
  submit: number
}

interface CampaignChartProps {
  data: ChartDataItem[]
}

const chartConfig = {
  open: {
    label: "Open Rate",
    color: "oklch(0.65 0.18 140)",
  },
  click: {
    label: "Click Rate",
    color: "oklch(0.70 0.16 110)",
  },
  submit: {
    label: "Submission Rate",
    color: "oklch(0.60 0.18 90)",
  },
} satisfies ChartConfig

export function CampaignChart({ data }: CampaignChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perbandingan Performa Kampanye</CardTitle>
        <CardDescription>
          Open, Click, dan Submission rate dari 5 kampanye terakhir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `${value}%`}
              fontSize={12}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <span className="flex items-center gap-2">
                      <span>{chartConfig[name as keyof typeof chartConfig]?.label || name}</span>
                      <span className="font-mono font-bold">{value}%</span>
                    </span>
                  )}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="open" fill="var(--color-open)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="click" fill="var(--color-click)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="submit" fill="var(--color-submit)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
