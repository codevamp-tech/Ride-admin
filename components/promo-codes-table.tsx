"use client";

import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Plus, Tag, Percent, Trash2, Edit2, Copy, Check } from "lucide-react";
import { PromoCodeModal } from "./modals/promo-code-modal";

interface PromoCode {
  _id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  expiryDate?: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export function PromoCodesTable() {
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/promo-codes");
      const data = await res.json();
      setCodes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch promo codes", err);
      setCodes([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return codes.filter((c) => {
      const matchSearch =
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "All" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [codes, searchTerm, statusFilter]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleOpenModal = (code?: PromoCode) => {
    setEditingCode(code || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCode(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    if (editingCode) {
      const res = await fetch(`/api/promo-codes/${editingCode._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update");
      }
      const updated = await res.json();
      setCodes((prev) => prev.map((c) => (c._id === editingCode._id ? updated : c)));
    } else {
      const res = await fetch("/api/promo-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create");
      }
      const newCode = await res.json();
      setCodes((prev) => [newCode, ...prev]);
    }
    handleCloseModal();
  };

  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this promo code?")) return;
    await fetch(`/api/promo-codes/${_id}`, { method: "DELETE" });
    setCodes((prev) => prev.filter((c) => c._id !== _id));
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDiscount = (code: PromoCode) => {
    if (code.discountType === "percentage") return `${code.discountValue}%`;
    return `₹${code.discountValue}`;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-text-light text-sm">Loading promo codes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Search</label>
            <input
              type="text"
              placeholder="Code or description"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as "All" | "Active" | "Inactive"); setCurrentPage(1); }}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
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
              New Promo Code
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-text">Code</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Description</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Discount</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Min Order</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Usage</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Expiry</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-text">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((code) => (
                <tr key={code._id} className="hover:bg-surface transition-colors">
                  {/* Code */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-text tracking-wider bg-surface px-2 py-0.5 rounded text-xs border border-border">
                        {code.code}
                      </span>
                      <button
                        onClick={() => copyCode(code.code, code._id)}
                        className="p-1 hover:bg-gray-100 rounded transition"
                        title="Copy code"
                      >
                        {copiedId === code._id ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-4 py-3 text-text max-w-xs">
                    <p className="truncate">{code.description}</p>
                  </td>

                  {/* Discount */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-accent">{formatDiscount(code)}</span>
                      {code.maxDiscountAmount && (
                        <span className="text-xs text-gray-400">Max ₹{code.maxDiscountAmount}</span>
                      )}
                    </div>
                  </td>

                  {/* Min Order */}
                  <td className="px-4 py-3 text-text">
                    {code.minOrderAmount ? `₹${code.minOrderAmount}` : <span className="text-gray-400">—</span>}
                  </td>

                  {/* Usage */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-text text-xs">
                        {code.usedCount} used
                      </span>
                      {code.usageLimit ? (
                        <>
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full transition-all"
                              style={{ width: `${Math.min(100, (code.usedCount / code.usageLimit) * 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">Limit: {code.usageLimit}</span>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400">Unlimited</span>
                      )}
                    </div>
                  </td>

                  {/* Expiry */}
                  <td className="px-4 py-3">
                    {code.expiryDate ? (
                      <span className={`text-xs font-medium ${isExpired(code.expiryDate) ? "text-red-500" : "text-text"}`}>
                        {new Date(code.expiryDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                        {isExpired(code.expiryDate) && <span className="ml-1">(Expired)</span>}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">No expiry</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        code.status === "Active"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {code.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenModal(code)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(code._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition"
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

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-text-light font-medium">No promo codes found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm || statusFilter !== "All"
                ? "Try adjusting your filters"
                : "Click \"New Promo Code\" to create your first code"}
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-text-light text-sm">
            Showing{" "}
            {paginated.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filtered.length)}{" "}
            of {filtered.length} codes
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

      <PromoCodeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingCode}
      />
    </div>
  );
}
