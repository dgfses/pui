"use client"

import { useState } from "react"
import { materiEdukasiList as initialData } from "@/lib/mock-data"
import type { MateriEdukasi } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Edit, BookOpen, FileText, Video, Image } from "lucide-react"

const tipeIcons: Record<string, React.ElementType> = {
  artikel: FileText,
  video: Video,
  infografis: Image,
}

export default function EdukasiPage() {
  const [data, setData] = useState<MateriEdukasi[]>([...initialData])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ judul: "", konten: "", tipe: "artikel" as MateriEdukasi["tipe"] })

  function openAdd() {
    setEditId(null)
    setForm({ judul: "", konten: "", tipe: "artikel" })
    setDialogOpen(true)
  }

  function openEdit(m: MateriEdukasi) {
    setEditId(m.id)
    setForm({ judul: m.judul, konten: m.konten, tipe: m.tipe })
    setDialogOpen(true)
  }

  function handleSave() {
    if (!form.judul || !form.konten) return
    if (editId) {
      setData((prev) => prev.map((m) => (m.id === editId ? { ...m, ...form } : m)))
    } else {
      const newMateri: MateriEdukasi = {
        id: `edu-${String(data.length + 1).padStart(3, "0")}`,
        ...form,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setData((prev) => [...prev, newMateri])
    }
    setDialogOpen(false)
  }

  function handleDelete(id: string) {
    setData((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Materi Edukasi</h1>
            <p className="text-sm text-muted-foreground">Kelola materi edukasi keamanan siber</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}><Plus className="h-4 w-4" /> Tambah Materi</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Materi" : "Tambah Materi Baru"}</DialogTitle>
              <DialogDescription>Materi yang ditampilkan setelah target mengklik link phishing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Judul</Label>
                  <Input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} placeholder="Judul materi" />
                </div>
                <div className="space-y-2">
                  <Label>Tipe Materi</Label>
                  <Select value={form.tipe} onValueChange={(v) => setForm({ ...form, tipe: v as MateriEdukasi["tipe"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="artikel">Artikel</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="infografis">Infografis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Konten</Label>
                <Textarea rows={6} value={form.konten} onChange={(e) => setForm({ ...form, konten: e.target.value })} placeholder="Isi materi edukasi..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button onClick={handleSave}>{editId ? "Simpan" : "Tambah"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((m) => {
          const Icon = tipeIcons[m.tipe] || FileText
          return (
            <Card key={m.id} className="flex flex-col transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-emerald-50 p-2">
                      <Icon className="h-4 w-4 text-emerald-700" />
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">{m.tipe}</Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(m)}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(m.id)} className="text-red-600"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <CardTitle className="text-base mt-2">{m.judul}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-4">{m.konten}</p>
              </CardContent>
              <div className="px-6 pb-4">
                <p className="text-xs text-muted-foreground">Dibuat: {m.createdAt}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
