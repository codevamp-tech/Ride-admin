"use client";

import { useState, useEffect } from "react";

const convertToInputFormat = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

const convertToDbFormat = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

export function EditDriverModal({ open, onClose, driver, onUpdated }: any) {
  const [form, setForm] = useState(driver || {});
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (driver) {
      setForm({
        ...driver,
        licenseExpiry: convertToInputFormat(driver.licenseExpiry || ""),
        dateOfBirth: convertToInputFormat(driver.dateOfBirth || ""),
      });
    }
  }, [driver]);

  if (!open) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [fieldName]: true }));
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Failed to upload image");
        return;
      }

      const data = await res.json();
      setForm((prev: any) => ({ ...prev, [fieldName]: data.imageUrl }));
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading");
    } finally {
      setUploading((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleSubmit = async () => {
    const submitData = {
      ...form,
      licenseExpiry: convertToDbFormat(form.licenseExpiry),
      dateOfBirth: convertToDbFormat(form.dateOfBirth),
    };

    await fetch(`/api/drivers/${driver._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });
    onUpdated();
    onClose();
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Driver</h2>

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

          <div className="col-span-2 border-t pt-4 mt-2">
            <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">
              Verification Documents & Photos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Selfie Photo */}
              <div className="border rounded p-3 bg-gray-50 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-600 block">
                  Driver Photo (Selfie)
                </span>
                {form.driverPhotoUrl ? (
                  <div className="relative aspect-[4/3] w-full rounded overflow-hidden border bg-white group">
                    <img
                      src={form.driverPhotoUrl}
                      alt="Driver Photo"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, driverPhotoUrl: "" })}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full text-xs shadow-md transition-colors"
                      title="Remove Image"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full rounded border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-white text-gray-400 text-xs p-2 text-center hover:border-indigo-500 cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "driverPhotoUrl")}
                      disabled={uploading["driverPhotoUrl"]}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {uploading["driverPhotoUrl"] ? (
                      <span className="text-indigo-600 font-medium animate-pulse">Uploading...</span>
                    ) : (
                      <>
                        <span className="font-semibold text-indigo-600">Click to Upload</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
                      </>
                    )}
                  </div>
                )}
                <input
                  placeholder="Or paste image URL"
                  value={form.driverPhotoUrl || ""}
                  className="w-full border px-2 py-1 text-xs rounded bg-white mt-1"
                  onChange={(e) => setForm({ ...form, driverPhotoUrl: e.target.value })}
                />
              </div>

              {/* License Front Photo */}
              <div className="border rounded p-3 bg-gray-50 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-600 block">
                  License Front Photo
                </span>
                {form.licenseFrontPhotoUrl ? (
                  <div className="relative aspect-[4/3] w-full rounded overflow-hidden border bg-white group">
                    <img
                      src={form.licenseFrontPhotoUrl}
                      alt="License Front"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, licenseFrontPhotoUrl: "" })}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full text-xs shadow-md transition-colors"
                      title="Remove Image"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full rounded border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-white text-gray-400 text-xs p-2 text-center hover:border-indigo-500 cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "licenseFrontPhotoUrl")}
                      disabled={uploading["licenseFrontPhotoUrl"]}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {uploading["licenseFrontPhotoUrl"] ? (
                      <span className="text-indigo-600 font-medium animate-pulse">Uploading...</span>
                    ) : (
                      <>
                        <span className="font-semibold text-indigo-600">Click to Upload</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
                      </>
                    )}
                  </div>
                )}
                <input
                  placeholder="Or paste image URL"
                  value={form.licenseFrontPhotoUrl || ""}
                  className="w-full border px-2 py-1 text-xs rounded bg-white mt-1"
                  onChange={(e) => setForm({ ...form, licenseFrontPhotoUrl: e.target.value })}
                />
              </div>

              {/* License Back Photo */}
              <div className="border rounded p-3 bg-gray-50 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-600 block">
                  License Back Photo
                </span>
                {form.licenseBackPhotoUrl ? (
                  <div className="relative aspect-[4/3] w-full rounded overflow-hidden border bg-white group">
                    <img
                      src={form.licenseBackPhotoUrl}
                      alt="License Back"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, licenseBackPhotoUrl: "" })}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full text-xs shadow-md transition-colors"
                      title="Remove Image"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full rounded border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-white text-gray-400 text-xs p-2 text-center hover:border-indigo-500 cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "licenseBackPhotoUrl")}
                      disabled={uploading["licenseBackPhotoUrl"]}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {uploading["licenseBackPhotoUrl"] ? (
                      <span className="text-indigo-600 font-medium animate-pulse">Uploading...</span>
                    ) : (
                      <>
                        <span className="font-semibold text-indigo-600">Click to Upload</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
                      </>
                    )}
                  </div>
                )}
                <input
                  placeholder="Or paste image URL"
                  value={form.licenseBackPhotoUrl || ""}
                  className="w-full border px-2 py-1 text-xs rounded bg-white mt-1"
                  onChange={(e) => setForm({ ...form, licenseBackPhotoUrl: e.target.value })}
                />
              </div>
            </div>
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}