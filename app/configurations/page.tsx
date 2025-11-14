"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CarTypesTable } from "@/components/car-types-table"
import { useRouter } from "next/navigation"
import { useAuth } from "../providers"
import { useEffect } from "react"

export default function ConfigurationsPage() {
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
        <div>
          <h1 className="text-3xl font-bold text-text">Configurations</h1>
          <p className="text-text-light mt-2">Manage car types and pricing per kilometer</p>
        </div>
        <CarTypesTable />
      </div>
    </DashboardLayout>
  )
}
