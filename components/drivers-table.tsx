"use client";

import { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { AddDriverModal } from "@/components/modals/add-driver-modal";
import { EditDriverModal } from "@/components/modals/edit-driver-modal";
import { ViewDriverModal } from "@/components/modals/view-driver-modal";

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
    "All" | "Active" | "Inactive" | "Pending Approval" | "Banned" | "Rejected"
  >("All");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<
    "All" | "Sedan" | "Suv" | "Hatchback"
  >("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const loadDrivers = () => {
    fetch("/api/drivers")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.drivers.map((d: any) => ({
          _id: d._id,
          fullName: d.fullName,
          email: d.email,
          phone: d.phone,
          dateOfBirth: d.dateOfBirth,
          address: d.address,
          licenseNumber: d.licenseNumber,
          licenseExpiry: d.licenseExpiry,
          licenseState: d.licenseState,
          registrationNumber: d.registrationNumber,
          vehicleYear: d.vehicleYear,
          vehicleColor: d.vehicleColor,
          vehicleType: capitalize(d.vehicleType),
          licensePlate: d.licensePlate || "N/A",
          accountHolderName: d.accountHolderName,
          accountNumber: d.accountNumber,
          ifscCode: d.ifscCode,
          bankName: d.bankName,
          status: d.status || "Pending Approval",
        }));
        setDrivers(formatted);
      });
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

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
        vehicleTypeFilter === "All" || driver.vehicleType === vehicleTypeFilter;

      return matchesSearch && matchesStatus && matchesVehicleType;
    });
  }, [drivers, searchTerm, statusFilter, vehicleTypeFilter]);

  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);

  const deleteDriver = async (id: string) => {
    if (!confirm("Delete this driver?")) return;
    await fetch(`/api/drivers/${id}`, { method: "DELETE" });
    loadDrivers();
  };

  const toggleBan = async (id: string) => {
    await fetch(`/api/drivers/${id}/ban`, { method: "PATCH" });
    loadDrivers();
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(
                  e.target.value as "All" | "Active" | "Inactive" | "Pending Approval" | "Banned" | "Rejected"
                );
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending Approval</option>
              <option>Banned</option>
              <option>Rejected</option>
            </select>
          </div>

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

          <div className="flex items-end">
            <button
              onClick={() => setOpenAdd(true)}
              className="px-3 py-2 text-sm text-slate-900 hover:text-white bg-accent hover:bg-accent-light rounded-lg"
            >
              + Add Driver
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
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
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedDrivers.map((driver) => (
                <tr key={driver._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{driver._id}</td>
                  <td className="px-4 py-3">{driver.fullName}</td>
                  <td className="px-4 py-3">{driver.phone}</td>
                  <td className="px-4 py-3">{driver.licenseNumber}</td>
                  <td className="px-4 py-3">{driver.vehicleType}</td>
                  <td className="px-4 py-3">{driver.licenseExpiry}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-medium ${
                        driver.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : driver.status === "Pending Approval"
                          ? "bg-yellow-100 text-yellow-700"
                          : driver.status === "Banned"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {driver.status === "Pending Approval" ? (
                        <>
                          <button
                            onClick={() => {
                              setSelectedDriver(driver);
                              setOpenView(true);
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                          >
                            View Profile
                          </button>
                         
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setSelectedDriver(driver);
                              setOpenEdit(true);
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteDriver(driver._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => toggleBan(driver._id)}
                            className={`px-3 py-1 rounded text-xs ${
                              driver.status === "Banned"
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-orange-600 text-white hover:bg-orange-700"
                            }`}
                          >
                            {driver.status === "Banned" ? "Unban" : "Ban"}
                          </button>
                        </>
                      )}
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
            {paginatedDrivers.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredDrivers.length)} of{" "}
            {filteredDrivers.length} drivers
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

      <AddDriverModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdded={() => loadDrivers()}
      />

      <EditDriverModal
        open={openEdit}
        driver={selectedDriver}
        onClose={() => setOpenEdit(false)}
        onUpdated={() => loadDrivers()}
      />

      <ViewDriverModal
        open={openView}
        driver={selectedDriver}
        onClose={() => setOpenView(false)}
        onUpdated={() => loadDrivers()}
      />
    </div>
  );
}
