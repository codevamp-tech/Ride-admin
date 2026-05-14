"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Lock, ArrowRight } from "lucide-react"

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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-10 pointer-events-none"></div>

      {/* Decorative glassmorphism corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-white/40 to-white/10 dark:from-slate-800/40 dark:to-slate-900/10 rounded-br-full pointer-events-none border border-white/50 dark:border-slate-700/50 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] hidden sm:block"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-linear-to-tl from-white/40 to-white/10 dark:from-slate-800/40 dark:to-slate-900/10 rounded-tl-full pointer-events-none border border-white/50 dark:border-slate-700/50 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] hidden sm:block"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-slate-700/50 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full"></div>
              <Image
                src="/logo.png"
                alt="Qubi Ride Logo"
                width={80}
                height={80}
                className="mx-auto mb-5 rounded-2xl border-3 border-gray-500 dark:border-slate-700 shadow-md relative z-10"
              />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">Sign in to your Qubi Admin Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5 text-left">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@qubi.com"
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed group h-11 border-0"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
