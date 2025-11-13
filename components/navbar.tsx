"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { Menu } from "lucide-react";

export function Navbar({
  onMenuClick,
  isMobile,
}: {
  onMenuClick?: () => void;
  isMobile: boolean;
}) {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getInitials = (email?: string) => {
    if (!email) return "";
    return email.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-background border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          aria-label="Open sidebar"
          type="button"
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
        <h1 className="text-xl font-bold text-primary">Qubi Ride Admin</h1>
      </div>
      <div className="flex items-center gap-4">
        {isMobile ? (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-slate-900 font-bold">
            {getInitials(user?.email)}
          </div>
        ) : (
          <span className="text-text-light">{user?.email}</span>
        )}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-accent text-slate-900 hover:text-white rounded-lg hover:bg-accent-light transition"
          type="button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
