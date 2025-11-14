"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { PassengersTable } from "@/components/passengers-table";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers";
import { useEffect } from "react";

export default function PassengersPage() {
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
          <h1 className="text-3xl font-bold text-text">Passengers</h1>
          <p className="text-text-light mt-2">
            View and manage all registered passengers
          </p>
        </div>
        <PassengersTable />
      </div>
    </DashboardLayout>
  );
}
