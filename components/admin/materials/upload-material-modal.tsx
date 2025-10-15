'use client'

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase-client"
import { Textarea } from "@/components/ui/textarea"
import { MultiSelect } from "@/components/ui/multiselect" // You must create or install one
import { v4 as uuidv4 } from 'uuid'

interface Props {
  onUploaded: () => void
}

export function UploadMaterialModal({ onUploaded }: Props) {
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([])
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: '',
    category: '',
    tags: '',
    file: null as File | null,
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from('courses').select('id, title')
      if (data) setCourses(data)
    }
    fetchCourses()
  }, [])

  const handleUpload = async () => {
    setLoading(true)

    if (!form.title || !form.file || !form.type) {
      alert('Please fill in all required fields and select a file.')
      setLoading(false)
      return
    }

    const fileExt = form.file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('storage')
      .upload(fileName, form.file)

    if (uploadError) {
      console.error('Upload failed', uploadError)
      setLoading(false)
      return
    }

    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/storage/${fileName}`

    const { data: materialData, error: insertError } = await supabase
      .from('materials')
      .insert({
        title: form.title,
        description: form.description,
        type: form.type,
        category: form.category,
        tags: form.tags.split(',').map((t) => t.trim()),
        file_url: fileUrl,
      })
      .select()
      .single()

    if (insertError || !materialData) {
      console.error('Insert failed', insertError)
      setLoading(false)
      return
    }

    // Link to courses
    const links = selectedCourses.map((courseId) => ({
      course_id: courseId,
      material_id: materialData.id,
    }))

    if (links.length > 0) {
      const { error: linkError } = await supabase.from('course_materials').insert(links)
      if (linkError) console.error('Linking failed', linkError)
    }

    // ✅ Clear form and selections
    setForm({
      title: '',
      description: '',
      type: '',
      category: '',
      tags: '',
      file: null,
    })
    setSelectedCourses([])

    setOpen(false)
    onUploaded()
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          Upload Material
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload E-Learning Material</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Type</Label>
            <Input
              placeholder="EILTS, TOEFL..."
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Category</Label>
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Tags (comma separated)</Label>
            <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Choose File</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.ppt,.pptx,.docx"
              onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Assign to Courses</Label>
            <MultiSelect
              options={courses.map((c) => ({ label: c.title, value: c.id }))}
              selected={selectedCourses}
              onChange={setSelectedCourses}
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={loading || !form.title || !form.type || !form.file}
          >
            {loading ? 'Uploading...' : 'Upload Material'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
