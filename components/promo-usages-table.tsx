"use client";

import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tag } from "lucide-react";

interface PromoUsage {
  _id: string;
  promoId: string;
  passengerId: { _id: string; fullName: string; email: string; phone: string };
  rideId: { _id: string; pickup: string; dropoff: string; status: string };
  promoCode: string;
  originalFare: number;
  discountAmount: number;
  finalFare: number;
  usedAt: string;
  createdAt: string;
}

export function PromoUsagesTable() {
  const [usages, setUsages] = useState<PromoUsage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsages();
  }, []);

  const fetchUsages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/promo-usages");
      const data = await res.json();
      setUsages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch promo usages", err);
      setUsages([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return usages.filter((u) => {
      const searchStr = searchTerm.toLowerCase();
      return (
        u.promoCode.toLowerCase().includes(searchStr) ||
        u.passengerId?.fullName?.toLowerCase().includes(searchStr) ||
        u.passengerId?.email?.toLowerCase().includes(searchStr)
      );
    });
  }, [usages, searchTerm]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-text-light text-sm">Loading promo usages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Search</label>
            <input
              type="text"
              placeholder="Code, passenger name, or email"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-text">Code</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Passenger</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Original Fare</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Discount</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Final Fare</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Used At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((usage) => (
                <tr key={usage._id} className="hover:bg-surface transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono font-semibold text-text tracking-wider bg-surface px-2 py-0.5 rounded text-xs border border-border">
                      {usage.promoCode}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-text">{usage.passengerId?.fullName || "Unknown"}</span>
                      <span className="text-xs text-text-light">{usage.passengerId?.email}</span>
                      <span className="text-xs text-text-light">{usage.passengerId?.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text">₹{usage.originalFare}</td>
                  <td className="px-4 py-3 text-success font-medium">-₹{usage.discountAmount}</td>
                  <td className="px-4 py-3 text-text font-bold">₹{usage.finalFare}</td>
                  <td className="px-4 py-3 text-text">
                    {new Date(usage.usedAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-text-light font-medium">No promo usages found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm ? "Try adjusting your search" : "No promo codes have been used yet"}
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-text-light text-sm">
            Showing{" "}
            {paginated.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filtered.length)}{" "}
            of {filtered.length} usages
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-border rounded-lg text-text hover:bg-surface disabled:opacity-50 text-sm"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-text text-sm">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-border rounded-lg text-text hover:bg-surface disabled:opacity-50 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
