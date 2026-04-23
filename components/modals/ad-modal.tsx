"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Upload, Crop, Check } from 'lucide-react'

// The ad image is displayed at 120x120 in the app — crop to 1:1 square
const CROP_OUTPUT_SIZE = 400 // Output canvas size in px

interface AdModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { title: string; description: string; image: string; link?: string; status: "Active" | "Inactive" }) => void
  initialData?: { title: string; description: string; image: string; link?: string; status: "Active" | "Inactive" } | null
}

function CropTool({ src, onCropped, onCancel }: { src: string; onCropped: (file: File, preview: string) => void; onCancel: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // cropBox in image-natural coords
  const [imgSize, setImgSize] = useState({ w: 1, h: 1 })
  const [displaySize, setDisplaySize] = useState({ w: 1, h: 1 })
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, size: 100 })
  const dragging = useRef(false)
  const dragStart = useRef({ mx: 0, my: 0, cx: 0, cy: 0 })

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      imgRef.current = img
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight })
      const containerW = containerRef.current?.clientWidth || 320
      const scale = Math.min(containerW / img.naturalWidth, 320 / img.naturalHeight)
      const dW = Math.round(img.naturalWidth * scale)
      const dH = Math.round(img.naturalHeight * scale)
      setDisplaySize({ w: dW, h: dH })
      // Start crop as the largest centred square in display coords
      const sq = Math.min(dW, dH)
      setCropBox({ x: (dW - sq) / 2, y: (dH - sq) / 2, size: sq })
    }
    img.src = src
  }, [src])

  // Mouse/Touch handlers for the crop box (in display px)
  const toDisplayPt = (e: React.MouseEvent | React.TouchEvent, rect: DOMRect) => {
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top }
  }

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const pt = toDisplayPt(e, rect)
    dragging.current = true
    dragStart.current = { mx: pt.x, my: pt.y, cx: cropBox.x, cy: cropBox.y }
  }

  const onPointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragging.current) return
    const pt = "touches" in e
      ? { x: (e as TouchEvent).touches[0].clientX, y: (e as TouchEvent).touches[0].clientY }
      : { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }

    const dx = pt.x - dragStart.current.mx
    const dy = pt.y - dragStart.current.my
    setCropBox(prev => {
      const newX = Math.max(0, Math.min(displaySize.w - prev.size, dragStart.current.cx + dx))
      const newY = Math.max(0, Math.min(displaySize.h - prev.size, dragStart.current.cy + dy))
      return { ...prev, x: newX, y: newY }
    })
  }, [displaySize])

  const onPointerUp = useCallback(() => { dragging.current = false }, [])

  useEffect(() => {
    window.addEventListener("mousemove", onPointerMove)
    window.addEventListener("mouseup", onPointerUp)
    window.addEventListener("touchmove", onPointerMove)
    window.addEventListener("touchend", onPointerUp)
    return () => {
      window.removeEventListener("mousemove", onPointerMove)
      window.removeEventListener("mouseup", onPointerUp)
      window.removeEventListener("touchmove", onPointerMove)
      window.removeEventListener("touchend", onPointerUp)
    }
  }, [onPointerMove, onPointerUp])

  const applyCrop = () => {
    if (!imgRef.current) return
    const scaleX = imgSize.w / displaySize.w
    const scaleY = imgSize.h / displaySize.h
    const sx = cropBox.x * scaleX
    const sy = cropBox.y * scaleY
    const sSize = cropBox.size * Math.min(scaleX, scaleY)

    const canvas = document.createElement("canvas")
    canvas.width = CROP_OUTPUT_SIZE
    canvas.height = CROP_OUTPUT_SIZE
    const ctx = canvas.getContext("2d")!
    ctx.drawImage(imgRef.current, sx, sy, sSize, sSize, 0, 0, CROP_OUTPUT_SIZE, CROP_OUTPUT_SIZE)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92)
    canvas.toBlob(blob => {
      if (!blob) return
      const file = new File([blob], "ad-cropped.jpg", { type: "image/jpeg" })
      onCropped(file, dataUrl)
    }, "image/jpeg", 0.92)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
        <Crop className="w-4 h-4 text-blue-500 shrink-0" />
        <span>Drag the box to frame your ad. The image will be cropped to a <strong>square</strong> to fit the app display.</span>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden rounded-lg border border-border select-none"
        style={{ width: displaySize.w, height: displaySize.h, background: "#111" }}
      >
        {/* Base image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="crop source" style={{ width: displaySize.w, height: displaySize.h, display: "block" }} draggable={false} />

        {/* Dark overlay outside the crop box */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,0,0,0.5)" }} />

        {/* Crop window — clear hole via box-shadow */}
        <div
          onMouseDown={onPointerDown}
          onTouchStart={onPointerDown}
          style={{
            position: "absolute",
            left: cropBox.x,
            top: cropBox.y,
            width: cropBox.size,
            height: cropBox.size,
            cursor: "move",
            boxShadow: `0 0 0 9999px rgba(0,0,0,0.5)`,
            border: "2px solid #fff",
            borderRadius: 4,
          }}
        >
          {/* Rule-of-thirds guides */}
          {[1, 2].map(i => (
            <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: `${(i / 3) * 100}%`, height: 1, background: "rgba(255,255,255,0.35)" }} />
          ))}
          {[1, 2].map(i => (
            <div key={`v${i}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${(i / 3) * 100}%`, width: 1, background: "rgba(255,255,255,0.35)" }} />
          ))}
          {/* Corner handles */}
          {["tl", "tr", "bl", "br"].map(c => (
            <div key={c} style={{
              position: "absolute",
              width: 12, height: 12,
              background: "#fff",
              borderRadius: 2,
              top: c.startsWith("t") ? -1 : undefined,
              bottom: c.startsWith("b") ? -1 : undefined,
              left: c.endsWith("l") ? -1 : undefined,
              right: c.endsWith("r") ? -1 : undefined,
            }} />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-text hover:bg-surface transition text-sm"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
        <button
          type="button"
          onClick={applyCrop}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-slate-900 hover:bg-accent-light rounded-lg transition text-sm font-semibold"
        >
          <Check className="w-4 h-4" /> Crop & Use
        </button>
      </div>
    </div>
  )
}

export function AdModal({ isOpen, onClose, onSubmit, initialData }: AdModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [rawImageSrc, setRawImageSrc] = useState("") // original src before crop
  const [showCropper, setShowCropper] = useState(false)
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
    setRawImageSrc("")
    setShowCropper(false)
    setErrors({})
  }, [initialData, isOpen])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(file.type)) {
      setErrors({ ...errors, image: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed." })
      return
    }
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setErrors({ ...errors, image: "File size too large. Maximum size is 5MB." })
      return
    }

    // Load raw image and open cropper
    const reader = new FileReader()
    reader.onloadend = () => {
      setRawImageSrc(reader.result as string)
      setShowCropper(true)
      setErrors({ ...errors, image: undefined })
    }
    reader.readAsDataURL(file)

    // Reset input so same file can be re-selected
    e.target.value = ""
  }

  const handleCropped = (file: File, preview: string) => {
    setImageFile(file)
    setImagePreview(preview)
    setRawImageSrc("")
    setShowCropper(false)
    setErrors({ ...errors, image: undefined })
  }

  const handleCropCancel = () => {
    setRawImageSrc("")
    setShowCropper(false)
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return image

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
    } catch {
      setErrors({ ...errors, image: "Failed to upload image" })
      return null
    } finally {
      setUploading(false)
    }
  }

  const validateForm = () => {
    const newErrors: { title?: string; description?: string; image?: string } = {}
    if (!title.trim()) newErrors.title = "Title is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!image && !imageFile) newErrors.image = "Image is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    let imageUrl = image
    if (imageFile) {
      const uploaded = await uploadImage()
      if (!uploaded) return
      imageUrl = uploaded
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      image: imageUrl,
      link: link.trim() || undefined,
      status,
    })

    setTitle(""); setDescription(""); setImage(""); setImageFile(null)
    setImagePreview(""); setLink(""); setStatus("Active")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text">{initialData ? "Edit Ad" : "Add New Ad"}</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface rounded-lg transition" aria-label="Close">
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${errors.title ? "border-danger" : "border-border"}`}
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
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none ${errors.description ? "border-danger" : "border-border"}`}
            />
            {errors.description && <p className="text-danger text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Image <span className="text-red-500">*</span>
              <span className="ml-2 text-xs text-gray-400 font-normal">(Will be cropped to square to fit the app)</span>
            </label>

            {/* Cropper UI */}
            {showCropper && rawImageSrc ? (
              <CropTool src={rawImageSrc} onCropped={handleCropped} onCancel={handleCropCancel} />
            ) : (
              <div className="space-y-2">
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-accent transition ${errors.image ? "border-danger" : "border-border"}`}
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  {imagePreview ? (
                    <div className="space-y-2">
                      {/* Show a strict square preview matching app display */}
                      <div className="mx-auto w-24 h-24 rounded-lg overflow-hidden border border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-gray-500">✓ Cropped &amp; ready — click to replace</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload image</p>
                      <p className="text-xs text-gray-400">JPEG, PNG, GIF, WebP (Max 5MB) — you will crop it next</p>
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
            )}
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

          {!showCropper && (
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
          )}
        </form>
      </div>
    </div>
  )
}

