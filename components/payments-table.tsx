"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"

interface Payment {
  _id: string
  bookingId: string
  passengerName: string
  amount: number
  paymentMode: string
  rideType: "Private" | "Shared"
  date: string
}

const mockPayments: Payment[] = [
  {
    _id: "P001",
    bookingId: "B001",
    passengerName: "John Doe",
    amount: 250,
    paymentMode: "UPI",
    rideType: "Private",
    date: "2025-11-12",
  },
  {
    _id: "P002",
    bookingId: "B002",
    passengerName: "Jane Smith",
    amount: 120,
    paymentMode: "Card",
    rideType: "Shared",
    date: "2025-11-12",
  },
  {
    _id: "P003",
    bookingId: "B003",
    passengerName: "Mike Johnson",
    amount: 180,
    paymentMode: "Wallet",
    rideType: "Private",
    date: "2025-11-11",
  },
  {
    _id: "P004",
    bookingId: "B004",
    passengerName: "Sarah Williams",
    amount: 90,
    paymentMode: "UPI",
    rideType: "Shared",
    date: "2025-11-11",
  },
  {
    _id: "P005",
    bookingId: "B005",
    passengerName: "David Brown",
    amount: 220,
    paymentMode: "Card",
    rideType: "Private",
    date: "2025-11-10",
  },
  {
    _id: "P006",
    bookingId: "B006",
    passengerName: "Emma Davis",
    amount: 110,
    paymentMode: "Wallet",
    rideType: "Shared",
    date: "2025-11-10",
  },
]

export function PaymentsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [rideTypeFilter, setRideTypeFilter] = useState<"All" | "Private" | "Shared">("All")
  const [dateRangeStart, setDateRangeStart] = useState("")
  const [dateRangeEnd, setDateRangeEnd] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredPayments = useMemo(() => {
    return mockPayments.filter((payment) => {
      const matchesSearch =
        payment.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRideType = rideTypeFilter === "All" || payment.rideType === rideTypeFilter

      const paymentDate = new Date(payment.date)
      const matchesDateRange =
        (!dateRangeStart || paymentDate >= new Date(dateRangeStart)) &&
        (!dateRangeEnd || paymentDate <= new Date(dateRangeEnd))

      return matchesSearch && matchesRideType && matchesDateRange
    })
  }, [searchTerm, rideTypeFilter, dateRangeStart, dateRangeEnd])

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
              {paginatedPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-surface">
                  <td className="px-4 py-3 text-text">{payment._id}</td>
                  <td className="px-4 py-3 text-text">{payment.bookingId}</td>
                  <td className="px-4 py-3 text-text">{payment.passengerName}</td>
                  <td className="px-4 py-3 text-text font-medium">${payment.amount}</td>
                  <td className="px-4 py-3 text-text">{payment.paymentMode}</td>
                  <td className="px-4 py-3 text-text">{payment.rideType}</td>
                  <td className="px-4 py-3 text-text">{payment.date}</td>
                </tr>
              ))}
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
