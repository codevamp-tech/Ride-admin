"use client";

import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface Booking {
  _id: string;
  passengerName: string;
  taxiId: string;
  rideType: "Private" | "Shared";
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
}

export function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rideTypeFilter, setRideTypeFilter] = useState<
    "All" | "Private" | "Shared"
  >("All");
  const [dateRangeStart, setDateRangeStart] = useState("");
  const [dateRangeEnd, setDateRangeEnd] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ---------------------------------------------
  // 🔥 FETCH REAL DATA FROM BACKEND
  // ---------------------------------------------
  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        const mapped: Booking[] = data.bookings.map((b: any) => ({
          _id: b._id,
          passengerName: b.userId || "Unknown Passenger", // no populate
          taxiId: b.driverId || "N/A", // no driver assigned yet
          rideType: b.rideType === "private" ? "Private" : "Shared",
          date: b.bookingTime.split("T")[0], // YYYY-MM-DD
          amount: b.fare,
          status: b.status,
        }));

        setBookings(mapped);
      });
  }, []);

  // ---------------------------------------------
  // 🔥 FILTERS (same logic as before)
  // ---------------------------------------------
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.passengerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking._id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRideType =
        rideTypeFilter === "All" || booking.rideType === rideTypeFilter;

      const bookingDate = new Date(booking.date);
      const matchesDateRange =
        (!dateRangeStart || bookingDate >= new Date(dateRangeStart)) &&
        (!dateRangeEnd || bookingDate <= new Date(dateRangeEnd));

      return matchesSearch && matchesRideType && matchesDateRange;
    });
  }, [searchTerm, rideTypeFilter, dateRangeStart, dateRangeEnd, bookings]);

  // ---------------------------------------------
  // 🔥 PAGINATION (same as before)
  // ---------------------------------------------
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);


  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  // ---------------------------------------------
  // 🔥 TABLE UI (unchanged)
  // ---------------------------------------------
  return (
    <div className="space-y-6">
      <Card className="p-6">
        {/* Filters UI (unchanged) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Passenger name or booking ID"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ride Type</label>
            <select
              value={rideTypeFilter}
              onChange={(e) => {
                setRideTypeFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>All</option>
              <option>Private</option>
              <option>Shared</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">From Date</label>
            <input
              type="date"
              value={dateRangeStart}
              onChange={(e) => {
                setDateRangeStart(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">To Date</label>
            <input
              type="date"
              value={dateRangeEnd}
              onChange={(e) => {
                setDateRangeEnd(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b">
              <tr>
                <th className="px-4 py-3 text-left">Booking ID</th>
                <th className="px-4 py-3 text-left">Passenger Name</th>
                <th className="px-4 py-3 text-left">Taxi ID</th>
                <th className="px-4 py-3 text-left">Ride Type</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Amount (₹)</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-3">{booking._id}</td>
                  <td className="px-4 py-3">{booking.passengerName}</td>
                  <td className="px-4 py-3">{booking.taxiId}</td>
                  <td className="px-4 py-3">{booking.rideType}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3 font-medium">{booking.amount}</td>
                  <td className="px-4 py-3">{capitalize(booking.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm">
            Showing{" "}
            {paginatedBookings.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredBookings.length)}{" "}
            of {filteredBookings.length} bookings
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
