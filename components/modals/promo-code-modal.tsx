"use client";

import { useState, useEffect } from "react";
import { X, Tag, Percent, DollarSign, Calendar, Users, AlertCircle } from "lucide-react";

interface PromoCode {
  _id?: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number | string;
  minOrderAmount?: number | string;
  maxDiscountAmount?: number | string;
  usageLimit?: number | string;
  expiryDate?: string;
  status: "Active" | "Inactive";
}

interface PromoCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PromoCode) => Promise<void>;
  initialData?: PromoCode | null;
}

export function PromoCodeModal({ isOpen, onClose, onSubmit, initialData }: PromoCodeModalProps) {
  const [form, setForm] = useState<PromoCode>({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    usageLimit: "",
    expiryDate: "",
    status: "Active",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PromoCode, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          ...initialData,
          discountValue: initialData.discountValue ?? "",
          minOrderAmount: initialData.minOrderAmount ?? "",
          maxDiscountAmount: initialData.maxDiscountAmount ?? "",
          usageLimit: initialData.usageLimit ?? "",
          expiryDate: initialData.expiryDate
            ? new Date(initialData.expiryDate).toISOString().split("T")[0]
            : "",
        });
      } else {
        setForm({
          code: "",
          description: "",
          discountType: "percentage",
          discountValue: "",
          minOrderAmount: "",
          maxDiscountAmount: "",
          usageLimit: "",
          expiryDate: "",
          status: "Active",
        });
      }
      setErrors({});
      setApiError("");
    }
  }, [isOpen, initialData]);

  const set = (key: keyof PromoCode, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof PromoCode, string>> = {};
    if (!form.code.trim()) errs.code = "Promo code is required";
    else if (!/^[A-Za-z0-9_-]+$/.test(form.code.trim()))
      errs.code = "Only letters, numbers, dashes, and underscores allowed";

    if (!form.description.trim()) errs.description = "Description is required";

    if (form.discountValue === "" || form.discountValue === undefined)
      errs.discountValue = "Discount value is required";
    else if (Number(form.discountValue) <= 0)
      errs.discountValue = "Must be greater than 0";
    else if (form.discountType === "percentage" && Number(form.discountValue) > 100)
      errs.discountValue = "Percentage cannot exceed 100";

    if (form.minOrderAmount !== "" && Number(form.minOrderAmount) < 0)
      errs.minOrderAmount = "Cannot be negative";

    if (form.maxDiscountAmount !== "" && Number(form.maxDiscountAmount) <= 0)
      errs.maxDiscountAmount = "Must be greater than 0";

    if (form.usageLimit !== "" && Number(form.usageLimit) <= 0)
      errs.usageLimit = "Must be greater than 0";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError("");
    try {
      const payload: PromoCode = {
        ...form,
        code: form.code.toUpperCase().trim(),
        discountValue: Number(form.discountValue),
        minOrderAmount: form.minOrderAmount !== "" ? Number(form.minOrderAmount) : undefined,
        maxDiscountAmount: form.maxDiscountAmount !== "" ? Number(form.maxDiscountAmount) : undefined,
        usageLimit: form.usageLimit !== "" ? Number(form.usageLimit) : undefined,
        expiryDate: form.expiryDate || undefined,
      };
      await onSubmit(payload);
    } catch (err: any) {
      setApiError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = (field: keyof PromoCode) =>
    `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm transition ${
      errors[field] ? "border-red-400 focus:ring-red-400 bg-red-50" : "border-border focus:border-accent"
    }`;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
              <Tag className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">
                {initialData ? "Edit Promo Code" : "New Promo Code"}
              </h2>
              <p className="text-xs text-text-light">
                {initialData ? "Update the promo code details" : "Create a new discount code"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-surface rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-text-light" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* API Error Banner */}
          {apiError && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {apiError}
            </div>
          )}

          {/* Promo Code */}
          <div>
            <label className="block text-sm font-semibold text-text mb-1.5">
              Promo Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={form.code}
                onChange={(e) => set("code", e.target.value.toUpperCase())}
                placeholder="e.g. SUMMER25"
                className={`${inputClass("code")} pl-9 font-mono tracking-widest`}
              />
            </div>
            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-text mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Brief description of this promo offer"
              rows={2}
              className={`${inputClass("description")} resize-none`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Discount Type + Value (side-by-side) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-1.5">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.discountType}
                onChange={(e) => set("discountType", e.target.value)}
                className={inputClass("discountType")}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-1.5">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                {form.discountType === "percentage" ? (
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                ) : (
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                )}
                <input
                  type="number"
                  min="0"
                  max={form.discountType === "percentage" ? 100 : undefined}
                  value={form.discountValue}
                  onChange={(e) => set("discountValue", e.target.value)}
                  placeholder={form.discountType === "percentage" ? "e.g. 20" : "e.g. 50"}
                  className={`${inputClass("discountValue")} pl-9`}
                />
              </div>
              {errors.discountValue && (
                <p className="text-red-500 text-xs mt-1">{errors.discountValue}</p>
              )}
            </div>
          </div>

          {/* Min Order Amount + Max Discount Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-1.5">
                Min Order Amount
                <span className="text-gray-400 font-normal ml-1 text-xs">(Optional)</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.minOrderAmount}
                onChange={(e) => set("minOrderAmount", e.target.value)}
                placeholder="e.g. 100"
                className={inputClass("minOrderAmount")}
              />
              {errors.minOrderAmount && (
                <p className="text-red-500 text-xs mt-1">{errors.minOrderAmount}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-1.5">
                Max Discount Cap
                <span className="text-gray-400 font-normal ml-1 text-xs">(Optional)</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.maxDiscountAmount}
                onChange={(e) => set("maxDiscountAmount", e.target.value)}
                placeholder="e.g. 200"
                className={inputClass("maxDiscountAmount")}
              />
              {errors.maxDiscountAmount && (
                <p className="text-red-500 text-xs mt-1">{errors.maxDiscountAmount}</p>
              )}
            </div>
          </div>

          {/* Usage Limit + Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Usage Limit
                  <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                </span>
              </label>
              <input
                type="number"
                min="1"
                value={form.usageLimit}
                onChange={(e) => set("usageLimit", e.target.value)}
                placeholder="e.g. 500"
                className={inputClass("usageLimit")}
              />
              {errors.usageLimit && (
                <p className="text-red-500 text-xs mt-1">{errors.usageLimit}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Expiry Date
                  <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                </span>
              </label>
              <input
                type="date"
                value={form.expiryDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => set("expiryDate", e.target.value)}
                className={inputClass("expiryDate")}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-text mb-1.5">Status</label>
            <div className="flex gap-3">
              {(["Active", "Inactive"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("status", s)}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition ${
                    form.status === s
                      ? s === "Active"
                        ? "bg-green-500 border-green-500 text-white shadow-sm"
                        : "bg-gray-500 border-gray-500 text-white shadow-sm"
                      : "border-border text-text-light hover:border-accent hover:text-accent"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-2.5 border border-border rounded-lg text-text text-sm font-medium hover:bg-surface transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 bg-accent hover:bg-accent-light text-slate-900 rounded-lg text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? initialData
                  ? "Updating..."
                  : "Creating..."
                : initialData
                ? "Update Code"
                : "Create Code"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
