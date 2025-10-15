'use client'

import { useEffect, useState } from "react"

import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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

  // Fetch from Supabase
  const fetchCourses = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false })
    if (error) console.error('Fetch error:', error)
    else setCourses(data as Course[])
    setLoading(false)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('courses').delete().eq('id', id)
    if (error) return console.error('Delete error:', error)
    fetchCourses()
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Courses</h1>
            <p className="text-muted-foreground mt-1">Create, edit, and organize training courses</p>
          </div>
          <CreateCourseModal onCreated={fetchCourses} />
        </div>

        {/* Search (non-functional for now) */}
        <div className="relative animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>

        {/* Courses Table */}
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
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDelete(course.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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
      </div>
    </MainLayout>
  )
}
