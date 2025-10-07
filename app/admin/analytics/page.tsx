import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, BookOpen, Clock } from "lucide-react"

export default function AdminAnalyticsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track platform performance and user engagement</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Enrollments", value: "3,284", icon: Users, color: "text-blue-500" },
            { title: "Course Completions", value: "1,847", icon: BookOpen, color: "text-yellow-500" },
            { title: "Avg. Completion Time", value: "4.2 weeks", icon: Clock, color: "text-green-500" },
            { title: "Engagement Rate", value: "82%", icon: TrendingUp, color: "text-purple-500" },
          ].map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card
                key={metric.title}
                className="p-6 transition-smooth hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
                  </div>
                  <div className={`rounded-full bg-accent p-3 ${metric.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Charts Placeholder */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-xl font-semibold text-foreground mb-4">Enrollment Trends</h2>
            <div className="h-64 flex items-center justify-center bg-accent/30 rounded-lg">
              <p className="text-muted-foreground">Chart visualization coming soon</p>
            </div>
          </Card>

          <Card className="p-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-xl font-semibold text-foreground mb-4">Popular Courses</h2>
            <div className="h-64 flex items-center justify-center bg-accent/30 rounded-lg">
              <p className="text-muted-foreground">Chart visualization coming soon</p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
