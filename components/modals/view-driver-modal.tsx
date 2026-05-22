export function ViewDriverModal({ open, onClose, driver, onUpdated }: any) {
  if (!open || !driver) return null;

  const approveDriver = async (id: string) => {
    await fetch(`/api/drivers/${id}/approve`, { method: "PATCH" });
    onUpdated();
    onClose?.();
  };

  const rejectDriver = async (id: string) => {
    if (!confirm("Reject this driver application?")) return;
    await fetch(`/api/drivers/${id}/reject`, { method: "PATCH" });
    onUpdated();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Driver Profile</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="font-semibold text-gray-600">Full Name:</label>
            <p className="mt-1">{driver.fullName}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">Email:</label>
            <p className="mt-1">{driver.email || "N/A"}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">Phone:</label>
            <p className="mt-1">{driver.phone}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">
              Date of Birth:
            </label>
            <p className="mt-1">{driver.dateOfBirth || "N/A"}</p>
          </div>
          <div className="col-span-2">
            <label className="font-semibold text-gray-600">Address:</label>
            <p className="mt-1">{driver.address || "N/A"}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">
              License Number:
            </label>
            <p className="mt-1">{driver.licenseNumber}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">
              License Expiry:
            </label>
            <p className="mt-1">{driver.licenseExpiry}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">
              License State:
            </label>
            <p className="mt-1">{driver.licenseState}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">
              Registration Number:
            </label>
            <p className="mt-1">{driver.registrationNumber}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">Vehicle Year:</label>
            <p className="mt-1">{driver.vehicleYear}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">
              Vehicle Color:
            </label>
            <p className="mt-1">{driver.vehicleColor}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">Vehicle Type:</label>
            <p className="mt-1">{driver.vehicleType}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">
              License Plate:
            </label>
            <p className="mt-1">{driver.licensePlate || "N/A"}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">
              Account Holder:
            </label>
            <p className="mt-1">{driver.accountHolderName || "N/A"}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">
              Account Number:
            </label>
            <p className="mt-1">{driver.accountNumber}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">IFSC Code:</label>
            <p className="mt-1">{driver.ifscCode}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">Bank Name:</label>
            <p className="mt-1">{driver.bankName || "N/A"}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600">Status:</label>
            <p className="mt-1">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${driver.status === "Active"
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
            </p>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <h3 className="font-bold text-gray-800 mb-4 text-sm tracking-wide uppercase">
            Documents & Photos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Selfie / Driver Photo */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500">
                Driver Photo (Selfie)
              </span>
              {driver.driverPhotoUrl ? (
                <a
                  href={driver.driverPhotoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <img
                    src={driver.driverPhotoUrl}
                    alt="Driver Photo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">
                      View Full Size
                    </span>
                  </div>
                </a>
              ) : (
                <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-gray-50 text-xs">
                  <span>No Selfie Uploaded</span>
                </div>
              )}
            </div>

            {/* License Front Photo */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500">
                License Front
              </span>
              {driver.licenseFrontPhotoUrl ? (
                <a
                  href={driver.licenseFrontPhotoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <img
                    src={driver.licenseFrontPhotoUrl}
                    alt="License Front"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">
                      View Full Size
                    </span>
                  </div>
                </a>
              ) : (
                <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-gray-50 text-xs">
                  <span>No Front Photo</span>
                </div>
              )}
            </div>

            {/* License Back Photo */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500">
                License Back
              </span>
              {driver.licenseBackPhotoUrl ? (
                <a
                  href={driver.licenseBackPhotoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <img
                    src={driver.licenseBackPhotoUrl}
                    alt="License Back"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">
                      View Full Size
                    </span>
                  </div>
                </a>
              ) : (
                <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-gray-50 text-xs">
                  <span>No Back Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => approveDriver(driver._id)}
            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => rejectDriver(driver._id)}
            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
          >
            Reject
          </button>
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
