"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"

interface Payment {
  _id: string
  rideId: {
    _id: string
  }
  passengerId: {
    fullName: string
  }
  amount: number
  paymentId: string
  rideType: string
  status: string
  date: string
}

import { useEffect } from "react"

export function PaymentsTable() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [rideTypeFilter, setRideTypeFilter] = useState<"All" | "Private" | "Shared">("All")
  const [dateRangeStart, setDateRangeStart] = useState("")
  const [dateRangeEnd, setDateRangeEnd] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch("/api/payments")
        const data = await res.json()
        setPayments(data)
      } catch (err) {
        console.error("Failed to fetch payments:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPayments()
  }, [])

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const passengerName = payment.passengerId?.fullName || "N/A"
      const bookingId = payment.rideId?._id || "N/A"
      const rideType = payment.rideType ? payment.rideType.charAt(0).toUpperCase() + payment.rideType.slice(1) : "N/A" // Map lowercase to TitleCase

      const matchesSearch =
        passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookingId.toString().toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRideType = rideTypeFilter === "All" || rideType === rideTypeFilter

      const paymentDate = new Date(payment.date)
      const matchesDateRange =
        (!dateRangeStart || paymentDate >= new Date(dateRangeStart)) &&
        (!dateRangeEnd || paymentDate <= new Date(dateRangeEnd))

      return matchesSearch && matchesRideType && matchesDateRange
    })
  }, [payments, searchTerm, rideTypeFilter, dateRangeStart, dateRangeEnd])

  const paginatedPayments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Search</label>
            <input
              type="text"
              placeholder="Passenger name or booking ID"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Ride Type</label>
            <select
              value={rideTypeFilter}
              onChange={(e) => {
                setRideTypeFilter(e.target.value as "All" | "Private" | "Shared")
                setCurrentPage(1)
              }}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option>All</option>
              <option>Private</option>
              <option>Shared</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">From Date</label>
            <input
              type="date"
              value={dateRangeStart}
              onChange={(e) => {
                setDateRangeStart(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">To Date</label>
            <input
              type="date"
              value={dateRangeEnd}
              onChange={(e) => {
                setDateRangeEnd(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-text">Payment ID</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Booking ID</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Passenger Name</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Payment Mode</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Ride Type</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-text-light">
                    Loading payments...
                  </td>
                </tr>
              ) : paginatedPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-text-light">
                    No payments found.
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-surface">
                    <td className="px-4 py-3 text-text truncate max-w-[150px]" title={payment._id}>
                      {payment._id}
                    </td>
                    <td className="px-4 py-3 text-text truncate max-w-[150px]" title={payment.rideId?._id}>
                      {payment.rideId?._id || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-text">{payment.passengerId?.fullName || "Unknown"}</td>
                    <td className="px-4 py-3 text-text font-medium">₹{payment.amount}</td>
                    <td className="px-4 py-3 text-text">{payment.paymentId}</td>
                    <td className="px-4 py-3 text-text capitalize">{payment.rideType}</td>
                    <td className="px-4 py-3 text-text">{payment.date ? new Date(payment.date).toLocaleDateString() : "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-text-light text-sm">
            Showing {paginatedPayments.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-border rounded-lg text-text hover:bg-surface disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-text">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border rounded-lg text-text hover:bg-surface disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
