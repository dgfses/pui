"use client"

import { useState } from "react"
import { pegawaiList, departemenList } from "@/lib/mock-data"
import type { Pegawai } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Trash2, Edit, Users, Mail } from "lucide-react"
import { toast } from "sonner"

export default function PegawaiPage() {
  const [data, setData] = useState<Pegawai[]>([...pegawaiList])
  const [search, setSearch] = useState("")
  const [filterDept, setFilterDept] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ nama: "", email: "", departemen: "", jabatan: "" })

  const filtered = data.filter((p) => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase())
    const matchDept = filterDept === "all" || p.departemen === filterDept
    return matchSearch && matchDept
  })

  function openAdd() {
    setEditId(null)
    setForm({ nama: "", email: "", departemen: "", jabatan: "" })
    setDialogOpen(true)
  }

  function openEdit(p: Pegawai) {
    setEditId(p.id)
    setForm({ nama: p.nama, email: p.email, departemen: p.departemen, jabatan: p.jabatan })
    setDialogOpen(true)
  }

  function handleSave() {
    if (!form.nama || !form.email || !form.departemen || !form.jabatan) return
    if (editId) {
      setData((prev) => prev.map((p) => (p.id === editId ? { ...p, ...form } : p)))
    } else {
      const newPeg: Pegawai = {
        id: `peg-${String(data.length + 1).padStart(3, "0")}`,
        ...form,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setData((prev) => [...prev, newPeg])
    }
    setDialogOpen(false)
    toast.success(editId ? "Data pegawai diperbarui" : "Pegawai berhasil ditambahkan", { description: form.nama })
  }

  function handleDelete(id: string) {
    const peg = data.find(p => p.id === id)
    setData((prev) => prev.filter((p) => p.id !== id))
    toast.success("Pegawai dihapus", { description: peg?.nama })
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Data Pegawai</h1>
            <p className="text-sm text-muted-foreground">Kelola data target kampanye phishing</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}>
              <Plus className="h-4 w-4" /> Tambah Pegawai
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Pegawai" : "Tambah Pegawai Baru"}</DialogTitle>
              <DialogDescription>Isi data pegawai untuk target kampanye simulasi</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama lengkap" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@uty.ac.id" />
              </div>
              <div className="space-y-2">
                <Label>Departemen</Label>
                <Select value={form.departemen} onValueChange={(v) => setForm({ ...form, departemen: v })}>
                  <SelectTrigger><SelectValue placeholder="Pilih departemen" /></SelectTrigger>
                  <SelectContent>
                    {departemenList.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Jabatan</Label>
                <Input value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} placeholder="Jabatan" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button onClick={handleSave}>{editId ? "Simpan" : "Tambah"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Daftar Pegawai ({filtered.length})</CardTitle>
              <CardDescription>Pegawai kampus yang menjadi target simulasi phishing</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 w-[220px]" placeholder="Cari nama/email..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={filterDept} onValueChange={setFilterDept}>
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Departemen</SelectItem>
                  {departemenList.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nama}</TableCell>
                  <TableCell className="text-muted-foreground">{p.email}</TableCell>
                  <TableCell><Badge variant="outline">{p.departemen}</Badge></TableCell>
                  <TableCell>{p.jabatan}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <a href={`/inbox/${p.id}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="text-blue-600" title="Lihat Inbox Simulasi">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </a>
                      <Button variant="ghost" size="sm" onClick={() => openEdit(p)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
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
