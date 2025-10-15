"use client"

import { useRouter } from "next/navigation"
import { Bell, LogOut, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "../mode-toggle"
import { supabase } from "@/lib/supabase-client"

export function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout failed:", error.message)
    } else {
      router.push("/login")
    }
  }

  return (
    <header className="sticky top-0 z-40 border-0 border-border bg-background/95 backdrop-blur-lg">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses, materials..."
              className="w-full pl-10 bg-accent/50 border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-secondary" />
          </Button>
          <ModeToggle />
        </div>

        {/* Logout Icon aligned right */}
        <div className="ml-auto">
          <button onClick={handleLogout}>
            <LogOut className="h-5 w-5 text-foreground hover:text-red-500 cursor-pointer" />
          </button>
        </div>
      </div>
    </header>
  )
}
