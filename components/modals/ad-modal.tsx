"use client"

import { useState, useEffect } from "react"
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface AdModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { title: string; description: string; image: string; link?: string; status: "Active" | "Inactive" }) => void
  initialData?: { title: string; description: string; image: string; link?: string; status: "Active" | "Inactive" } | null
}

export function AdModal({ isOpen, onClose, onSubmit, initialData }: AdModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [link, setLink] = useState("")
  const [status, setStatus] = useState<"Active" | "Inactive">("Active")
  const [errors, setErrors] = useState<{ title?: string; description?: string; image?: string }>({})
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setImage(initialData.image)
      setImagePreview(initialData.image)
      setLink(initialData.link || "")
      setStatus(initialData.status)
    } else {
      setTitle("")
      setDescription("")
      setImage("")
      setImageFile(null)
      setImagePreview("")
      setLink("")
      setStatus("Active")
    }
    setErrors({})
  }, [initialData, isOpen])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, image: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed." })
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        setErrors({ ...errors, image: "File size too large. Maximum size is 5MB." })
        return
      }

      setImageFile(file)
      setErrors({ ...errors, image: undefined })
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return image // Return existing image if editing and no new file

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", imageFile)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ ...errors, image: data.error || "Failed to upload image" })
        return null
      }

      return data.imageUrl
    } catch (error) {
      setErrors({ ...errors, image: "Failed to upload image" })
      return null
    } finally {
      setUploading(false)
    }
  }

  const validateForm = () => {
    const newErrors: { title?: string; description?: string; image?: string } = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!image && !imageFile) {
      newErrors.image = "Image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Upload image if new file selected
    let imageUrl = image
    if (imageFile) {
      const uploadedUrl = await uploadImage()
      if (!uploadedUrl) {
        return // Upload failed, errors already set
      }
      imageUrl = uploadedUrl
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      image: imageUrl,
      link: link.trim() || undefined,
      status,
    })
    
    setTitle("")
    setDescription("")
    setImage("")
    setImageFile(null)
    setImagePreview("")
    setLink("")
    setStatus("Active")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text">{initialData ? "Edit Ad" : "Add New Ad"}</h2>
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
            <label className="block text-sm font-medium text-text mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Summer Sale 2024"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.title ? "border-danger" : "border-border"
              }`}
            />
            {errors.title && <p className="text-danger text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter advertisement description"
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none ${
                errors.description ? "border-danger" : "border-border"
              }`}
            />
            {errors.description && <p className="text-danger text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Image <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-accent transition ${
                  errors.image ? "border-danger" : "border-border"
                }`}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-32 rounded"
                    />
                    <p className="text-sm text-gray-600">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                    <p className="text-xs text-gray-400">JPEG, PNG, GIF, WebP (Max 5MB)</p>
                  </div>
                )}
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {errors.image && <p className="text-danger text-xs mt-1">{errors.image}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Link URL <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
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
              disabled={uploading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={uploading}
              className="flex-1 text-sm text-slate-900 hover:text-white bg-accent hover:cursor-pointer hover:bg-accent-light rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : initialData ? "Update Ad" : "Add Ad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

