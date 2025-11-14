"use client"

import { useState, useEffect } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface CarTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { type: string; rate: number; status: "Active" | "Inactive" }) => void
  initialData?: { type: string; rate: number; status: "Active" | "Inactive" } | null
}

export function CarTypeModal({ isOpen, onClose, onSubmit, initialData }: CarTypeModalProps) {
  const [type, setType] = useState("")
  const [rate, setRate] = useState("")
  const [status, setStatus] = useState<"Active" | "Inactive">("Active")
  const [errors, setErrors] = useState<{ type?: string; rate?: string }>({})

  useEffect(() => {
    if (initialData) {
      setType(initialData.type)
      setRate(initialData.rate.toString())
      setStatus(initialData.status)
    } else {
      setType("")
      setRate("")
      setStatus("Active")
    }
    setErrors({})
  }, [initialData, isOpen])

  const validateForm = () => {
    const newErrors: { type?: string; rate?: string } = {}

    if (!type.trim()) {
      newErrors.type = "Car type is required"
    }

    if (!rate || parseFloat(rate) <= 0) {
      newErrors.rate = "Rate must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit({
        type: type.trim(),
        rate: parseFloat(rate),
        status,
      })
      setType("")
      setRate("")
      setStatus("Active")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text">{initialData ? "Edit Car Type" : "Add New Car Type"}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Car Type Name</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g., Sedan, SUV, Premium"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.type ? "border-danger" : "border-border"
              }`}
            />
            {errors.type && <p className="text-danger text-xs mt-1">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Rate (₹/km)</label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 12.50"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.rate ? "border-danger" : "border-border"
              }`}
            />
            {errors.rate && <p className="text-danger text-xs mt-1">{errors.rate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-text hover:bg-surface transition"
            >
              Cancel
            </button>
            <button type="submit" className="flex-1 text-sm text-slate-900 hover:text-white bg-accent hover:cursor-pointer hover:bg-accent-light rounded-lg">
              {initialData ? "Update" : "Add"} Car Type
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
