"use client";

import { useState } from "react";

export function AddDriverModal({ open, onClose, onAdded }: any) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    licenseNumber: "",
    licenseExpiry: "",
    licenseState: "",
    registrationNumber: "",
    vehicleYear: "",
    vehicleColor: "",
    vehicleType: "",
    licensePlate: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    password: "",
  });

  if (!open) return null;

  const handleSubmit = async () => {
    await fetch("/api/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add Driver</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter full name"
              value={form.fullName}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              placeholder="Enter email"
              value={form.email}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter phone number"
              value={form.phone}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={form.dateOfBirth}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
              }
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              placeholder="Enter address"
              value={form.address}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              License Number <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter license number"
              value={form.licenseNumber}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, licenseNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              License Expiry <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={form.licenseExpiry}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, licenseExpiry: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              License State <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter license state"
              value={form.licenseState}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, licenseState: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter registration number"
              value={form.registrationNumber}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, registrationNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Year <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter vehicle year"
              value={form.vehicleYear}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, vehicleYear: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Color <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter vehicle color"
              value={form.vehicleColor}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, vehicleColor: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Type <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter vehicle type"
              value={form.vehicleType}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, vehicleType: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              License Plate
            </label>
            <input
              placeholder="Enter license plate"
              value={form.licensePlate}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, licensePlate: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name
            </label>
            <input
              placeholder="Enter account holder name"
              value={form.accountHolderName}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, accountHolderName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter account number"
              value={form.accountNumber}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) =>
                setForm({ ...form, accountNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter IFSC code"
              value={form.ifscCode}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, ifscCode: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </label>
            <input
              placeholder="Enter bank name"
              value={form.bankName}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, bankName: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter password"
              type="password"
              value={form.password}
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Driver
          </button>
        </div>
      </div>
    </div>
  );
}
