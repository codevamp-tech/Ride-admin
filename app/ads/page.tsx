"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AdsTable } from "@/components/ads-table"
import { useRouter } from "next/navigation"
import { useAuth } from "../providers"
import { useEffect } from "react"

export default function AdsPage() {
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
          <h1 className="text-3xl font-bold text-text">Advertisements</h1>
          <p className="text-text-light mt-2">Manage advertisements and promotional content</p>
        </div>
        <AdsTable />
      </div>
    </DashboardLayout>
  )
}
