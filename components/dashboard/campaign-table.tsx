"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import type { Campaign } from "@/lib/mock-data"

interface CampaignTableProps {
  campaigns: Campaign[]
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric", month: "short", day: "numeric",
  })
}

function getRateColor(rate: number, type: "open" | "click" | "submit") {
  if (type === "open") {
    if (rate >= 80) return "text-emerald-600"
    if (rate >= 60) return "text-amber-600"
    return "text-red-600"
  }
  if (rate <= 10) return "text-emerald-600"
  if (rate <= 25) return "text-amber-600"
  return "text-red-600"
}

function getStatusBadge(status: Campaign["status"]) {
  const map = {
    draft: { label: "Draft", variant: "outline" as const },
    scheduled: { label: "Terjadwal", variant: "secondary" as const },
    running: { label: "Berjalan", variant: "default" as const },
    completed: { label: "Selesai", variant: "secondary" as const },
  }
  return map[status]
}

function handleExportCampaign(campaignId: string, campaignName: string) {
  const blob = new Blob(
    [`Laporan Kampanye: ${campaignName}\nID: ${campaignId}\nDiekspor: ${new Date().toISOString()}`],
    { type: "text/plain" }
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `kampanye-${campaignId}-laporan.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Kampanye</CardTitle>
        <CardDescription>
          Tampilan detail semua kampanye simulasi phishing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Kampanye</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Target</TableHead>
              <TableHead className="text-right">Open Rate</TableHead>
              <TableHead className="text-right">Click Rate</TableHead>
              <TableHead className="text-right">Submit Rate</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => {
              const badge = getStatusBadge(campaign.status)
              return (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {campaign.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(campaign.date)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {campaign.targets.toLocaleString()}
                  </TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${getRateColor(campaign.openRate, "open")}`}>
                    {campaign.openRate}%
                  </TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${getRateColor(campaign.clickRate, "click")}`}>
                    {campaign.clickRate}%
                  </TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${getRateColor(campaign.submissionRate, "submit")}`}>
                    {campaign.submissionRate}%
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleExportCampaign(campaign.id, campaign.name)}
                      className="h-8 px-2"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Export {campaign.name}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
