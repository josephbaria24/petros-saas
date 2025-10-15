'use client'

import { useEffect, useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"
import { supabase } from "@/lib/supabase-client"
import type { Course } from "@/lib/types"
import { CourseDetailsModal } from "@/components/course-detail-modal"

type CourseRow = {
  id: string
  title: string
  description?: string
  category?: string
  level?: string
  enrolled_count?: number
  duration?: string
  created_at?: string
  updated_at?: string
}

type EnrollmentWithCourse = {
  course_id: string
  courses: CourseRow // nested table type, not an array
}

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
  const [completedCourses, setCompletedCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  
  const mapCourse = (c: CourseRow): Course => ({
    id: c.id,
    title: c.title ?? "Untitled",
    description: c.description ?? "",
    category: c.category ?? "Uncategorized",
    thumbnail: "", // or use a fallback image path if needed
    duration: c.duration ?? "Unknown",
    level: (c.level as Course["level"]) ?? "beginner",
    enrolledCount: c.enrolled_count ?? 0,
    progress: 0, // default if not tracked yet
    createdAt: new Date(c.created_at ?? new Date().toISOString()),
    updatedAt: new Date(c.updated_at ?? c.created_at ?? new Date().toISOString()),
  })
  


  const fetchCourses = async () => {
    setLoading(true)

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("User not found:", userError)
      setLoading(false)
      return
    }

    const userId = user.id

    // 1. All courses
    const { data: allData, error: allErr } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false })

    if (allData) {
      setAllCourses(allData.map(mapCourse))
    }


  
// Enrolled
const { data: enrolledData } = await supabase
  .from("enrollments")
  .select("course_id, courses(*)")
  .eq("user_id", userId)

if (enrolledData) {
  const enrolledCoursesList = enrolledData
    .map((e) => {
      // Handle both array and single object cases
      const course = Array.isArray(e.courses) ? e.courses[0] : e.courses
      return course ? mapCourse(course) : null
    })
    .filter((c): c is Course => c !== null)
  setEnrolledCourses(enrolledCoursesList)
}


// Completed
const { data: completedData } = await supabase
  .from("enrollments")
  .select("course_id, courses(*)")
  .eq("user_id", userId)
  .eq("completed", true)

if (completedData) {
  const completedCoursesList = completedData
    .map((e) => {
      // Handle both array and single object cases
      const course = Array.isArray(e.courses) ? e.courses[0] : e.courses
      return course ? mapCourse(course) : null
    })
    .filter((c): c is Course => c !== null)
  setCompletedCourses(completedCoursesList)
}

    setLoading(false)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
            <p className="text-muted-foreground mt-1">Track your learning progress and explore new courses</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Browse All Courses</Button>
        </div>

        <div className="flex flex-col gap-3 md:flex-row animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <Tabs defaultValue="enrolled" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <TabsList>
            <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Courses</TabsTrigger>
          </TabsList>

          {/* Enrolled */}
          <TabsContent value="enrolled" className="mt-6">
            {loading ? (
              <p>Loading...</p>
            ) : enrolledCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full py-12">
                <img src="/empty.svg" alt="No courses" className="w-64 h-64 mb-4" />
                <p className="text-muted-foreground text-center">You are not enrolled in any courses yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map((course, index) => (
                  <div key={course.id} className="animate-slide-up" style={{ animationDelay: `${0.1 * index}s` }}>
                    <CourseCard course={course} showProgress />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>


          <TabsContent value="completed" className="mt-6">
            {loading ? (
              <p>Loading...</p>
            ) : completedCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full py-12">
                <img src="/empty.svg" alt="No courses" className="w-64 h-64 mb-4" />
                <p className="text-muted-foreground text-center">No completed courses yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {completedCourses.map((course, index) => (
                  <div key={course.id} className="animate-slide-up" style={{ animationDelay: `${0.1 * index}s` }}>
                    <CourseCard course={course} showProgress />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>


          {/* All */}
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <p>Loading...</p>
              ) : allCourses.length === 0 ? (
                <p>No courses available.</p>
              ) : (
                allCourses.map((course, index) => (
                  <div key={course.id} className="animate-slide-up" style={{ animationDelay: `${0.1 * index}s` }}>
                    <div onClick={() => {
                      setSelectedCourse(course)
                      setModalOpen(true)
                    }} className="cursor-pointer">
                      <CourseCard course={course} linkToDetails={false} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
        <CourseDetailsModal
          course={selectedCourse}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onEnroll={fetchCourses} // refresh after enrolling
        />

      </div>
    </MainLayout>
  )
}
