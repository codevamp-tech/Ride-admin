"use client";

import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { CarTypeModal } from "./modals/car-type-modal";

interface CarType {
  _id: string;
  type: string;
  rate: number;
  rideType: "Private" | "Sharing" | "Airport";
  status: "Active" | "Inactive";
}

export function CarTypesTable() {
  const [carTypes, setCarTypes] = useState<CarType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [rideTypeFilter, setRideTypeFilter] = useState<
    "Private" | "Sharing" | "Airport"
  >("Private");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCarType, setEditingCarType] = useState<CarType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const res = await fetch("/api/cartypes");
        const data = await res.json();
        setCarTypes(data);
      } catch (err) {
        console.error("Failed to fetch car types", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarTypes();
  }, []);

  const filteredCarTypes = useMemo(() => {
    return carTypes.filter((carType) => {
      const matchesSearch =
        carType.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        carType._id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || carType.status === statusFilter;

      const matchesRideType = carType.rideType === rideTypeFilter;

      return matchesSearch && matchesStatus && matchesRideType;
    });
  }, [carTypes, searchTerm, statusFilter, rideTypeFilter]);

  const paginatedCarTypes = filteredCarTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredCarTypes.length / itemsPerPage);

  const handleAddCarType = async (data: {
    type: string;
    rate: number;
    status: "Active" | "Inactive";
    rideType: "Private" | "Sharing" | "Airport";
  }) => {
    const res = await fetch("/api/cartypes", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const newType = await res.json();
    setCarTypes((prev) => [...prev, newType]);

    setIsModalOpen(false);
  };

  const handleEditCarType = async (data: {
    type: string;
    rate: number;
    status: "Active" | "Inactive";
    rideType: "Private" | "Sharing" | "Airport";
  }) => {
    if (!editingCarType) return;

    const res = await fetch(`/api/cartypes/${editingCarType._id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    const updated = await res.json();

    setCarTypes((prev) =>
      prev.map((ct) => (ct._id === editingCarType._id ? updated : ct))
    );

    setEditingCarType(null);
    setIsModalOpen(false);
  };

  const handleDeleteCarType = async (_id: string) => {
    await fetch(`/api/cartypes/${_id}`, { method: "DELETE" });

    setCarTypes((prev) => prev.filter((ct) => ct._id !== _id));
  };

  const handleOpenModal = (carType?: CarType) => {
    if (carType) {
      setEditingCarType(carType);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCarType(null);
  };

  if (loading) {
    return <p className="text-center py-10">Loading car types...</p>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Car type or ID"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(
                  e.target.value as "All" | "Active" | "Inactive"
                );
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="flex items-end justify-end">
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-900 hover:text-white hover:cursor-pointer bg-accent hover:bg-accent-light rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Car Type
            </button>
          </div>
        </div>

        {/* Ride Type Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => {
              setRideTypeFilter("Private");
              setCurrentPage(1);
            }}
            className={`px-6 py-3 text-sm font-medium transition-colors hover:cursor-pointer relative ${
              rideTypeFilter === "Private"
                ? "text-accent-light border-b-2 border-accent-light"
                : "text-text-light hover:text-text"
            }`}
          >
            Private Rides
          </button>
          <button
            onClick={() => {
              setRideTypeFilter("Sharing");
              setCurrentPage(1);
            }}
            className={`px-6 py-3 text-sm font-medium transition-colors hover:cursor-pointer relative ${
              rideTypeFilter === "Sharing"
                ? "text-accent-light border-b-2 border-accent-light"
                : "text-text-light hover:text-text"
            }`}
          >
            Sharing Rides
          </button>
          <button
            onClick={() => {
              setRideTypeFilter("Airport");
              setCurrentPage(1);
            }}
            className={`px-6 py-3 text-sm font-medium transition-colors hover:cursor-pointer relative ${
              rideTypeFilter === "Airport"
                ? "text-accent-light border-b-2 border-accent-light"
                : "text-text-light hover:text-text"
            }`}
          >
            Airport Rides
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  Rate (₹/km)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedCarTypes.map((carType) => (
                <tr key={carType._id} className="hover:bg-surface">
                  <td className="px-4 py-3 text-text font-medium">
                    {carType.type}
                  </td>
                  <td className="px-4 py-3 text-text">
                    ₹{carType.rate.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        carType.status === "Active"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {carType.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleOpenModal(carType);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCarType(carType._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCarTypes.length === 0 && (
          <div className="text-center py-8 text-text-light">
            No car types found for {rideTypeFilter} rides
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <p className="text-text-light text-sm">
            Showing{" "}
            {paginatedCarTypes.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredCarTypes.length)}{" "}
            of {filteredCarTypes.length} car types
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
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border rounded-lg text-text hover:bg-surface disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      <CarTypeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingCarType ? handleEditCarType : handleAddCarType}
        initialData={editingCarType}
      />
    </div>
  );
}