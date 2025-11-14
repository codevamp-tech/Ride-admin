"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AdminUsersTable } from "@/components/admins-table";

export default function AdminUsersPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
    // Only superAdmin allowed
    if (user?.role !== "superAdmin") router.push("/dashboard");
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== "superAdmin") return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-primary">Manage Admins</h1>
        <AdminUsersTable />
      </div>
    </DashboardLayout>
  );
}
