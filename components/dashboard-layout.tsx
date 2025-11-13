"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
