"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Mail,
  Clock,
  ShieldCheck,
  UserX,
  FileText,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Car,
  Compass,
  PhoneCall,
  Send,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  category: "passenger" | "driver" | "account";
}

const FAQS: FAQItem[] = [
  {
    category: "passenger",
    question: "How do I book a ride with Qubi Ride?",
    answer:
      "Open the Qubi Ride passenger app, enter your destination in the search bar, select your preferred cab category (e.g. Standard, Comfort, or XL), check the upfront fare estimate, and tap 'Confirm Ride'. The nearest available driver will be assigned instantly.",
  },
  {
    category: "passenger",
    question: "How does live tracking work?",
    answer:
      "Once a driver accepts your trip request, you can see their real-time location on the map, their vehicle details (model and license plate number), and estimated time of arrival (ETA). You will also be notified when the driver arrives at your pickup spot.",
  },
  {
    category: "passenger",
    question: "What payment methods are supported?",
    answer:
      "Qubi Ride supports multiple convenient payment methods including Cash, UPI, Credit/Debit cards, and your in-app digital wallet. You can select your preferred payment mode before confirming your booking.",
  },
  {
    category: "passenger",
    question: "How do I apply promotional discount codes?",
    answer:
      "Before requesting your ride, tap the 'Promo Code' option on the booking summary screen, type your promo voucher code, and tap apply. The discount will immediately reflect in your final estimated fare.",
  },
  {
    category: "passenger",
    question: "What should I do if I forgot an item in a car?",
    answer:
      "If you left personal belongings in a vehicle, you can contact your driver directly from your trip history in the app within 24 hours. Alternatively, send an email to oscodesoftware@gmail.com with your trip date, time, and pickup/drop location, and our team will assist you in retrieving your item.",
  },
  {
    category: "passenger",
    question: "Can I cancel a ride, and will I be charged?",
    answer:
      "You can cancel a ride anytime through the app. If you cancel within the initial free cancellation window (usually 2–3 minutes after driver acceptance), no fee is charged. If cancelled after the driver has travelled significantly towards your pickup spot, a nominal cancellation fee may apply to compensate the driver for fuel and time.",
  },
  {
    category: "driver",
    question: "How do I sign up as a Qubi Captain driver partner?",
    answer:
      "Download the Qubi Captain app, register with your phone number, and upload required documents including your valid Commercial Driving License, Vehicle Registration (RC), Insurance, and vehicle photographs. Once verified by our onboarding team, your account will be activated.",
  },
  {
    category: "driver",
    question: "When and how do drivers receive their payouts?",
    answer:
      "Driver earnings are calculated in real time after every completed trip. Payouts can be transferred directly to your registered bank account or UPI ID on a daily or weekly schedule according to your payout preference.",
  },
  {
    category: "account",
    question: "How do I request account and personal data deletion?",
    answer: (
      <span>
        You can request permanent account deletion at any time by visiting our dedicated{" "}
        <Link href="/delete-account" className="text-cyan-700 underline font-semibold">
          Account &amp; Data Deletion Portal
        </Link>
        . Your profile, contact details, and location records will be verified and deleted within 7 to 30 days.
      </span>
    ),
  },
  {
    category: "account",
    question: "How is my personal and location information protected?",
    answer: (
      <span>
        We prioritize rider and driver privacy. Location data is only accessed when actively using the app for matching and navigation. For full details, please review our official{" "}
        <Link href="/privacy-policy" className="text-cyan-700 underline font-semibold">
          Privacy Policy
        </Link>
        .
      </span>
    ),
  },
];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"all" | "passenger" | "driver" | "account">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Passenger");
  const [category, setCategory] = useState("Ride & Booking");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filteredFaqs =
    activeTab === "all" ? FAQS : FAQS.filter((f) => f.category === activeTab);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({
        type: "error",
        text: "Please fill out your Name, Email Address, and Message.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          role,
          category,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: "success",
          text:
            data.message ||
            "Thank you! Your inquiry has been submitted. Our support team will get back to you within 24 hours.",
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus({
          type: "error",
          text: data.message || "Failed to submit inquiry. Please email us directly.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        text: "Network error occurred. Please check your connection or contact oscodesoftware@gmail.com directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Header */}
      <div>
        <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 text-white">
          <div className="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between border-b border-white/10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center font-black text-xl text-cyan-300">
                Q
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  Qubi Ride
                </span>
                <span className="text-xs text-cyan-300 block">Support Center</span>
              </div>
            </Link>

            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
              <Link href="/" className="text-white/80 hover:text-white transition">
                Home
              </Link>
              <Link href="/privacy-policy" className="text-white/80 hover:text-white transition hidden sm:inline">
                Privacy
              </Link>
              <Link href="/delete-account" className="text-white/80 hover:text-white transition hidden sm:inline">
                Delete Account
              </Link>
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition"
              >
                Admin Portal
              </Link>
            </nav>
          </div>

          {/* Hero Banner */}
          <div className="max-w-4xl mx-auto px-5 py-12 sm:py-16 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> 24/7 Dedicated Support
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              How Can We Help You?
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Find instant answers to common questions about Qubi Ride trips, driver earnings, account settings, and safety assistance.
            </p>
          </div>
        </header>

        {/* Quick Contact Info Cards */}
        <div className="max-w-6xl mx-auto px-5 -mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">Email Us</h2>
                <p className="text-xs text-slate-500 mb-2">Direct assistance for riders &amp; drivers</p>
                <a
                  href="mailto:oscodesoftware@gmail.com"
                  className="text-xs font-semibold text-cyan-700 hover:underline block break-all"
                >
                  oscodesoftware@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">Response Time</h2>
                <p className="text-xs text-slate-500 mb-2">Fast turnaround on support requests</p>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                  Within 24 Hours
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                <UserX className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">Account &amp; Data</h2>
                <p className="text-xs text-slate-500 mb-2">Request removal of your profile</p>
                <Link
                  href="/delete-account"
                  className="text-xs font-semibold text-rose-700 hover:underline inline-flex items-center gap-1"
                >
                  Account Deletion Portal &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: FAQs + Contact Form */}
        <main className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: FAQs */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-slate-600">
                  Quick answers to help you navigate bookings, payments, and account services.
                </p>

                {/* FAQ Filter Tabs */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { id: "all", label: "All Questions" },
                    { id: "passenger", label: "Passengers" },
                    { id: "driver", label: "Drivers (Captain)" },
                    { id: "account", label: "Account & Safety" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as typeof activeTab);
                        setOpenFaq(null);
                      }}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-cyan-700 text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accordion List */}
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden transition shadow-2xs"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm hover:bg-slate-50/70 transition cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-cyan-700" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Safety & Emergency Notice */}
              <div className="mt-8 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-900 mb-1">
                    Emergency &amp; Ride Safety
                  </h3>
                  <p className="text-xs text-amber-800/90 leading-relaxed">
                    If you are experiencing an immediate physical emergency or threat during a trip, please contact your local law enforcement emergency services (such as 112/911) immediately. You can also trigger the in-app SOS button to share your real-time GPS location with your emergency contacts.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Inquiry Form */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs sticky top-6">
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 block mb-1">
                    Direct Assistance
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Send a Support Inquiry
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Can&apos;t find what you are looking for? Send us a message and our team will get back to you promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. you@example.com"
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        I am a
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      >
                        <option value="Passenger">Passenger</option>
                        <option value="Driver Partner">Driver (Captain)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Topic
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      >
                        <option value="Ride & Booking">Ride &amp; Booking</option>
                        <option value="Payment & Refunds">Payment &amp; Refund</option>
                        <option value="Account Issue">Account Issue</option>
                        <option value="Safety & Security">Safety Concern</option>
                        <option value="Driver Onboarding">Driver Onboarding</option>
                        <option value="General Feedback">Feedback / Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your issue, trip details, or question..."
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-cyan-700 hover:bg-cyan-800 disabled:opacity-60 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    {submitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Support Request
                      </>
                    )}
                  </button>

                  {status && (
                    <div
                      role="status"
                      className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 border ${
                        status.type === "success"
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                          : "bg-rose-50 border-rose-300 text-rose-900"
                      }`}
                    >
                      {status.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <span>{status.text}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-sm mt-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center font-bold text-white text-base">
                Q
              </div>
              <div>
                <p className="font-bold text-white text-sm">Qubi Ride</p>
                <p className="text-slate-500">Operated by Oscode Software</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <Link href="/support" className="text-white hover:text-white transition">
                Support
              </Link>
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/delete-account" className="hover:text-white transition">
                Account Deletion
              </Link>
              <Link href="/login" className="hover:text-white transition">
                Admin Portal
              </Link>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Qubi Ride / Oscode Software. All rights reserved.</p>
            <p>
              Support:{" "}
              <a href="mailto:oscodesoftware@gmail.com" className="text-cyan-400 hover:underline">
                oscodesoftware@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
