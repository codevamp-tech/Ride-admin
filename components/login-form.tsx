"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  error?: string
  isLoading?: boolean
}

export function LoginForm({ onSubmit, error, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <Image src="/logo.png" alt="Qubi Ride Logo" width={80} height={80} className="mx-auto mb-4" />
            <p className="text-text-light mt-2">Admin Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@qubi.com"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded-lg">{error}</div>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-slate-900 hover:text-white hover:bg-accent-light hover:cursor-pointer font-medium py-2 rounded-lg transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
