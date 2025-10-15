// Component: components/course-details-modal.tsx
"use client"

import { Course } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { supabase } from "@/lib/supabase-client"
import { toast } from "sonner"

interface Props {
  course: Course | null
  open: boolean
  onClose: () => void
  onEnroll: () => void
}

export function CourseDetailsModal({ course, open, onClose, onEnroll }: Props) {
  const [enrolling, setEnrolling] = useState(false)

  const handleEnroll = async () => {
    if (!course) return
    setEnrolling(true)

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (!user || userError) {
      toast.error("User not authenticated")
      setEnrolling(false)
      return
    }

    const { error } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: course.id,
    })

    if (error) {
      toast.error("Failed to enroll")
    } else {
      toast.success("Enrolled successfully")
      onEnroll()
    }
    setEnrolling(false)
    onClose()
  }

  if (!course) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{course.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p><strong>Category:</strong> {course.category}</p>
          <p><strong>Level:</strong> {course.level}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{course.description}</p>
        </div>
        <DialogFooter>
          <Button onClick={handleEnroll} disabled={enrolling} className="w-full">
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
