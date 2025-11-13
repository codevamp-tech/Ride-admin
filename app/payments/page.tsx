"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PaymentsTable } from "@/components/payments-table"

export default function PaymentsPage() {
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
        <h1 className="text-3xl font-bold text-primary">Payments</h1>
        <PaymentsTable />
      </div>
    </DashboardLayout>
  )
}
