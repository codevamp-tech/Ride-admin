"use client";

import { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";

interface Driver {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  licenseState: string;
  registrationNumber: string;
  vehicleType: string;
  licensePlate: string;
  status: "Active" | "Inactive" | "Suspended";
}

export function DriversTable() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive" | "Suspended"
  >("All");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<
    "All" | "Sedan" | "Suv" | "Hatchback"
  >("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ------------------------------------------------
  // 🔥 Fetch drivers from backend
  // ------------------------------------------------
  useEffect(() => {
    fetch("/api/drivers")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.drivers.map((d: any) => ({
          _id: d._id,
          fullName: d.fullName,
          email: d.email,
          phone: d.phone,
          licenseNumber: d.licenseNumber,
          licenseExpiry: d.licenseExpiry,
          licenseState: d.licenseState,
          registrationNumber: d.registrationNumber,
          vehicleType: capitalize(d.vehicleType), // sedan → Sedan
          licensePlate: d.licensePlate || "N/A",
          status: "Active", // you can set based on your logic later
        }));

        setDrivers(formatted);
      });
  }, []);

  // Helper: capitalize first letter
  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // ------------------------------------------------
  // 🔥 Filtering logic (same as before)
  // ------------------------------------------------
  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      const matchesSearch =
        driver.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm) ||
        driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || driver.status === statusFilter;

      const matchesVehicleType =
        vehicleTypeFilter === "All" ||
        driver.vehicleType === vehicleTypeFilter;

      return matchesSearch && matchesStatus && matchesVehicleType;
    });
  }, [drivers, searchTerm, statusFilter, vehicleTypeFilter]);

  // Pagination
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);

  // ------------------------------------------------
  // 🔥 TABLE UI (same as before)
  // ------------------------------------------------
  return (
    <div className="space-y-6">
      <Card className="p-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Name, ID, phone, or license"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(
                  e.target.value as "All" | "Active" | "Inactive" | "Suspended"
                );
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
          </div>

          {/* Vehicle Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Vehicle Type
            </label>
            <select
              value={vehicleTypeFilter}
              onChange={(e) => {
                setVehicleTypeFilter(
                  e.target.value as "All" | "Sedan" | "Suv" | "Hatchback"
                );
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            >
              <option>All</option>
              <option>Sedan</option>
              <option value={"Suv"}>SUV</option>
              <option>Hatchback</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Driver ID</th>
                <th className="px-4 py-3 text-left font-semibold">Full Name</th>
                <th className="px-4 py-3 text-left font-semibold">Phone</th>
                <th className="px-4 py-3 text-left font-semibold">
                  License Number
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Vehicle Type
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  License Expiry
                </th>
                {/* <th className="px-4 py-3 text-left font-semibold">Status</th> */}
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedDrivers.map((driver) => (
                <tr key={driver._id} className="hover:bg-surface">
                  <td className="px-4 py-3">{driver._id}</td>
                  <td className="px-4 py-3">{driver.fullName}</td>
                  <td className="px-4 py-3">{driver.phone}</td>
                  <td className="px-4 py-3">{driver.licenseNumber}</td>
                  <td className="px-4 py-3">{driver.vehicleType}</td>
                  <td className="px-4 py-3">{driver.licenseExpiry}</td>

                  {/* Status badge */}
                  {/* <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        driver.status === "Active"
                          ? "bg-success/10 text-success"
                          : driver.status === "Inactive"
                          ? "bg-warning/10 text-warning"
                          : "bg-danger/10 text-danger"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm">
            Showing{" "}
            {paginatedDrivers.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to{" "}
            {Math.min(currentPage * itemsPerPage, filteredDrivers.length)} of{" "}
            {filteredDrivers.length} drivers
          </p>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
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
      </Card>
    </div>
  );
}
