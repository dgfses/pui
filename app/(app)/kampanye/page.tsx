"use client"

import { useState, useEffect, useCallback } from "react"
import { campaigns as initialCampaigns, emailTemplates, materiEdukasiList, pegawaiList, getLogsByCampaign, getTemplateById, getMateriById, getPegawaiById } from "@/lib/mock-data"
import type { Campaign } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, BarChart3, Play, Eye, Trash2, Calendar, Send, CheckCircle2, Loader2, Mail, Server } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })
}

function getStatusStyle(s: Campaign["status"]) {
  const map = {
    draft: "bg-gray-100 text-gray-700 border-gray-300",
    scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    running: "bg-emerald-50 text-emerald-700 border-emerald-200",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-300",
  }
  return map[s]
}

function getStatusLabel(s: Campaign["status"]) {
  const map = { draft: "Draft", scheduled: "Terjadwal", running: "Berjalan", completed: "Selesai" }
  return map[s]
}

// --- SMTP Queue Types ---
interface QueueItem {
  id: string
  pegawaiId: string
  nama: string
  email: string
  status: "pending" | "sending" | "sent" | "failed"
}

export default function KampanyePage() {
  const [data, setData] = useState<Campaign[]>([...initialCampaigns])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [smtpOpen, setSmtpOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [form, setForm] = useState({
    name: "", templateId: "", materiEdukasiId: "", scheduledDate: "", status: "draft" as Campaign["status"],
  })

  // SMTP Queue state
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [smtpRunning, setSmtpRunning] = useState(false)
  const [smtpProgress, setSmtpProgress] = useState(0)
  const [smtpDone, setSmtpDone] = useState(false)
  const [smtpCampaign, setSmtpCampaign] = useState<Campaign | null>(null)

  function openAdd() {
    setForm({ name: "", templateId: "", materiEdukasiId: "", scheduledDate: "", status: "draft" })
    setDialogOpen(true)
  }

  function handleSave() {
    if (!form.name || !form.templateId || !form.materiEdukasiId) return
    const newCampaign: Campaign = {
      id: `camp-${String(data.length + 1).padStart(3, "0")}`,
      name: form.name,
      templateId: form.templateId,
      materiEdukasiId: form.materiEdukasiId,
      date: new Date().toISOString().split("T")[0],
      scheduledDate: form.scheduledDate || new Date().toISOString().split("T")[0],
      status: form.status,
      targets: pegawaiList.length,
      targetIds: pegawaiList.map(p => p.id),
      openRate: 0, clickRate: 0, submissionRate: 0,
    }
    setData((prev) => [...prev, newCampaign])
    setDialogOpen(false)
    toast.success("Kampanye berhasil dibuat!", { description: form.name })
  }

  function handleRun(id: string) {
    const campaign = data.find(c => c.id === id)
    if (!campaign) return
    openSmtpDialog(campaign)
  }

  function handleDelete(id: string) {
    setData((prev) => prev.filter((c) => c.id !== id))
    toast.success("Kampanye berhasil dihapus")
  }

  function showDetail(c: Campaign) {
    setSelectedCampaign(c)
    setDetailOpen(true)
  }

  // --- SMTP Simulation ---
  function openSmtpDialog(campaign: Campaign) {
    const targetIds = campaign.targetIds.length > 0 ? campaign.targetIds : pegawaiList.slice(0, campaign.targets).map(p => p.id)
    const queueItems: QueueItem[] = targetIds.map((pid, i) => {
      const peg = getPegawaiById(pid)
      return {
        id: `q-${i}`,
        pegawaiId: pid,
        nama: peg?.nama || "Unknown",
        email: peg?.email || "unknown@uty.ac.id",
        status: "pending" as const,
      }
    })
    setQueue(queueItems)
    setSmtpCampaign(campaign)
    setSmtpRunning(false)
    setSmtpProgress(0)
    setSmtpDone(false)
    setSmtpOpen(true)
  }

  const processQueue = useCallback(() => {
    if (!smtpCampaign) return
    setSmtpRunning(true)
    setSmtpDone(false)

    let currentIndex = 0
    const total = queue.length

    const interval = setInterval(() => {
      if (currentIndex >= total) {
        clearInterval(interval)
        setSmtpRunning(false)
        setSmtpDone(true)
        setSmtpProgress(100)

        // Update campaign status
        setData((prev) =>
          prev.map((c) =>
            c.id === smtpCampaign.id ? { ...c, status: "running" as const } : c
          )
        )

        toast.success("Semua email berhasil dikirim!", {
          description: `${total} email untuk kampanye "${smtpCampaign.name}"`,
        })
        return
      }

      setQueue((prev) =>
        prev.map((item, i) => {
          if (i === currentIndex) return { ...item, status: "sending" }
          if (i === currentIndex - 1) {
            // 10% chance of failure for realism
            const failed = Math.random() < 0.1
            return { ...item, status: failed ? "failed" : "sent" }
          }
          return item
        })
      )

      setSmtpProgress(Math.round(((currentIndex + 1) / total) * 100))
      currentIndex++
    }, 400)

    return () => clearInterval(interval)
  }, [queue.length, smtpCampaign])

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manajemen Kampanye</h1>
            <p className="text-sm text-muted-foreground">Buat, jadwalkan, dan kelola kampanye simulasi</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}><Plus className="h-4 w-4" /> Buat Kampanye</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Kampanye Baru</DialogTitle>
              <DialogDescription>Konfigurasi kampanye simulasi phishing baru</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Nama Kampanye</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama kampanye" />
              </div>
              <div className="space-y-2">
                <Label>Template Email</Label>
                <Select value={form.templateId} onValueChange={(v) => setForm({ ...form, templateId: v })}>
                  <SelectTrigger><SelectValue placeholder="Pilih template" /></SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((t) => (<SelectItem key={t.id} value={t.id}>{t.nama}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Materi Edukasi</Label>
                <Select value={form.materiEdukasiId} onValueChange={(v) => setForm({ ...form, materiEdukasiId: v })}>
                  <SelectTrigger><SelectValue placeholder="Pilih materi" /></SelectTrigger>
                  <SelectContent>
                    {materiEdukasiList.map((m) => (<SelectItem key={m.id} value={m.id}>{m.judul}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tanggal Jadwal</Label>
                <Input type="date" value={form.scheduledDate} onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button onClick={handleSave}>Buat Kampanye</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCampaign.name}</DialogTitle>
                <DialogDescription>Detail kampanye dan statistik interaksi</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Template</p>
                    <p className="text-sm font-medium">{getTemplateById(selectedCampaign.templateId)?.nama || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Materi Edukasi</p>
                    <p className="text-sm font-medium">{getMateriById(selectedCampaign.materiEdukasiId)?.judul || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Jadwal</p>
                    <p className="text-sm font-medium">{formatDate(selectedCampaign.scheduledDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Jumlah Target</p>
                    <p className="text-sm font-medium">{selectedCampaign.targets} pegawai</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm"><span>Open Rate</span><span className="font-medium">{selectedCampaign.openRate}%</span></div>
                    <Progress value={selectedCampaign.openRate} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm"><span>Click Rate</span><span className="font-medium">{selectedCampaign.clickRate}%</span></div>
                    <Progress value={selectedCampaign.clickRate} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm"><span>Submit Rate</span><span className="font-medium">{selectedCampaign.submissionRate}%</span></div>
                    <Progress value={selectedCampaign.submissionRate} className="h-2" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Log Simulasi ({getLogsByCampaign(selectedCampaign.id).length} record)</p>
                  <div className="max-h-[200px] overflow-auto border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Token</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Waktu</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getLogsByCampaign(selectedCampaign.id).map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-mono text-xs">{log.token}</TableCell>
                            <TableCell><Badge variant="outline" className="text-xs capitalize">{log.status}</Badge></TableCell>
                            <TableCell className="text-xs text-muted-foreground">{log.sentAt}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* SMTP Queue Simulation Dialog */}
      <Dialog open={smtpOpen} onOpenChange={(open) => { if (!smtpRunning) setSmtpOpen(open) }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Server className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <DialogTitle>Simulasi Pengiriman SMTP</DialogTitle>
                <DialogDescription>
                  {smtpCampaign?.name} — {queue.length} target
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {/* SMTP Config Info */}
            <div className="bg-muted/50 rounded-lg p-4 text-xs space-y-1 font-mono">
              <p><span className="text-muted-foreground">SMTP Host:</span> sandbox.smtp.mailtrap.io</p>
              <p><span className="text-muted-foreground">Port:</span> 2525</p>
              <p><span className="text-muted-foreground">Encryption:</span> TLS</p>
              <p><span className="text-muted-foreground">From:</span> noreply@uty.ac.id</p>
              <p><span className="text-muted-foreground">Template:</span> {smtpCampaign ? getTemplateById(smtpCampaign.templateId)?.nama : "-"}</p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  {smtpDone ? "Pengiriman selesai!" : smtpRunning ? "Mengirim email..." : "Siap mengirim"}
                </span>
                <span className="tabular-nums text-muted-foreground">
                  {queue.filter(q => q.status === "sent").length}/{queue.length} terkirim
                </span>
              </div>
              <Progress value={smtpProgress} className="h-3" />
              {queue.some(q => q.status === "failed") && (
                <p className="text-xs text-red-600">
                  {queue.filter(q => q.status === "failed").length} email gagal (akan di-retry otomatis)
                </p>
              )}
            </div>

            {/* Queue Table */}
            <div className="max-h-[280px] overflow-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8">#</TableHead>
                    <TableHead>Penerima</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queue.map((item, i) => (
                    <TableRow key={item.id} className={item.status === "sending" ? "bg-emerald-50/50" : ""}>
                      <TableCell className="text-xs text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="text-sm font-medium">{item.nama}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.email}</TableCell>
                      <TableCell className="text-right">
                        {item.status === "pending" && (
                          <Badge variant="outline" className="text-xs text-gray-500">Antrian</Badge>
                        )}
                        {item.status === "sending" && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            <Loader2 className="h-3 w-3 animate-spin mr-1" /> Mengirim
                          </Badge>
                        )}
                        {item.status === "sent" && (
                          <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Terkirim
                          </Badge>
                        )}
                        {item.status === "failed" && (
                          <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                            ✕ Gagal
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <DialogFooter>
            {!smtpRunning && !smtpDone && (
              <>
                <Button variant="outline" onClick={() => setSmtpOpen(false)}>Batal</Button>
                <Button onClick={processQueue} className="gap-2">
                  <Send className="h-4 w-4" /> Mulai Kirim Email
                </Button>
              </>
            )}
            {smtpRunning && (
              <Button disabled className="gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Sedang mengirim...
              </Button>
            )}
            {smtpDone && (
              <Button onClick={() => setSmtpOpen(false)}>Selesai</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kampanye ({data.length})</CardTitle>
          <CardDescription>Semua kampanye simulasi phishing</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead className="text-right">Open</TableHead>
                <TableHead className="text-right">Click</TableHead>
                <TableHead className="text-right">Submit</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusStyle(c.status)}>{getStatusLabel(c.status)}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />{formatDate(c.scheduledDate)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{c.targets}</TableCell>
                  <TableCell className="text-right tabular-nums">{c.openRate}%</TableCell>
                  <TableCell className="text-right tabular-nums">{c.clickRate}%</TableCell>
                  <TableCell className="text-right tabular-nums">{c.submissionRate}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => showDetail(c)} title="Detail">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {(c.status === "draft" || c.status === "scheduled") && (
                        <Button variant="ghost" size="sm" onClick={() => handleRun(c.id)} className="text-emerald-600" title="Kirim Email">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      {c.status === "draft" && (
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(c.id)} className="text-red-600" title="Hapus">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
