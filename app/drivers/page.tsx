"use client"
import { DashboardLayout } from "@/components/dashboard-layout";
import { DriversTable } from "@/components/drivers-table";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers";
import { useEffect } from "react";

export default function DriversPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text">Drivers</h1>
          <p className="text-text-light mt-2">
            Manage and monitor all active drivers
          </p>
        </div>
        <DriversTable />
      </div>
    </DashboardLayout>
  );
}
