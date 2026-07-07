"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { PromoUsagesTable } from "@/components/promo-usages-table";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers";
import { useEffect } from "react";

export default function PromoUsagesPage() {
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
          <h1 className="text-3xl font-bold text-text">Promo Usages</h1>
          <p className="text-text-light mt-2">
            View the history of promo codes used by passengers
          </p>
        </div>
        <PromoUsagesTable />
      </div>
    </DashboardLayout>
  );
}
