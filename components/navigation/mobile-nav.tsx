"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// ✅ ICONS
import { HomeIcon } from "@/components/icons/home"
import { BookIcon } from "@/components/icons/book"
import { WidgetIcon } from "@/components/icons/widget"
import { SettingsIcon } from "@/components/icons/settings"

const navItems = [
  { title: "Home", href: "/", icon: HomeIcon },
  { title: "Courses", href: "/courses", icon: BookIcon },
  { title: "Admin", href: "/admin", icon: WidgetIcon },
  { title: "Settings", href: "/settings", icon: SettingsIcon },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
      <div className="flex justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex flex-col items-center gap-1 rounded-lg px-4 py-2 transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon
                className={cn(
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
