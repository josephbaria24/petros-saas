// components/navigation/sidebar.tsx
"use client"

import { useLayoutEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { useSupabase } from "@/app/provider" // ← Changed

// Icons
import { HomeIcon } from "@/components/icons/home"
import { BookIcon } from "@/components/icons/book"
import { HatIcon } from "@/components/icons/hat"
import { FileTextIcon } from "@/components/icons/file-text"
import { WidgetIcon } from "@/components/icons/widget"
import { UsersIcon } from "@/components/icons/users"
import { AnalyticsIcon } from "@/components/icons/analytics"
import { SettingsIcon } from "@/components/icons/settings"
import { useState } from "react"

const userNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { title: "My Courses", href: "/courses", icon: BookIcon },
  { title: "Training Sessions", href: "/training", icon: HatIcon },
  { title: "Materials", href: "/materials", icon: FileTextIcon },
]

const adminNavItems = [
  { title: "Admin Dashboard", href: "/admin", icon: WidgetIcon },
  { title: "Manage Courses", href: "/admin/courses", icon: BookIcon },
  { title: "E-Learning Materials", href: "/admin/materials", icon: FileTextIcon },
  { title: "Users", href: "/admin/users", icon: UsersIcon },
  { title: "Analytics", href: "/admin/analytics", icon: AnalyticsIcon },
]

const settingsNavItems = [
  { title: "Settings", href: "/settings", icon: SettingsIcon },
]

const ALL_NAV_ITEMS = [
  ...userNavItems,
  ...adminNavItems,
  ...settingsNavItems,
]

export function Sidebar() {
  const { user } = useSupabase() // ← Get user from context
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const activeHref = ALL_NAV_ITEMS
    .filter(item =>
      pathname === item.href ||
      pathname.startsWith(item.href + "/")
    )
    .sort((a, b) => b.href.length - a.href.length)[0]?.href

  const navRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  // ✅ User data comes from context - no fetching needed!
  const userName = user?.email?.split("@")[0] || "User"
  const userEmail = user?.email || ""

  useLayoutEffect(() => {
    if (!navRef.current || !indicatorRef.current) return

    const activeItem = navRef.current.querySelector(
      `[data-href="${activeHref}"]`
    ) as HTMLElement | null

    if (!activeItem) return

    const navTop = navRef.current.getBoundingClientRect().top
    const itemTop = activeItem.getBoundingClientRect().top

    indicatorRef.current.style.transform = `translateY(${itemTop - navTop}px)`
  }, [activeHref])

  const renderNav = (items: typeof userNavItems) =>
    items.map((item) => {
      const isActive = item.href === activeHref
      const Icon = item.icon

      return (
        <Link
          key={item.href}
          href={item.href}
          data-href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "group relative flex items-center gap-3 rounded-lg py-2 text-sm transition-all",
            isActive
              ? "text-foreground"
              : "text-foreground hover:bg-accent",
            isCollapsed ? "justify-center px-2" : "pl-5 pr-3"
          )}
        >
          {/* LEFT ACTIVE INDICATOR */}
          {!isCollapsed && (
            <span
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 h-9 w-1 rounded-full bg-black dark:bg-white transition-all duration-300",
                isActive ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          <Icon className="shrink-0" />

          {!isCollapsed && <span>{item.title}</span>}
        </Link>
      )
    })

  return (
    <aside
      className={cn(
        "hidden md:flex h-screen flex-col border-r border-0 shadow-lg bg-card transition-all",
        isCollapsed ? "w-20" : "w-63"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-0 border-border px-4">
        {!isCollapsed && <Logo />}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("rounded-lg p-2 hover:bg-accent", isCollapsed && "mx-auto")}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav ref={navRef} className="relative space-y-6 pl-5 pr-3">
          <div>
            {!isCollapsed && (
              <h2 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                Learning
              </h2>
            )}
            <div className="space-y-1">{renderNav(userNavItems)}</div>
          </div>

          <div>
            {!isCollapsed && (
              <h2 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                Administration
              </h2>
            )}
            <div className="space-y-1">{renderNav(adminNavItems)}</div>
          </div>

          <div className="space-y-1">{renderNav(settingsNavItems)}</div>
        </nav>
      </div>

      {/* User */}
      <div className="border-t border-border p-4">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg bg-accent/50 p-3",
            isCollapsed && "justify-center"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {userName?.[0]?.toUpperCase() ?? "U"}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium">{userName}</p>
              <p className="truncate text-xs text-muted-foreground">{userEmail}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}