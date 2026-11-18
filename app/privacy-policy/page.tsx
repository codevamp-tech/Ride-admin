import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Qubi Captain",
  description:
    "Official Google Play Store compliant Privacy Policy for Qubi Captain (com.qubidriver), operated by Qubi Ride / Oscode Software.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header & Navigation Tabs */}
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-800 text-white pt-7 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center font-extrabold text-lg">
                QC
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
                  Qubi Captain — Privacy Policy
                </h1>
                <p className="text-sm text-white/80">
                  Driver Partner Application &bull; Qubi Ride / Oscode Software
                </p>
              </div>
            </div>
            <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-white/15 border border-white/25">
              Effective Date: November 18, 2026
            </span>
          </div>

          <nav
            className="flex gap-2 border-b border-white/20 overflow-x-auto"
            aria-label="Legal Navigation"
          >
            <Link
              href="/privacy-policy"
              className="px-4 py-3 text-sm font-semibold text-white border-b-2 border-sky-400 whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link
              href="/delete-account"
              className="px-4 py-3 text-sm font-semibold text-white/80 hover:text-white border-b-2 border-transparent whitespace-nowrap"
            >
              Account &amp; Data Deletion
            </Link>
            <a
              href="#contact"
              className="px-4 py-3 text-sm font-semibold text-white/80 hover:text-white border-b-2 border-transparent whitespace-nowrap"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-5 py-7 space-y-5">
        {/* Intro Card */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
            This Privacy Policy explains how <strong className="text-slate-900">Qubi Ride</strong>{" "}
            (operated by <strong className="text-slate-900">Oscode Software</strong>, referred to as
            &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, stores, shares, and
            protects personal information when you use the{" "}
            <strong className="text-slate-900">Qubi Captain</strong> mobile application (Android
            package: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">com.qubidriver</code>
            ; iOS bundle:{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">
              com.mohammadosama.qubidriver
            </code>
            ) and related backend services.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            By registering as a driver partner (&quot;Captain&quot;) or using the Qubi Captain app,
            you acknowledge that you have read and understood this Privacy Policy. If you do not
            agree with our practices, please do not use the application.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-200 text-sm">
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Application Name
              </span>
              <span className="font-semibold text-slate-900">Qubi Captain</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Android Package ID
              </span>
              <code className="text-xs font-semibold text-slate-900">com.qubidriver</code>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Developer / Operator
              </span>
              <span className="font-semibold text-slate-900">Qubi Ride (Oscode Software)</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Privacy Contact
              </span>
              <a
                href="mailto:oscodesoftware@gmail.com"
                className="font-semibold text-cyan-700 hover:underline break-all"
              >
                oscodesoftware@gmail.com
              </a>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 mt-6 mb-2">Quick Navigation</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1.5 text-sm">
            <li><a href="#information-we-collect" className="text-cyan-700 hover:underline">1. Information We Collect</a></li>
            <li><a href="#location-disclosure" className="text-cyan-700 hover:underline">2. Location &amp; Background Location</a></li>
            <li><a href="#permissions" className="text-cyan-700 hover:underline">3. Device Permissions</a></li>
            <li><a href="#how-we-use" className="text-cyan-700 hover:underline">4. How We Use Information</a></li>
            <li><a href="#data-sharing" className="text-cyan-700 hover:underline">5. Data Sharing &amp; Third Parties</a></li>
            <li><a href="#data-safety" className="text-cyan-700 hover:underline">6. Google Play Data Safety</a></li>
            <li><a href="#security-retention" className="text-cyan-700 hover:underline">7. Data Security &amp; Retention</a></li>
            <li><a href="#account-deletion" className="text-cyan-700 hover:underline">8. Account &amp; Data Deletion</a></li>
            <li><a href="#your-rights" className="text-cyan-700 hover:underline">9. Your Privacy Rights</a></li>
            <li><a href="#children" className="text-cyan-700 hover:underline">10. Children&apos;s Privacy (18+)</a></li>
            <li><a href="#changes" className="text-cyan-700 hover:underline">11. Policy Changes</a></li>
            <li><a href="#contact" className="text-cyan-700 hover:underline">12. Contact Us</a></li>
          </ul>
        </section>

        {/* Section 1 */}
        <section id="information-we-collect" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">1</span>
            Information We Collect
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-4">
            To verify your identity as a licensed driver, connect you with nearby passengers, enable
            real-time trip navigation, and process earnings payouts, Qubi Captain collects the
            following categories of data:
          </p>

          <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-4 mb-1.5">A. Personal &amp; Account Information</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">Identity &amp; Contact Details:</strong> Full name, mobile phone number, email address, date of birth, and registered residential address.</li>
            <li><strong className="text-slate-900">Authentication Data:</strong> One-Time Passwords (OTPs) sent via SMS or email, or authentication tokens when you sign in using Google Sign-In or Apple Sign-In.</li>
            <li><strong className="text-slate-900">Profile Photograph:</strong> A driver selfie / profile photo used to verify your identity and display your profile to assigned passengers for safety.</li>
          </ul>

          <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-4 mb-1.5">B. Government ID &amp; Driver Verification (KYC) Documents</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">Driving License Information:</strong> Driving license number, expiry date, issuing state, and uploaded front and back photographs of your driving license.</li>
            <li><strong className="text-slate-900">Vehicle Information:</strong> Vehicle type, model, manufacturing year, vehicle color, license plate number, and Registration Certificate (RC) number.</li>
          </ul>

          <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-4 mb-1.5">C. Financial &amp; Payout Information</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">Bank Account Details:</strong> Bank name, account holder name, bank account number, and IFSC code used solely to settle your ride earnings and wallet payouts.</li>
            <li><strong className="text-slate-900">Earnings &amp; Transaction History:</strong> Completed trip fares, driver wallet balance, payout references, and payment confirmation records.</li>
          </ul>

          <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-4 mb-1.5">D. Location &amp; Trip Activity Data</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">Precise GPS Location:</strong> Real-time latitude, longitude, heading, and timestamps when you are online or on an active trip, plus an optional manual location address and search radius setting.</li>
            <li><strong className="text-slate-900">Trip &amp; Ride Records:</strong> Accepted, published, shared, started, completed, or cancelled ride details, pickup and drop-off points, timestamps, and fare calculations.</li>
          </ul>

          <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-4 mb-1.5">E. Device &amp; Notification Identifiers</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">Push Notification Tokens:</strong> Expo / Firebase push tokens so we can alert you immediately of new ride bookings, trip status updates, and payment confirmations.</li>
            <li><strong className="text-slate-900">Technical Diagnostics:</strong> Basic connection logs (such as real-time online/offline status) required to maintain reliable ride dispatch.</li>
          </ul>
        </section>

        {/* Section 2: Google Play Background Location Disclosure */}
        <section id="location-disclosure" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">2</span>
            Location Data &amp; Background Location Disclosure
          </h2>

          <div className="bg-amber-50 border border-amber-300 border-l-4 border-l-amber-500 rounded-xl p-4 sm:p-5 my-4 space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-wide text-amber-900">
              Prominent Background Location Disclosure (Google Play Compliance)
            </div>
            <p className="text-sm text-amber-950 leading-relaxed">
              <strong>
                Qubi Captain collects precise location data (GPS coordinates and heading) even when
                the app is closed or not in use
              </strong>{" "}
              while your Captain status is set to <strong>Online</strong> or while you are on an{" "}
              <strong>active trip</strong>.
            </p>
            <p className="text-sm text-amber-950 leading-relaxed">
              This background location access is strictly required to: (1) match you with nearby
              passenger ride requests, (2) share your real-time live location with your assigned
              passenger for pickup and trip safety, (3) enable turn-by-turn navigation while you
              switch to external navigation apps, and (4) calculate accurate trip distance and fares.
            </p>
            <p className="text-sm text-amber-950 leading-relaxed">
              We do <strong>not</strong> use background location data for advertising. You can stop
              background location tracking at any time by switching your status to{" "}
              <strong>Offline</strong> in the app or by revoking location permission in your device
              Settings.
            </p>
          </div>

          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li>
              <strong className="text-slate-900">Foreground Location (<code>ACCESS_FINE_LOCATION</code>, <code>ACCESS_COARSE_LOCATION</code>):</strong>{" "}
              Used when the app is open to display your current position on the map, discover nearby ride requests, and navigate to pickup and drop-off points.
            </li>
            <li>
              <strong className="text-slate-900">Background Location (<code>ACCESS_BACKGROUND_LOCATION</code>):</strong>{" "}
              Active only when you have explicitly granted background location permission and are online or completing a ride.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section id="permissions" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">3</span>
            Device Permissions Requested
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-3">
            Qubi Captain requests only the device permissions necessary for core driver functionality:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">Location (Foreground &amp; Background):</strong> Required for ride matching, live trip tracking, and navigation.</li>
            <li><strong className="text-slate-900">Camera:</strong> Used solely when you choose to take a profile photo or capture front/back photos of your driving license for verification.</li>
            <li><strong className="text-slate-900">Photos / Media Library:</strong> Used solely when you select an existing profile photo or driving license image from your gallery to upload. We do not scan or access unrelated media files.</li>
            <li><strong className="text-slate-900">Notifications:</strong> Used to deliver real-time ride requests, booking alerts, trip updates, and payout notifications.</li>
            <li><strong className="text-slate-900">Internet &amp; Network Access:</strong> Required to communicate securely with Qubi Ride servers, maps, and payment services.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="how-we-use" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">4</span>
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">Driver Onboarding &amp; Verification:</strong> To review your driving license, profile photo, and vehicle registration before approving your Captain account.</li>
            <li><strong className="text-slate-900">Ride Matching &amp; Real-Time Dispatch:</strong> To connect online Captains with nearby passengers and broadcast live ride updates.</li>
            <li><strong className="text-slate-900">Safety &amp; Fraud Prevention:</strong> To verify driver identity, monitor active trips, prevent unauthorized access, and protect both passengers and drivers.</li>
            <li><strong className="text-slate-900">Earnings &amp; Payouts:</strong> To calculate ride fares, maintain your Captain wallet, and disburse earnings to your registered bank account.</li>
            <li><strong className="text-slate-900">Customer Support &amp; Communications:</strong> To send login OTPs, respond to support requests, and notify you of important account or policy updates.</li>
            <li><strong className="text-slate-900">Legal Compliance:</strong> To comply with applicable transportation, tax, accounting, and law enforcement obligations.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="data-sharing" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">5</span>
            Data Sharing &amp; Third-Party Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-3">
            <strong className="text-slate-900">
              We do not sell, rent, or trade your personal information to third parties or data brokers.
            </strong>{" "}
            We share information only in the limited circumstances below:
          </p>

          <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-4 mb-1.5">A. Sharing with Passengers During Active Rides</h3>
          <p className="text-sm text-slate-600">
            When you accept a ride request, Qubi Ride shares limited details with the assigned passenger
            so they can identify you and coordinate pickup safely: your{" "}
            <strong className="text-slate-900">
              full name, driver profile photo, phone number, vehicle model, vehicle color, license
              plate number, and live GPS location
            </strong>{" "}
            during the active trip.
          </p>

          <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-4 mb-1.5">B. Trusted Third-Party Service Providers &amp; SDKs</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li>
              <strong className="text-slate-900">Google Maps Platform &amp; Google Sign-In</strong>{" "}
              (map rendering, directions, geocoding, OAuth login) —{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong className="text-slate-900">Google Firebase &amp; Expo Push Services</strong>{" "}
              (authentication and push notification delivery) —{" "}
              <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
                Firebase Privacy
              </a>{" "}
              &bull;{" "}
              <a href="https://expo.dev/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
                Expo Privacy Policy
              </a>
            </li>
            <li>
              <strong className="text-slate-900">Razorpay / RazorpayX</strong> (payment verification
              and automated IMPS bank payouts) —{" "}
              <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
                Razorpay Privacy Policy
              </a>
            </li>
            <li>
              <strong className="text-slate-900">Amazon Web Services (AWS S3 &amp; SNS)</strong>{" "}
              (cloud storage for uploaded verification/profile photos and transactional SMS) —{" "}
              <a href="https://aws.amazon.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
                AWS Privacy Notice
              </a>
            </li>
            <li>
              <strong className="text-slate-900">SMS Bits &amp; Brevo</strong> (transactional SMS
              and email OTP delivery for account login) —{" "}
              <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
                Brevo Privacy Policy
              </a>
            </li>
          </ul>

          <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-4 mb-1.5">C. Legal &amp; Regulatory Requirements</h3>
          <p className="text-sm text-slate-600">
            We may disclose information if required by law, subpoena, court order, or valid
            governmental request, or when necessary to protect the safety, rights, or property of
            Qubi Ride, our Captains, passengers, or the public.
          </p>
        </section>

        {/* Section 6 */}
        <section id="data-safety" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">6</span>
            Google Play Data Safety Summary
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-xl mt-3">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800 text-xs uppercase tracking-wider">
                  <th className="p-3 border-b border-slate-200">Data Category</th>
                  <th className="p-3 border-b border-slate-200">Examples Collected</th>
                  <th className="p-3 border-b border-slate-200">Purpose</th>
                  <th className="p-3 border-b border-slate-200">Shared With</th>
                  <th className="p-3 border-b border-slate-200">Sold?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Personal Info</td>
                  <td className="p-3">Name, email, phone, DOB, address, driving license &amp; vehicle details</td>
                  <td className="p-3">Account management, KYC verification, safety, support</td>
                  <td className="p-3">Assigned passengers (name, phone, vehicle only)</td>
                  <td className="p-3">No</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Location</td>
                  <td className="p-3">Precise foreground &amp; background GPS location</td>
                  <td className="p-3">Ride dispatch, navigation, live trip tracking, fare calculation</td>
                  <td className="p-3">Assigned passengers during active rides; Google Maps</td>
                  <td className="p-3">No</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Financial Info</td>
                  <td className="p-3">Bank account number, IFSC, bank name, wallet &amp; payout records</td>
                  <td className="p-3">Driver earnings &amp; bank payouts</td>
                  <td className="p-3">Razorpay / RazorpayX (payout processing)</td>
                  <td className="p-3">No</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Photos &amp; Videos</td>
                  <td className="p-3">Driver profile selfie, driving license front &amp; back photos</td>
                  <td className="p-3">Driver identity verification &amp; profile display</td>
                  <td className="p-3">AWS S3 (storage); assigned passengers (profile photo only)</td>
                  <td className="p-3">No</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Device or Other IDs</td>
                  <td className="p-3">Expo / FCM push notification token, auth tokens</td>
                  <td className="p-3">Push alerts, real-time ride notifications, login security</td>
                  <td className="p-3">Expo / Firebase (notification delivery)</td>
                  <td className="p-3">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7 */}
        <section id="security-retention" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">7</span>
            Data Security &amp; Retention
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">Security Measures:</strong> We implement administrative, technical, and physical safeguards including HTTPS/TLS encryption, JWT-based authentication, bcrypt password hashing, access-controlled AWS S3 storage, and role-based admin controls.</li>
            <li><strong className="text-slate-900">Retention Period:</strong> We retain your personal, vehicle, and KYC information for as long as your Qubi Captain account remains active or as needed to provide services.</li>
            <li><strong className="text-slate-900">Statutory Retention:</strong> Upon account deletion, active profile and credentials are removed. Minimal transaction, payout, or trip records may be retained strictly for the statutory period required under applicable tax, accounting, or fraud-prevention laws, after which they are securely deleted or anonymized.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section id="account-deletion" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">8</span>
            Account &amp; Data Deletion
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600">
            <li><strong className="text-slate-900">In-App Deletion (Immediate):</strong> Open the <strong>Qubi Captain</strong> app &rarr; go to the <strong>Profile</strong> tab &rarr; tap <strong>Delete Account</strong> &rarr; confirm deletion.</li>
            <li><strong className="text-slate-900">Web Deletion Request:</strong> Submit a request anytime via our <Link href="/delete-account" className="text-cyan-700 underline">Account &amp; Data Deletion portal</Link> or email <a href="mailto:oscodesoftware@gmail.com" className="text-cyan-700 underline">oscodesoftware@gmail.com</a>. Requests are verified and completed within <strong>7 to 30 days</strong>.</li>
          </ol>

          <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <strong className="block text-sm text-slate-900">Need to delete your Qubi Captain account online?</strong>
              <span className="text-xs text-slate-600">Use our dedicated web Account &amp; Data Deletion page anytime.</span>
            </div>
            <Link
              href="/delete-account"
              className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Go to Account Deletion &rarr;
            </Link>
          </div>
        </section>

        {/* Section 9 */}
        <section id="your-rights" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">9</span>
            Your Privacy Rights
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">Access &amp; Review:</strong> View your profile, license, vehicle, and bank details directly in the app.</li>
            <li><strong className="text-slate-900">Correction:</strong> Update inaccurate details via <strong>Profile &rarr; Edit Profile</strong>.</li>
            <li><strong className="text-slate-900">Manage Permissions:</strong> Revoke camera, photo library, notification, or location permissions anytime in device settings.</li>
            <li><strong className="text-slate-900">Deletion:</strong> Delete your account in-app or submit a web request at <Link href="/delete-account" className="text-cyan-700 underline">/delete-account</Link>.</li>
          </ul>
        </section>

        {/* Section 10 */}
        <section id="children" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">10</span>
            Children&apos;s Privacy (18+ Only)
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Qubi Captain is strictly intended for legally licensed adult drivers aged{" "}
            <strong className="text-slate-900">18 years and older</strong>. We do not knowingly
            collect personal information from anyone under 18. If you believe a minor has submitted
            personal information, contact{" "}
            <a href="mailto:oscodesoftware@gmail.com" className="text-cyan-700 underline">
              oscodesoftware@gmail.com
            </a>{" "}
            and we will promptly delete it.
          </p>
        </section>

        {/* Section 11 */}
        <section id="changes" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">11</span>
            Changes to This Privacy Policy
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We may update this Privacy Policy periodically to reflect app updates, third-party
            integrations, or legal and Google Play policy changes. Any updates will be reflected by
            the &quot;Effective Date&quot; at the top of this page.
          </p>
        </section>

        {/* Section 12 */}
        <section id="contact" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 text-cyan-800 text-xs font-extrabold">12</span>
            Contact Us &amp; Grievance Officer
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong className="text-slate-900">App / Service Name:</strong> Qubi Captain (Qubi Ride)</li>
            <li><strong className="text-slate-900">Operator:</strong> Oscode Software</li>
            <li>
              <strong className="text-slate-900">Email:</strong>{" "}
              <a href="mailto:oscodesoftware@gmail.com" className="text-cyan-700 underline">
                oscodesoftware@gmail.com
              </a>
            </li>
            <li>
              <strong className="text-slate-900">Account Deletion Portal:</strong>{" "}
              <Link href="/delete-account" className="text-cyan-700 underline">
                /delete-account
              </Link>
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
