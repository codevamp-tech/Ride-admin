import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/app/providers"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Qubi Ride Admin",
  description: "Admin dashboard for Qubi Ride ride-sharing service",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
