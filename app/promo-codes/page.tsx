"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { PromoCodesTable } from "@/components/promo-codes-table";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers";
import { useEffect } from "react";

export default function PromoCodesPage() {
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
          <h1 className="text-3xl font-bold text-text">Promo Codes</h1>
          <p className="text-text-light mt-2">
            Manage discount codes and promotional offers for your riders
          </p>
        </div>
        <PromoCodesTable />
      </div>
    </DashboardLayout>
  );
}
