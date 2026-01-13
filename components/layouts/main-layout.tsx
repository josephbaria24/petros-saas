//components/layouts/main-layout.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { MobileNav } from "@/components/navigation/mobile-nav"

import { Header } from "@/components/navigation/header"
import { MobileSidebarDrawer } from "../navigation/mobile-sidebar-drawer"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      {/* Mobile Sidebar Drawer */}
      <MobileSidebarDrawer 
        open={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="container mx-auto p-4 md:p-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  )
}