"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers"

export function Navbar() {
  const router = useRouter()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="bg-background border-b border-border px-8 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">Qubi Ride Admin</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-text-light">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-accent text-slate-900 hover:text-white rounded-lg hover:cursor-pointer hover:bg-accent-light transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
