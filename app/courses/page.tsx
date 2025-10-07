import { MainLayout } from "@/components/layouts/main-layout"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"
import { mockCourses } from "@/lib/mock-data"

export default function CoursesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
            <p className="text-muted-foreground mt-1">Track your learning progress and explore new courses</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Browse All Courses</Button>
        </div>

        {/* Search and Filter */}
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

        {/* Tabs */}
        <Tabs defaultValue="enrolled" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <TabsList>
            <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockCourses.map((course, index) => (
                <div key={course.id} className="animate-slide-up" style={{ animationDelay: `${0.1 * index}s` }}>
                  <CourseCard course={course} showProgress />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No completed courses yet. Keep learning!</p>
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockCourses.map((course, index) => (
                <div key={course.id} className="animate-slide-up" style={{ animationDelay: `${0.1 * index}s` }}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
