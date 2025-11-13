"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatisticsCards } from "@/components/statistics-cards"
import { DashboardCharts } from "@/components/dashboard-charts"

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || [])
      })
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        </div>
        <StatisticsCards bookings={bookings} />
        <DashboardCharts bookings={bookings} />
      </div>
    </DashboardLayout>
  )
}
