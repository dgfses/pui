"use client"

import { useState } from "react"
import { simulationLogs, campaigns, getPegawaiById, getCampaignById } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MousePointerClick, Search } from "lucide-react"

function getStatusColor(s: string) {
  const map: Record<string, string> = {
    sent: "bg-gray-100 text-gray-700 border-gray-300",
    opened: "bg-blue-50 text-blue-700 border-blue-200",
    clicked: "bg-amber-50 text-amber-700 border-amber-200",
    submitted: "bg-red-50 text-red-700 border-red-200",
  }
  return map[s] || ""
}

function formatDateTime(dt: string) {
  return new Date(dt).toLocaleString("id-ID", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

export default function TrackingPage() {
  const [filterCampaign, setFilterCampaign] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = simulationLogs.filter((log) => {
    const matchCampaign = filterCampaign === "all" || log.campaignId === filterCampaign
    const matchStatus = filterStatus === "all" || log.status === filterStatus
    const pegawai = getPegawaiById(log.pegawaiId)
    const matchSearch = search === "" || pegawai?.nama.toLowerCase().includes(search.toLowerCase()) || log.token.includes(search)
    return matchCampaign && matchStatus && matchSearch
  })

  const statusCounts = {
    sent: simulationLogs.filter(l => l.status === "sent").length,
    opened: simulationLogs.filter(l => l.status === "opened").length,
    clicked: simulationLogs.filter(l => l.status === "clicked").length,
    submitted: simulationLogs.filter(l => l.status === "submitted").length,
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800">
          <MousePointerClick className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tracking Log</h1>
          <p className="text-sm text-muted-foreground">Monitor interaksi target dengan email simulasi</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["sent", "opened", "clicked", "submitted"] as const).map((s) => (
          <Card key={s} className="py-3">
            <CardContent className="pt-0 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground capitalize">{s}</p>
                <p className="text-2xl font-bold">{statusCounts[s]}</p>
              </div>
              <Badge variant="outline" className={`${getStatusColor(s)} capitalize`}>{s}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Log Simulasi ({filtered.length})</CardTitle>
              <CardDescription>Detail setiap interaksi target dengan email phishing</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 w-[180px]" placeholder="Cari nama/token..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kampanye</SelectItem>
                  {campaigns.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="opened">Opened</SelectItem>
                  <SelectItem value="clicked">Clicked</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pegawai</TableHead>
                <TableHead>Kampanye</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dikirim</TableHead>
                <TableHead>Dibuka</TableHead>
                <TableHead>Diklik</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => {
                const pegawai = getPegawaiById(log.pegawaiId)
                const campaign = getCampaignById(log.campaignId)
                return (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{pegawai?.nama || log.pegawaiId}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{campaign?.name || log.campaignId}</TableCell>
                    <TableCell className="font-mono text-xs">{log.token}</TableCell>
                    <TableCell><Badge variant="outline" className={`${getStatusColor(log.status)} capitalize text-xs`}>{log.status}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{formatDateTime(log.sentAt)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{log.openedAt ? formatDateTime(log.openedAt) : "-"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{log.clickedAt ? formatDateTime(log.clickedAt) : "-"}</TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">{log.ipAddress || "-"}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
