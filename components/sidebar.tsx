"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Bookings", href: "/bookings" },
  { label: "Payments", href: "/payments" },
  { label: "Drivers", href: "/drivers" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-primary text-white p-6 space-y-8">
      <div className="mb-8 flex items-center justify-around">
        <Image src="/logo.png" alt="Qubi Ride Logo" width={50} height={50} />
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
