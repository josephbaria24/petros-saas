// app/dashboard/page.tsx
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { BookOpen, Clock, TrendingUp, Award } from "lucide-react"

// ✅ Cache page for 60 seconds
export const revalidate = 60

export default async function DashboardPage() {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component - middleware handles this
          }
        },
      },
    }
  )

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  const userId = user.id

  // ✅ Combine queries with Promise.all for better performance
  const [enrollmentsData, certificatesData] = await Promise.all([
    supabase
      .from("enrollments")
      .select("progress_percent, course_id, courses(duration)")
      .eq("user_id", userId),
    supabase
      .from("certificates")
      .select("id")
      .eq("user_id", userId)
  ])

  const enrollments = enrollmentsData.data || []
  const certificates = certificatesData.data || []

  const enrolledCoursesCount = enrollments.length
  const avgProgress =
    enrolledCoursesCount > 0
      ? Math.round(
          enrollments.reduce((sum, e) => sum + (e.progress_percent || 0), 0) /
            enrolledCoursesCount
        )
      : 0

  // ✅ Get durations directly from the joined query
  const totalHours = enrollments
    .map((e: any) => {
      const duration = e.courses?.duration || "0"
      return parseInt(duration.replace(/\D/g, "") || "0")
    })
    .reduce((a, b) => a + b, 0)

  const stats = [
    {
      title: "Active Courses",
      value: `${enrolledCoursesCount}`,
      icon: BookOpen,
      trend: "+1 this month",
      color: "text-blue-500"
    },
    {
      title: "Hours Learned",
      value: `${totalHours}`,
      icon: Clock,
      trend: "+8 this week",
      color: "text-yellow-500"
    },
    {
      title: "Progress",
      value: `${avgProgress}%`,
      icon: TrendingUp,
      trend: "+4% this week",
      color: "text-green-500"
    },
    {
      title: "Certificates",
      value: `${certificates.length}`,
      icon: Award,
      trend: "+1 this month",
      color: "text-purple-500"
    }
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.email?.split('@')[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey with Petrosphere Training
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.title}
                className="p-6 transition-smooth hover:shadow-lg hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                  </div>
                  <div className={`rounded-full bg-accent p-3 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 transition-smooth hover:shadow-lg cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground">Continue Learning</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Pick up where you left off in your courses
            </p>
          </Card>
          <Card className="p-6 transition-smooth hover:shadow-lg cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground">Browse Materials</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Explore IELTS, TOEFL, and other resources
            </p>
          </Card>
          <Card className="p-6 transition-smooth hover:shadow-lg cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground">Upcoming Sessions</h3>
            <p className="text-sm text-muted-foreground mt-2">
              View your scheduled training sessions
            </p>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}