"use client";

import Link from "next/link";
import { useAuth } from "@/app/providers";
import {
  MapPin,
  Shield,
  Clock,
  CreditCard,
  Percent,
  Headphones,
  Car,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  ChevronRight,
  Lock,
  Compass,
} from "lucide-react";

export default function MarketingHomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center font-black text-xl text-cyan-400 group-hover:scale-105 transition">
              Q
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block">
                Qubi Ride
              </span>
              <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-semibold block">
                Passenger &amp; Captain
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>
            <a href="#captains" className="hover:text-white transition">
              Drive With Us
            </a>
            <Link href="/support" className="hover:text-white transition">
              Help &amp; Support
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/support"
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 transition"
            >
              Support
            </Link>

            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center gap-1.5 shadow-sm"
              >
                Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-slate-300" /> Admin Portal
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.15),transparent_60%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 shadow-xs">
                <Car className="w-3.5 h-3.5" /> Fast, Reliable &amp; Affordable Rides
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                The Smarter Way to <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  Travel in Your City
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Book rides in seconds, track your verified driver in real time, and enjoy transparent, upfront pricing. Whether commuting daily or catching a flight, Qubi Ride gets you there safely.
              </p>

              {/* App Download Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-md hover:border-cyan-400/50 transition">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                  <div className="text-left">
                    <span className="text-[10px] uppercase text-slate-400 block font-medium">Download on the</span>
                    <span className="text-sm font-bold text-white block">Apple App Store</span>
                  </div>
                </div>

                <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-md hover:border-cyan-400/50 transition">
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                  <div className="text-left">
                    <span className="text-[10px] uppercase text-slate-400 block font-medium">Get it on</span>
                    <span className="text-sm font-bold text-white block">Google Play</span>
                  </div>
                </div>

                <Link
                  href="/support"
                  className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-600/30"
                >
                  Get Help / Contact <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 100% Verified Drivers
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Live GPS Tracking
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 24/7 Passenger Support
                </span>
              </div>
            </div>

            {/* Hero App Mockup / Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
                      QR
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Ride Summary</p>
                      <p className="text-[10px] text-cyan-300">Driver Arriving in 3 mins</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Trip
                  </span>
                </div>

                {/* Simulated Trip Route */}
                <div className="space-y-3 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 mt-1 shrink-0 ring-4 ring-cyan-500/20" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Pickup Location</p>
                      <p className="font-semibold text-slate-200">Terminal 2, Airport Road</p>
                    </div>
                  </div>
                  <div className="border-l-2 border-dashed border-slate-700 ml-1.5 h-4" />
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-400 mt-1 shrink-0 ring-4 ring-rose-500/20" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Drop-off Destination</p>
                      <p className="font-semibold text-slate-200">City Financial District, Center</p>
                    </div>
                  </div>
                </div>

                {/* Ride Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                    <p className="text-[10px] text-slate-400">Distance</p>
                    <p className="text-xs font-bold text-white mt-0.5">14.2 km</p>
                  </div>
                  <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                    <p className="text-[10px] text-slate-400">Estimated</p>
                    <p className="text-xs font-bold text-white mt-0.5">22 mins</p>
                  </div>
                  <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                    <p className="text-[10px] text-slate-400">Fare</p>
                    <p className="text-xs font-bold text-cyan-400 mt-0.5">Fixed Rate</p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-slate-400">
                    Verified Driver &bull; SOS &amp; Share Trip Enabled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 block mb-2">
              Why Choose Qubi Ride
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Designed for Convenience, Built for Safety
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Everything you need for a comfortable commute across your city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Real-Time GPS Tracking</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Watch your driver approach on the live map with accurate turn-by-turn ETA calculations. Share live trip status with family.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Verified Drivers &amp; SOS</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                All drivers undergo rigorous background checks and document verification. Emergency SOS assistance is integrated into every trip.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Upfront, Honest Pricing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Know your fare before you step into the car. Pay seamlessly via UPI, credit/debit cards, digital wallet, or cash.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Promo Codes &amp; Savings</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enjoy regular discounts, referral vouchers, and promotional deals to keep your daily travel affordable and cost-effective.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Instant Pickup Matching</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our smart dispatch algorithm matches you with the nearest captain within seconds, drastically cutting your waiting time.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-5">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">24/7 Dedicated Support</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Need help with a lost item, fare dispute, or feedback? Our dedicated support team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 block mb-2">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How to Ride with Qubi Ride
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 relative">
              <span className="w-10 h-10 rounded-xl bg-cyan-700 text-white font-extrabold text-lg flex items-center justify-center mb-5 shadow-xs">
                1
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Set Your Route</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Open the app, enter your destination, select your preferred cab category, and review the upfront fare estimate.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 relative">
              <span className="w-10 h-10 rounded-xl bg-cyan-700 text-white font-extrabold text-lg flex items-center justify-center mb-5 shadow-xs">
                2
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Meet Your Captain</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track your driver live on the map, confirm the license plate and vehicle details, and hop in safely at your pickup point.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 relative">
              <span className="w-10 h-10 rounded-xl bg-cyan-700 text-white font-extrabold text-lg flex items-center justify-center mb-5 shadow-xs">
                3
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Enjoy &amp; Pay Easily</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sit back and relax during your trip. Complete payment effortlessly via UPI, card, wallet, or cash, and rate your driver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Partners (Qubi Captain) CTA Section */}
      <section id="captains" className="py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 text-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-300 border border-white/20">
                Partner Opportunity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Become a Qubi Captain &amp; Drive on Your Terms
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Join our driver partner network. Earn competitive rates, enjoy low commission, receive timely payouts to your bank account, and get 24/7 partner support.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/support"
                  className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition shadow-md shadow-cyan-600/30"
                >
                  Learn About Driver Registration
                </Link>
                <Link
                  href="/privacy-policy"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition"
                >
                  Driver Privacy Policy
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-base font-bold text-white mb-3">Captain Partner Benefits</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Flexible working hours
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Transparent trip commission
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Direct bank &amp; UPI payouts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Verified rider community
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Help Banner */}
      <section className="py-14 bg-slate-100 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Need Assistance or Have Questions?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Visit our comprehensive Support Center or submit a direct inquiry to our customer care team.
            </p>
          </div>
          <Link
            href="/support"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition flex items-center gap-2 shrink-0 shadow-sm"
          >
            Visit Support Center <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center font-bold text-white text-sm">
                  Q
                </div>
                <span className="font-bold text-white text-base">Qubi Ride</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Reliable on-demand cab and ride-sharing service operated by Oscode Software.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="hover:text-white transition">Features</a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
                </li>
                <li>
                  <a href="#captains" className="hover:text-white transition">Driver Partners</a>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition">Support Center</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Legal &amp; Privacy</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/delete-account" className="hover:text-white transition">Account &amp; Data Deletion</Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition">Safety Standards</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Contact Support</h4>
              <p className="text-slate-400 mb-2">Available 24/7 for customer and partner queries.</p>
              <a
                href="mailto:oscodesoftware@gmail.com"
                className="text-cyan-400 hover:underline block break-all font-semibold"
              >
                oscodesoftware@gmail.com
              </a>
              <div className="pt-3">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition"
                >
                  <Lock className="w-3 h-3" /> Staff / Admin Login
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Qubi Ride / Oscode Software. All rights reserved.</p>
            <p>Support URL: <Link href="/support" className="text-cyan-400 hover:underline">qubiride.com/support</Link></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
