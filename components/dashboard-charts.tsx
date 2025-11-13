"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const COLORS = ["#3b82f6", "#10b981"]

export function DashboardCharts({ bookings }) {
  // -----------------------------------------------------
  // 1️⃣ MONTHLY BOOKINGS (Private vs Shared)
  // -----------------------------------------------------
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const monthly = Array.from({ length: 12 }, (_, i) => ({
    month: months[i],
    private: 0,
    shared: 0,
  }))

  bookings.forEach((b) => {
    const monthIndex = new Date(b.bookingTime).getMonth()

    if (b.rideType === "private") monthly[monthIndex].private++
    if (b.rideType === "shared") monthly[monthIndex].shared++
  })

  const monthlyData = monthly.slice(0, 11) // Jan–Nov like your mock


  // -----------------------------------------------------
  // 2️⃣ RIDE TYPE DISTRIBUTION (Percentage)
  // -----------------------------------------------------
  let privateCount = 0
  let sharedCount = 0

  bookings.forEach((b) => {
    if (b.rideType === "private") privateCount++
    if (b.rideType === "shared") sharedCount++
  })

  const total = privateCount + sharedCount || 1

  const rideTypeData = [
    { name: "Private", value: Math.round((privateCount / total) * 100) },
    { name: "Shared", value: Math.round((sharedCount / total) * 100) },
  ]


  // -----------------------------------------------------
  // 3️⃣ MONTHLY REVENUE TREND (Sum of fares)
  // -----------------------------------------------------
  const revenue = Array.from({ length: 12 }, (_, i) => ({
    month: months[i],
    revenue: 0,
  }))

  bookings.forEach((b) => {
    const monthIndex = new Date(b.bookingTime).getMonth()
    revenue[monthIndex].revenue += b.fare || 0
  })

  const revenueData = revenue.slice(0, 11) // Jan–Nov like mock UI


  // -----------------------------------------------------
  // 4️⃣ UI Rendering
  // -----------------------------------------------------
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Monthly Bookings (Private vs Shared) */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Monthly Bookings (Private vs Shared)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="private" fill="#3b82f6" name="Private" />
            <Bar dataKey="shared" fill="#10b981" name="Shared" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Ride Type Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Ride Type Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={rideTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name} ${value}%`}
              outerRadius={80}
              dataKey="value"
            >
              {rideTypeData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Monthly Revenue Trend */}
      <Card className="p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Monthly Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              name="Revenue"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
