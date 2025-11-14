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
                className={`px-3 py-1 rounded-full text-xs font-medium ${
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
            </p>
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
