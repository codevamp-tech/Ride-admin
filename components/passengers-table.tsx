"use client";

import { useEffect, useState, useMemo } from "react";

interface Passenger {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  status: "Active" | "Banned";
}

export function PassengersTable() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Banned">("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadPassengers = () => {
    fetch("/api/passengers")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.passengers.map((p: any) => ({
          _id: p._id,
          fullName: p.fullName,
          email: p.email || "N/A",
          phone: p.phone,
          status: p.status || "Active",
        }));
        setPassengers(formatted);
      })
      .catch((err) => console.error("Error loading passengers:", err));
  };

  useEffect(() => {
    loadPassengers();
  }, []);

  const filteredPassengers = useMemo(() => {
    return passengers.filter((passenger) => {
      const matchesSearch =
        passenger.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        passenger._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        passenger.phone.includes(searchTerm) ||
        passenger.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || passenger.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [passengers, searchTerm, statusFilter]);

  const paginatedPassengers = filteredPassengers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPassengers.length / itemsPerPage);

  const deletePassenger = async (id: string) => {
    if (!confirm("Delete this passenger?")) return;
    await fetch(`/api/passengers/${id}`, { method: "DELETE" });
    loadPassengers();
  };

  const toggleBan = async (id: string) => {
    await fetch(`/api/passengers/${id}/ban`, { method: "PATCH" });
    loadPassengers();
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Name, ID, phone, or email"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as "All" | "Active" | "Banned");
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            >
              <option>All</option>
              <option>Active</option>
              <option>Banned</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Full Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Phone</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedPassengers.map((passenger) => (
                <tr key={passenger._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{passenger.fullName}</td>
                  <td className="px-4 py-3">{passenger.email}</td>
                  <td className="px-4 py-3">{passenger.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        passenger.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {passenger.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                     
                      <button
                        onClick={() => deletePassenger(passenger._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => toggleBan(passenger._id)}
                        className={`px-3 py-1 rounded text-xs ${
                          passenger.status === "Banned"
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-orange-600 text-white hover:bg-orange-700"
                        }`}
                      >
                        {passenger.status === "Banned" ? "Unban" : "Ban"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm">
            Showing{" "}
            {paginatedPassengers.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredPassengers.length)} of{" "}
            {filteredPassengers.length} passengers
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
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
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}