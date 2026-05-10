"use client"

import { campaigns, getSummaryStats, simulationLogs, pegawaiList, departemenList, susResponses, getAvgSUSScore, getSUSGrade } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Users, BarChart3, MousePointerClick, FileCheck } from "lucide-react"
import { Progress } from "@/components/ui/progress"

function exportCSV() {
  const headers = ["Kampanye", "Tanggal", "Target", "Open Rate", "Click Rate", "Submit Rate", "Status"]
  const rows = campaigns.map((c) => [c.name, c.date, c.targets, `${c.openRate}%`, `${c.clickRate}%`, `${c.submissionRate}%`, c.status].join(","))
  const csv = [headers.join(","), ...rows].join("\n")
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `laporan-phishing-${new Date().toISOString().split("T")[0]}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function LaporanPage() {
  const stats = getSummaryStats(campaigns)
  const avgSUS = getAvgSUSScore()

  // Department breakdown
  const deptStats = departemenList.map((dept) => {
    const deptPegawai = pegawaiList.filter(p => p.departemen === dept)
    const deptLogs = simulationLogs.filter(l => deptPegawai.some(p => p.id === l.pegawaiId))
    const clicked = deptLogs.filter(l => l.status === "clicked" || l.status === "submitted").length
    const total = deptLogs.length || 1
    return { dept, total: deptPegawai.length, logs: deptLogs.length, clickRate: ((clicked / total) * 100).toFixed(1) }
  }).filter(d => d.logs > 0)

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Laporan</h1>
            <p className="text-sm text-muted-foreground">Ringkasan dan ekspor laporan kampanye</p>
          </div>
        </div>
        <Button onClick={exportCSV}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="py-4">
          <CardContent className="pt-0 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2"><Users className="h-4 w-4 text-emerald-700" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Total Target</p>
              <p className="text-xl font-bold">{stats.totalTargets}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="pt-0 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2"><BarChart3 className="h-4 w-4 text-emerald-700" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Kampanye</p>
              <p className="text-xl font-bold">{campaigns.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="pt-0 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2"><MousePointerClick className="h-4 w-4 text-emerald-700" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Click Rate</p>
              <p className="text-xl font-bold">{stats.avgClickRate}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="pt-0 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2"><FileCheck className="h-4 w-4 text-emerald-700" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Submit Rate</p>
              <p className="text-xl font-bold">{stats.avgSubmissionRate}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="pt-0 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2"><FileText className="h-4 w-4 text-emerald-700" /></div>
            <div>
              <p className="text-xs text-muted-foreground">SUS Score</p>
              <p className="text-xl font-bold">{avgSUS.toFixed(1)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan per Kampanye</CardTitle>
          <CardDescription>Performa setiap kampanye phishing yang telah dijalankan</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kampanye</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Submit Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs capitalize">{c.status}</Badge></TableCell>
                  <TableCell className="text-right tabular-nums">{c.targets}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={c.openRate} className="h-2 w-20" />
                      <span className="text-xs tabular-nums">{c.openRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={c.clickRate} className="h-2 w-20" />
                      <span className="text-xs tabular-nums">{c.clickRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={c.submissionRate} className="h-2 w-20" />
                      <span className="text-xs tabular-nums">{c.submissionRate}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Breakdown per Departemen</CardTitle>
          <CardDescription>Tingkat kerentanan phishing berdasarkan departemen</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Departemen</TableHead>
                <TableHead className="text-right">Pegawai</TableHead>
                <TableHead className="text-right">Log Interaksi</TableHead>
                <TableHead>Click/Submit Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deptStats.map((d) => (
                <TableRow key={d.dept}>
                  <TableCell className="font-medium">{d.dept}</TableCell>
                  <TableCell className="text-right tabular-nums">{d.total}</TableCell>
                  <TableCell className="text-right tabular-nums">{d.logs}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={Number(d.clickRate)} className="h-2 w-24" />
                      <span className="text-xs tabular-nums">{d.clickRate}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* SUS Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan SUS</CardTitle>
          <CardDescription>Skor System Usability Scale dari {susResponses.length} responden</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-5xl font-bold text-emerald-700">{avgSUS.toFixed(1)}</p>
            <Badge variant="outline" className="mt-2 bg-emerald-50 text-emerald-700 border-emerald-200">{getSUSGrade(avgSUS)}</Badge>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm text-muted-foreground">Distribusi skor:</p>
            <Progress value={avgSUS} className="h-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 (Poor)</span><span>50 (OK)</span><span>68 (Good)</span><span>100 (Excellent)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
