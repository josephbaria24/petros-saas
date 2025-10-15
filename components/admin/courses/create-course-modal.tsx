'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase-client'

interface Props {
  onCreated: () => void
}

export function CreateCourseModal({ onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { error } = await supabase.from('courses').insert({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      level: formData.level,
      duration: formData.duration,
    })

    if (error) {
      console.error('Insert failed:', error)
    } else {
      setOpen(false)
      setFormData({ title: '', description: '', category: '', level: '', duration: '' })
      onCreated()
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {['title', 'description', 'category', 'level', 'duration'].map((field) => (
            <div key={field} className="space-y-1">
              <Label htmlFor={field} className="capitalize">
                {field}
              </Label>
              <Input
                id={field}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          <Button disabled={loading} onClick={handleSubmit} className="w-full">
            {loading ? 'Creating...' : 'Create Course'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
