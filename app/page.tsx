import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { BookOpen, Clock, TrendingUp, Award } from "lucide-react"

export default function HomePage() {
  const stats = [
    {
      title: "Active Courses",
      value: "12",
      icon: BookOpen,
      trend: "+2 this month",
      color: "text-blue-500",
    },
    {
      title: "Hours Learned",
      value: "48",
      icon: Clock,
      trend: "+12 this week",
      color: "text-yellow-500",
    },
    {
      title: "Progress",
      value: "67%",
      icon: TrendingUp,
      trend: "+5% this week",
      color: "text-green-500",
    },
    {
      title: "Certificates",
      value: "8",
      icon: Award,
      trend: "+1 this month",
      color: "text-purple-500",
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-1">Continue your learning journey with Petrosphere Training</p>
        </div>

        {/* Stats Grid */}
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

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 transition-smooth hover:shadow-lg cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground">Continue Learning</h3>
            <p className="text-sm text-muted-foreground mt-2">Pick up where you left off in your courses</p>
          </Card>
          <Card className="p-6 transition-smooth hover:shadow-lg cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground">Browse Materials</h3>
            <p className="text-sm text-muted-foreground mt-2">Explore EILTS, TOEFL, and other resources</p>
          </Card>
          <Card className="p-6 transition-smooth hover:shadow-lg cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground">Upcoming Sessions</h3>
            <p className="text-sm text-muted-foreground mt-2">View your scheduled training sessions</p>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
