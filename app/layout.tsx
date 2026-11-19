import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/app/providers"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Qubi Ride — Fast, Safe & Affordable Rides",
  description: "Official portal and support center for Qubi Ride and Qubi Captain (operated by Oscode Software).",
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
