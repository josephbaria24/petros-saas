"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Settings, LayoutDashboard, GraduationCap, FileText, Users, BarChart3, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { useState } from "react"

const userNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "My Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Training Sessions",
    href: "/training",
    icon: GraduationCap,
  },
  {
    title: "Materials",
    href: "/materials",
    icon: FileText,
  },
]

const adminNavItems = [
  {
    title: "Admin Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "E-Learning Materials",
    href: "/admin/materials",
    icon: FileText,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
]

const settingsNavItems = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      "hidden md:flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-16 items-center border-b border-border px-6 justify-between">
        {!isCollapsed && <Logo />}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "rounded-lg p-2 hover:bg-accent transition-colors",
            isCollapsed && "mx-auto"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {/* User Navigation */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Learning</h2>
              </div>
            )}
            {userNavItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              )
            })}
          </div>

          {/* Admin Navigation */}
          <div className="space-y-1 pt-4">
            {!isCollapsed && (
              <div className="px-3 py-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Administration</h2>
              </div>
            )}
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              )
            })}
          </div>

          {/* Settings */}
          <div className="space-y-1 pt-4">
            {settingsNavItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-border p-4">
        <div className={cn(
          "flex items-center gap-3 rounded-lg bg-accent/50 p-3",
          isCollapsed && "justify-center"
        )}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
            <span className="text-sm font-semibold">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="truncate text-xs text-muted-foreground">john.doe@petrosphere.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}