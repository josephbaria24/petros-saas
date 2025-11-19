//app\admin\courses\page.tsx

"use client"
import { useEffect, useState } from "react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase-client"
import { CreateCourseModal } from '@/components/admin/courses/create-course-modal'

interface Course {
  id: string
  title: string
  description?: string
  category?: string
  level?: string
  enrolled_count?: number
  duration?: string
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [viewCourse, setViewCourse] = useState<Course | null>(null)
  const [editCourse, setEditCourse] = useState<Course | null>(null)
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
  })
  const [editLoading, setEditLoading] = useState(false)

  const fetchCourses = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('courses')
      .select(`
        id,
        title,
        description,
        category,
        level,
        duration,
        enrollments ( id )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch error:', error)
    } else {
      const coursesWithCount = data.map((course: any) => ({
        ...course,
        enrolled_count: course.enrollments?.length ?? 0,
      }))
      setCourses(coursesWithCount)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleDelete = async () => {
    if (!deleteCourseId) return
    const { error } = await supabase.from('courses').delete().eq('id', deleteCourseId)
    if (error) console.error('Delete error:', error)
    setDeleteCourseId(null)
    fetchCourses()
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async () => {
    if (!editCourse) return
    setEditLoading(true)

    const { error } = await supabase.from('courses').update({
      ...editForm
    }).eq('id', editCourse.id)

    if (error) console.error('Update failed:', error)
    else {
      setEditCourse(null)
      fetchCourses()
    }

    setEditLoading(false)
  }

  useEffect(() => {
    if (editCourse) {
      setEditForm({
        title: editCourse.title || '',
        description: editCourse.description || '',
        category: editCourse.category || '',
        level: editCourse.level || '',
        duration: editCourse.duration || '',
      })
    }
  }, [editCourse])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Courses</h1>
            <p className="text-muted-foreground mt-1">Create, edit, and organize training courses</p>
          </div>
          <CreateCourseModal onCreated={fetchCourses} />
        </div>

        <div className="relative animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>

        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Course</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Category</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Level</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Enrolled</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Duration</th>
                  <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="p-4 text-center">Loading...</td></tr>
                ) : courses.length === 0 ? (
                  <tr><td colSpan={6} className="p-4 text-center">No courses found.</td></tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{course.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">{course.category || "Uncategorized"}</Badge>
                      </td>
                      <td className="p-4 capitalize text-sm text-foreground">
                        {course.level || "N/A"}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {course.enrolled_count ?? 0}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {course.duration || "—"}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setViewCourse(course)}>
                                <Eye className="h-4 w-4 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setEditCourse(course)}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => setDeleteCourseId(course.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* View Dialog */}
        <Dialog open={!!viewCourse} onOpenChange={() => setViewCourse(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{viewCourse?.title}</DialogTitle>
              <DialogDescription>{viewCourse?.description}</DialogDescription>
            </DialogHeader>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Category:</strong> {viewCourse?.category || 'N/A'}</p>
              <p><strong>Level:</strong> {viewCourse?.level || 'N/A'}</p>
              <p><strong>Enrolled:</strong> {viewCourse?.enrolled_count}</p>
              <p><strong>Duration:</strong> {viewCourse?.duration || '—'}</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!editCourse} onOpenChange={() => setEditCourse(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
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
                    value={(editForm as any)[field]}
                    onChange={handleEditChange}
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}

              <Button disabled={editLoading} onClick={handleEditSubmit} className="w-full">
                {editLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteCourseId} onOpenChange={() => setDeleteCourseId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  )
}
