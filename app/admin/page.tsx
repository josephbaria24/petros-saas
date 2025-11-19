
//app\admin\page.tsx
import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { Users, BookOpen, FileText, TrendingUp, Activity, Clock } from "lucide-react"

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Users",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Courses",
      value: "48",
      change: "+3 new",
      trend: "up",
      icon: BookOpen,
      color: "text-yellow-500",
    },
    {
      title: "Materials",
      value: "156",
      change: "+8 this week",
      trend: "up",
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Completion Rate",
      value: "78%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ]

  const recentActivity = [
    {
      id: "1",
      user: "Sarah Johnson",
      action: "completed",
      target: "Advanced Safety Protocols",
      time: "2 hours ago",
    },
    {
      id: "2",
      user: "Michael Chen",
      action: "enrolled in",
      target: "Technical Writing Fundamentals",
      time: "4 hours ago",
    },
    {
      id: "3",
      user: "Emily Davis",
      action: "uploaded",
      target: "EILTS Practice Materials",
      time: "6 hours ago",
    },
    {
      id: "4",
      user: "James Wilson",
      action: "started",
      target: "Leadership Excellence",
      time: "8 hours ago",
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage your training platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.title}
                className="p-6 transition-smooth hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    <p className="text-xs text-green-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`rounded-full bg-accent p-3 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid gap-3">
              <button className="flex items-center gap-3 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Create New Course</p>
                  <p className="text-xs text-muted-foreground">Add a new training course</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Upload Material</p>
                  <p className="text-xs text-muted-foreground">Add e-learning resources</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Manage Users</p>
                  <p className="text-xs text-muted-foreground">View and edit user accounts</p>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
