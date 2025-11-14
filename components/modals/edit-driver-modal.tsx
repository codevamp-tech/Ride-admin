"use client";

import { useState, useEffect } from "react";

export function EditDriverModal({ open, onClose, driver, onUpdated }: any) {
  const [form, setForm] = useState(driver || {});

  useEffect(() => setForm(driver), [driver]);

  if (!open) return null;

  const handleSubmit = async () => {
    await fetch(`/api/drivers/${driver._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onUpdated();
    onClose();
  };

  if(!form){
    return <div>Loading...</div>
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Driver</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Full Name"
            value={form.fullName || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <input
            placeholder="Email"
            value={form.email || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Phone"
            value={form.phone || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder="Date of Birth"
            type="date"
            value={form.dateOfBirth || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
          />
          <input
            placeholder="Address"
            value={form.address || ""}
            className="w-full border px-3 py-2 rounded col-span-2"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            placeholder="License Number"
            value={form.licenseNumber || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
          />
          <input
            placeholder="License Expiry"
            type="date"
            value={form.licenseExpiry || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, licenseExpiry: e.target.value })}
          />
          <input
            placeholder="License State"
            value={form.licenseState || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, licenseState: e.target.value })}
          />
          <input
            placeholder="Registration Number"
            value={form.registrationNumber || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
          />
          <input
            placeholder="Vehicle Year"
            value={form.vehicleYear || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, vehicleYear: e.target.value })}
          />
          <input
            placeholder="Vehicle Color"
            value={form.vehicleColor || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, vehicleColor: e.target.value })}
          />
          <select
            value={form.vehicleType || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
          >
            <option value="">Vehicle Type</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
          </select>
          <input
            placeholder="License Plate"
            value={form.licensePlate || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, licensePlate: e.target.value })}
          />
          <input
            placeholder="Account Holder Name"
            value={form.accountHolderName || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, accountHolderName: e.target.value })}
          />
          <input
            placeholder="Account Number"
            value={form.accountNumber || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
          />
          <input
            placeholder="IFSC Code"
            value={form.ifscCode || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, ifscCode: e.target.value })}
          />
          <input
            placeholder="Bank Name"
            value={form.bankName || ""}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
