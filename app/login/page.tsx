"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/app/providers"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

 useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (email: string, password: string) => {
    setError("")
    setIsLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return <LoginForm onSubmit={handleSubmit} error={error} isLoading={isLoading} />
}
