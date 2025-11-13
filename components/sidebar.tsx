"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { useEffect } from "react"

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Bookings", href: "/bookings" },
  { label: "Payments", href: "/payments" },
  { label: "Drivers", href: "/drivers" },
]

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-primary text-white p-6 space-y-8 relative h-screen overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:hidden p-1 hover:bg-primary-light rounded-lg transition"
        aria-label="Close sidebar"
        type="button"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mb-8 flex items-center gap-4">
        <Image src="/logo.png" alt="Qubi Ride Logo" width={50} height={50} className="flex-shrink-0" />
        <span className="text-xl font-bold">Qubi Ride</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 rounded-lg transition ${
              pathname === item.href ? "bg-accent text-slate-900 font-medium" : "text-gray-300 hover:bg-primary-light"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
