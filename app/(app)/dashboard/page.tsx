"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { CampaignChart } from "@/components/dashboard/campaign-chart"
import { CampaignTable } from "@/components/dashboard/campaign-table"
import { campaigns, getSummaryStats, getChartData } from "@/lib/mock-data"

export default function DashboardPage() {
  const stats = getSummaryStats(campaigns)
  const chartData = getChartData(campaigns)

  function handleExportReport() {
    const headers = [
      "Campaign Name", "Date", "Targets", "Open Rate", "Click Rate", "Submission Rate",
    ]
    const rows = campaigns.map((c) =>
      [c.name, c.date, c.targets, `${c.openRate}%`, `${c.clickRate}%`, `${c.submissionRate}%`].join(",")
    )
    const csvContent = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `phishing-report-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="p-6 space-y-6">
      <DashboardHeader onExportReport={handleExportReport} />
      <SummaryCards
        totalTargets={stats.totalTargets}
        avgOpenRate={stats.avgOpenRate}
        avgClickRate={stats.avgClickRate}
        avgSubmissionRate={stats.avgSubmissionRate}
      />
      <CampaignChart data={chartData} />
      <CampaignTable campaigns={campaigns} />
    </main>
  )
}
