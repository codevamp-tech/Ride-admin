"use client";

import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { AdModal } from "./modals/ad-modal";

interface Ad {
  _id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  status: "Active" | "Inactive";
}

export function AdsTable() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("/api/ads");
        const data = await res.json();
        setAds(Array.isArray(data) ? data : data.ads || []);
      } catch (err) {
        console.error("Failed to fetch ads", err);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);


  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      const matchesSearch =
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad._id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || ad.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [ads, searchTerm, statusFilter]);

  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);

  const handleAddAd = async (data: {
    title: string;
    description: string;
    image: string;
    link?: string;
    status: "Active" | "Inactive";
  }) => {
    const res = await fetch("/api/ads", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const newAd = await res.json();
    setAds((prev) => [newAd, ...prev]);

    setIsModalOpen(false);
  };

  const handleEditAd = async (data: {
    title: string;
    description: string;
    image: string;
    link?: string;
    status: "Active" | "Inactive";
  }) => {
    if (!editingAd) return;

    const res = await fetch(`/api/ads/${editingAd._id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    const updated = await res.json();

    setAds((prev) =>
      prev.map((ad) => (ad._id === editingAd._id ? updated : ad))
    );

    setEditingAd(null);
    setIsModalOpen(false);
  };

  const handleDeleteAd = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;

    await fetch(`/api/ads/${_id}`, { method: "DELETE" });

    setAds((prev) => prev.filter((ad) => ad._id !== _id));
  };

  const handleOpenModal = (ad?: Ad) => {
    if (ad) {
      setEditingAd(ad);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAd(null);
  };

  if (loading) {
    return <p className="text-center py-10">Loading ads...</p>;
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
              placeholder="Title, description or ID"
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
              New Ad
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  Title
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  Image
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text">
                  Link
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
              {paginatedAds.map((ad) => (
                <tr key={ad._id} className="hover:bg-surface">
                  <td className="px-4 py-3 text-text font-medium">
                    {ad.title}
                  </td>
                  <td className="px-4 py-3 text-text max-w-xs truncate">
                    {ad.description}
                  </td>
                  <td className="px-4 py-3 text-text">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-12 h-12 object-cover rounded cursor-pointer"
                      onClick={() => window.open(ad.image, '_blank')}
                      title="Click to view full size"
                    />
                  </td>
                  <td className="px-4 py-3 text-text">
                    {ad.link ? (
                      <a
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-xs"
                      >
                        Visit
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ad.status === "Active"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleOpenModal(ad);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAd(ad._id)}
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

        {filteredAds.length === 0 && (
          <div className="text-center py-8 text-text-light">
            No ads found
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <p className="text-text-light text-sm">
            Showing{" "}
            {paginatedAds.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredAds.length)}{" "}
            of {filteredAds.length} ads
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
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-border rounded-lg text-text hover:bg-surface disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      <AdModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingAd ? handleEditAd : handleAddAd}
        initialData={editingAd}
      />
    </div>
  );
}
