"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function StatisticsCards({ bookings }) {
  const [drivers, setDrivers] = useState();
  const [passengers, setPassengers] = useState();

  useEffect(() => {
    fetch("/api/drivers")
      .then((res) => res.json())
      .then((data) => {
        setDrivers(data.drivers || []);
      });

    fetch("/api/passengers")
      .then((res) => res.json())
      .then((data) => {
        setPassengers(data.passengers || []);
      });
  }, []);

  // --------------------------------------------
  // 🔥 Calculate all stats from parent bookings
  // --------------------------------------------
  const now = new Date();
  const todayDate = now.toISOString().split("T")[0];
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let thisMonth = 0;
  let today = 0;
  let shared = 0;
  let privateCount = 0;
  let totalPayment = 0;
  let paymentThisMonth = 0;

  bookings.forEach((b: any) => {
    const date = new Date(b.bookingTime);

    // Today’s bookings
    if (b.bookingTime.startsWith(todayDate)) {
      today++;
    }

    // This month’s bookings
    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      thisMonth++;
      paymentThisMonth += b.fare || 0;
    }

    // Shared / Private
    if (b.rideType?.toLowerCase() === "shared") shared++;
    if (b.rideType?.toLowerCase() === "private") privateCount++;

    totalPayment += b.fare || 0; //
  });

  const stats = [
    { label: "Total Bookings", value: bookings.length.toString(), icon: "📊" },
    { label: "Bookings This Month", value: thisMonth.toString(), icon: "📈" },
    { label: "Today's Bookings", value: today.toString(), icon: "📅" },
    { label: "Total Shared Bookings", value: shared.toString(), icon: "👥" },
    {
      label: "Total Private Bookings",
      value: privateCount.toString(),
      icon: "🚗",
    },

    // Static values kept as requested
    { label: "Total Payment Collected", value: `₹${totalPayment}`, icon: "💰" },
    { label: "Payments This Month", value: `₹${paymentThisMonth}`, icon: "💳" },
    { label: "Total Taxis", value: drivers?.length, icon: "🚕" },
    { label: "Total Passengers", value: passengers?.length, icon: "👤" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-light text-sm font-medium">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-primary mt-2">
                {stat.value}
              </p>
            </div>
            <div className="text-4xl">{stat.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
