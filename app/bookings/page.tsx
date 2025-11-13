"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BookingsTable } from "@/components/bookings-table"

export default function BookingsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-primary">Bookings</h1>
        <BookingsTable />
      </div>
    </DashboardLayout>
  )
}
