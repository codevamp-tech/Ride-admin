"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function DeleteAccountPage() {
  const [identifier, setIdentifier] = useState("");
  const [fullName, setFullName] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!identifier.trim() || !fullName.trim()) {
      setStatus({
        type: "error",
        text: "Please enter your registered phone number or email address and full name.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/delete-account-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: identifier.trim(),
          fullName: fullName.trim(),
          reason: reason.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          text:
            data.message ||
            "Your account deletion request has been received. Our team will verify and process it within 7 to 30 days.",
        });
        setIdentifier("");
        setFullName("");
        setReason("");
        setConfirmed(false);
      } else {
        setStatus({
          type: "error",
          text: data.message || "Unable to submit request. Please email oscodesoftware@gmail.com directly.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        text: "Network error. Please email oscodesoftware@gmail.com to complete your deletion request.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-800 text-white pt-7 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center font-extrabold text-lg">
              QC
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
                Qubi Captain — Account &amp; Data Deletion
              </h1>
              <p className="text-sm text-white/80">
                Driver Partner Application &bull; Qubi Ride / Oscode Software
              </p>
            </div>
          </div>

          <nav
            className="flex gap-2 border-b border-white/20 overflow-x-auto"
            aria-label="Legal Navigation"
          >
            <Link
              href="/privacy-policy"
              className="px-4 py-3 text-sm font-semibold text-white/80 hover:text-white border-b-2 border-transparent whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link
              href="/delete-account"
              className="px-4 py-3 text-sm font-semibold text-white border-b-2 border-sky-400 whitespace-nowrap"
            >
              Account &amp; Data Deletion
            </Link>
            <Link
              href="/privacy-policy#contact"
              className="px-4 py-3 text-sm font-semibold text-white/80 hover:text-white border-b-2 border-transparent whitespace-nowrap"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-7 space-y-5">
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
            Option 1: Delete Directly Inside the Qubi Captain App (Instant)
          </h2>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-600">
            <li>Open the <strong className="text-slate-900">Qubi Captain</strong> app and sign in.</li>
            <li>Tap the <strong className="text-slate-900">Profile</strong> tab in the bottom navigation bar.</li>
            <li>Scroll to the bottom and tap <strong className="text-slate-900">Delete Account</strong>.</li>
            <li>Confirm the prompt to permanently remove your driver account.</li>
          </ol>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            Option 2: Request Account &amp; Data Deletion Online
          </h2>
          <p className="text-sm text-slate-600 mb-5">
            If you no longer have access to the Qubi Captain app, submit the form below (or email{" "}
            <a href="mailto:oscodesoftware@gmail.com" className="text-cyan-700 underline">
              oscodesoftware@gmail.com
            </a>
            ). Our team will verify your identity and process deletion within{" "}
            <strong className="text-slate-900">7 to 30 days</strong>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-sm font-semibold text-slate-900 mb-1.5">
                Registered Phone Number or Email Address *
              </label>
              <input
                id="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g., +91 9876543210 or captain@example.com"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-slate-900 mb-1.5">
                Full Name (as registered on Qubi Captain) *
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-semibold text-slate-900 mb-1.5">
                Reason for Deletion (Optional)
              </label>
              <textarea
                id="reason"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Optional feedback or additional details to locate your account..."
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </div>

            <label className="flex items-start gap-2.5 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1"
              />
              <span>
                I understand that deleting my Qubi Captain account is permanent and cannot be undone.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              {submitting ? "Submitting..." : "Submit Account Deletion Request"}
            </button>

            {status && (
              <div
                role="status"
                className={`p-3.5 rounded-xl text-sm border ${
                  status.type === "success"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-red-50 border-red-300 text-red-900"
                }`}
              >
                {status.text}
              </div>
            )}
          </form>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
            What Data Is Deleted vs. Retained
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
            <li>
              <strong className="text-slate-900">Deleted Immediately / Upon Verification:</strong>{" "}
              Your driver profile, full name, phone number, email, residential address, date of
              birth, login credentials, push notification tokens, saved live/manual GPS location,
              vehicle registration details, bank payout details, and uploaded profile/license photos.
            </li>
            <li>
              <strong className="text-slate-900">Retained Only Where Legally Required:</strong>{" "}
              Completed trip invoices, wallet payout settlements, and tax/accounting records may be
              retained in minimal form strictly for the statutory period required by applicable
              financial, tax, or fraud-prevention laws, after which they are securely deleted or
              anonymized.
            </li>
          </ul>
        </section>
      </main>

      <footer className="text-center text-xs text-slate-500 py-6 px-4">
        &copy; 2026 Qubi Ride / Oscode Software. All rights reserved. &bull;{" "}
        <Link href="/privacy-policy" className="text-cyan-700 hover:underline">Privacy Policy</Link>{" "}
        &bull;{" "}
        <Link href="/delete-account" className="text-cyan-700 hover:underline">Account &amp; Data Deletion</Link>
      </footer>
    </div>
  );
}
