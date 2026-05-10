"use client"

import { useState } from "react"
import { susResponses, campaigns, getSUSGrade, getAvgSUSScore } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ClipboardList, Plus, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const SUS_QUESTIONS = [
  "Saya merasa sistem ini mudah digunakan.",
  "Saya merasa sistem ini terlalu kompleks.",
  "Saya merasa sistem ini mudah dipelajari.",
  "Saya memerlukan bantuan teknis untuk menggunakan sistem.",
  "Saya menemukan berbagai fungsi terintegrasi dengan baik.",
  "Saya merasa ada banyak inkonsistensi di sistem.",
  "Saya merasa kebanyakan orang akan cepat belajar menggunakan sistem.",
  "Saya merasa sistem ini sangat merepotkan.",
  "Saya merasa percaya diri menggunakan sistem ini.",
  "Saya perlu banyak belajar sebelum bisa menggunakan sistem.",
]

function getGradeBadge(score: number) {
  const grade = getSUSGrade(score)
  const colors: Record<string, string> = {
    Excellent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Good: "bg-blue-50 text-blue-700 border-blue-200",
    OK: "bg-amber-50 text-amber-700 border-amber-200",
    Poor: "bg-red-50 text-red-700 border-red-200",
  }
  return <Badge variant="outline" className={colors[grade]}>{grade} ({score.toFixed(1)})</Badge>
}

export default function SUSPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0))
  const [respondentName, setRespondentName] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submittedScore, setSubmittedScore] = useState(0)

  const avgScore = getAvgSUSScore()

  function handleAnswer(index: number, value: number) {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  function calculateScore() {
    let score = 0
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) score += answers[i] - 1
      else score += 5 - answers[i]
    }
    return score * 2.5
  }

  function handleSubmit() {
    if (!respondentName || answers.some(a => a === 0)) return
    const score = calculateScore()
    setSubmittedScore(score)
    setSubmitted(true)
  }

  function resetForm() {
    setAnswers(Array(10).fill(0))
    setRespondentName("")
    setSelectedCampaign("")
    setSubmitted(false)
    setSubmittedScore(0)
    setDialogOpen(false)
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Kuesioner SUS</h1>
            <p className="text-sm text-muted-foreground">System Usability Scale — evaluasi usability sistem</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setDialogOpen(open) }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4" /> Isi Kuesioner</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {!submitted ? (
              <>
                <DialogHeader>
                  <DialogTitle>Kuesioner System Usability Scale</DialogTitle>
                  <DialogDescription>Jawab 10 pertanyaan berikut (skala 1-5: Sangat Tidak Setuju — Sangat Setuju)</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama Responden</Label>
                      <Input value={respondentName} onChange={(e) => setRespondentName(e.target.value)} placeholder="Nama lengkap" />
                    </div>
                    <div className="space-y-2">
                      <Label>Kampanye (opsional)</Label>
                      <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                        <SelectTrigger><SelectValue placeholder="Pilih kampanye" /></SelectTrigger>
                        <SelectContent>
                          {campaigns.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {SUS_QUESTIONS.map((q, i) => (
                    <div key={i} className="space-y-2 border rounded-lg p-4">
                      <p className="text-sm font-medium">{i + 1}. {q}</p>
                      <RadioGroup value={String(answers[i] || "")} onValueChange={(v) => handleAnswer(i, Number(v))} className="flex gap-4 pt-1">
                        {[1, 2, 3, 4, 5].map((v) => (
                          <div key={v} className="flex flex-col items-center gap-1">
                            <RadioGroupItem value={String(v)} id={`q${i}-${v}`} />
                            <Label htmlFor={`q${i}-${v}`} className="text-xs text-muted-foreground">{v}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                        <span>Sangat Tidak Setuju</span><span>Sangat Setuju</span>
                      </div>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={resetForm}>Batal</Button>
                  <Button onClick={handleSubmit} disabled={!respondentName || answers.some(a => a === 0)}>Kirim</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-amber-500" /> Hasil SUS</DialogTitle>
                  <DialogDescription>Terima kasih, {respondentName}!</DialogDescription>
                </DialogHeader>
                <div className="text-center py-6 space-y-4">
                  <div className="text-6xl font-bold text-emerald-700">{submittedScore.toFixed(1)}</div>
                  <div>{getGradeBadge(submittedScore)}</div>
                  <Progress value={submittedScore} className="h-3 max-w-xs mx-auto" />
                  <p className="text-sm text-muted-foreground">Skor SUS berkisar antara 0-100. Skor di atas 68 dianggap &quot;above average&quot;.</p>
                </div>
                <DialogFooter>
                  <Button onClick={resetForm}>Tutup</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="py-4">
          <CardContent className="pt-0 text-center">
            <p className="text-xs text-muted-foreground mb-1">Rata-rata Skor SUS</p>
            <p className="text-3xl font-bold text-emerald-700">{avgScore.toFixed(1)}</p>
            <div className="mt-2">{getGradeBadge(avgScore)}</div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="pt-0 text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Responden</p>
            <p className="text-3xl font-bold">{susResponses.length}</p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="pt-0 text-center">
            <p className="text-xs text-muted-foreground mb-1">Skor Tertinggi</p>
            <p className="text-3xl font-bold text-emerald-700">
              {Math.max(...susResponses.map(r => r.score)).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Respons ({susResponses.length})</CardTitle>
          <CardDescription>Semua jawaban kuesioner SUS yang sudah masuk</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Responden</TableHead>
                <TableHead>Kampanye</TableHead>
                <TableHead>Jawaban</TableHead>
                <TableHead>Skor</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {susResponses.map((r) => {
                const campaign = campaigns.find(c => c.id === r.campaignId)
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.respondentName}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{campaign?.name || "-"}</TableCell>
                    <TableCell className="font-mono text-xs">{r.answers.join(", ")}</TableCell>
                    <TableCell className="font-bold">{r.score.toFixed(1)}</TableCell>
                    <TableCell>{getGradeBadge(r.score)}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{r.createdAt}</TableCell>
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
