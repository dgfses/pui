"use client"

import { useState } from "react"
import { emailTemplates as initialTemplates } from "@/lib/mock-data"
import type { EmailTemplate } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Edit, Mail, Eye } from "lucide-react"
import { toast } from "sonner"

const tipeOptions = [
  { value: "phishing", label: "Phishing" },
  { value: "spear-phishing", label: "Spear Phishing" },
  { value: "social-engineering", label: "Social Engineering" },
]

export default function TemplatesPage() {
  const [data, setData] = useState<EmailTemplate[]>([...initialTemplates])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewHtml, setPreviewHtml] = useState("")
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ nama: "", subject: "", kontenHtml: "", tipe: "phishing" as EmailTemplate["tipe"] })

  function openAdd() {
    setEditId(null)
    setForm({ nama: "", subject: "", kontenHtml: "", tipe: "phishing" })
    setDialogOpen(true)
  }

  function openEdit(t: EmailTemplate) {
    setEditId(t.id)
    setForm({ nama: t.nama, subject: t.subject, kontenHtml: t.kontenHtml, tipe: t.tipe })
    setDialogOpen(true)
  }

  function handleSave() {
    if (!form.nama || !form.subject || !form.kontenHtml) return
    if (editId) {
      setData((prev) => prev.map((t) => (t.id === editId ? { ...t, ...form } : t)))
    } else {
      const newTpl: EmailTemplate = {
        id: `tpl-${String(data.length + 1).padStart(3, "0")}`,
        ...form,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setData((prev) => [...prev, newTpl])
    }
    setDialogOpen(false)
    toast.success(editId ? "Template diperbarui" : "Template berhasil ditambahkan", { description: form.nama })
  }

  function handleDelete(id: string) {
    const tpl = data.find(t => t.id === id)
    setData((prev) => prev.filter((t) => t.id !== id))
    toast.success("Template dihapus", { description: tpl?.nama })
  }

  function getTipeBadgeColor(tipe: string) {
    if (tipe === "phishing") return "bg-red-50 text-red-700 border-red-200"
    if (tipe === "spear-phishing") return "bg-amber-50 text-amber-700 border-amber-200"
    return "bg-blue-50 text-blue-700 border-blue-200"
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Template Email</h1>
            <p className="text-sm text-muted-foreground">Kelola template email simulasi phishing</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}><Plus className="h-4 w-4" /> Tambah Template</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Template" : "Tambah Template Baru"}</DialogTitle>
              <DialogDescription>Template email yang akan dikirim ke target kampanye</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Template</Label>
                  <Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama template" />
                </div>
                <div className="space-y-2">
                  <Label>Tipe</Label>
                  <Select value={form.tipe} onValueChange={(v) => setForm({ ...form, tipe: v as EmailTemplate["tipe"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {tipeOptions.map((o) => (<SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Subject Email</Label>
                <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject email" />
              </div>
              <div className="space-y-2">
                <Label>Konten HTML</Label>
                <Textarea rows={6} value={form.kontenHtml} onChange={(e) => setForm({ ...form, kontenHtml: e.target.value })} placeholder="Konten HTML email. Gunakan {{nama}} dan {{link}} sebagai placeholder." className="font-mono text-sm" />
              </div>
              <p className="text-xs text-muted-foreground">Placeholder: {"{{nama}}"} = nama target, {"{{link}}"} = link tracking</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button onClick={handleSave}>{editId ? "Simpan" : "Tambah"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Preview Email</DialogTitle>
            <DialogDescription>Tampilan email yang akan dikirim ke target</DialogDescription>
          </DialogHeader>
          <div className="border rounded-lg p-4 bg-white" dangerouslySetInnerHTML={{ __html: previewHtml.replace(/\{\{nama\}\}/g, "Budi Santoso").replace(/\{\{link\}\}/g, "#") }} />
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Template ({data.length})</CardTitle>
          <CardDescription>Template email phishing yang tersedia untuk kampanye</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Template</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.nama}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[250px] truncate">{t.subject}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTipeBadgeColor(t.tipe)}>
                      {t.tipe.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => { setPreviewHtml(t.kontenHtml); setPreviewOpen(true) }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEdit(t)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
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
