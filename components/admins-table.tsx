"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { AddAdminModal } from "./modals/add-admin-modal";

export function AdminUsersTable() {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    const res = await fetch("/api/admins");
    const data = await res.json();
    setAdmins(data.admins || []);
  };

  const deleteAdmin = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;

    await fetch(`/api/admins/${id}`, { method: "DELETE" });
    loadAdmins();
  };

  // Filtering
  const filteredAdmins = useMemo(() => {
    return admins.filter((admin: any) =>
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [admins, searchTerm]);

  // Pagination
  const paginated = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  return (
    <>
      <Card className="p-6">
        {/* Search & Add Button */}
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search admin by email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border rounded-lg w-64"
          />

          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-accent text-slate-900 hover:cursor-pointer hover:text-white rounded-lg hover:bg-accent-light"
          >
            + Add Admin
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginated.map((admin: any) => (
                <tr key={admin._id} className="hover:bg-surface">
                  <td className="px-4 py-3">{admin.email}</td>
                  <td className="px-4 py-3">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteAdmin(admin._id)}
                      className="px-3 py-1 bg-danger text-white rounded-lg hover:bg-danger/80"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm">
            Showing {paginated.length} of {filteredAdmins.length}
          </p>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* Add Admin Modal */}
      <AddAdminModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={loadAdmins}
      />
    </>
  );
}
