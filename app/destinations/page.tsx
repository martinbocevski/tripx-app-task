"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { isUserAuthenticated, clearAuthenticationSession } from "@/lib/login";
import DestinationsList from "@/components/DestinationsList";

export default function DestionationsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [bookingCode, setBookingCode] = useState("");

  useEffect(() => {
    const loggedIn = isUserAuthenticated();

    if (!loggedIn) {
      router.push("/");
    } else {
      setLoading(false);
    }
    const booking = localStorage.getItem("booking_code");

    if (booking) {
      setBookingCode(booking);
    }
  }, []);

  const handleLogout = () => {
    clearAuthenticationSession();
    if (bookingCode) {
      localStorage.removeItem("booking_code");
    }
    router.push("/");
  };

  if (loading) {
    return <p className="text-base text-black">Loading...</p>;
  }

  return (
    <main className="w-[90%] xl:w-[1024] 2xl:w-[1280] mx-auto">
      <header className="flex gap-6 items-center justify-end w-full py-8">
        {bookingCode && (
          <div className="py-3 px-5 sm:py-4 sm:px-6 text-sm sm:text-base border-[1] border-blue-300 rounded-xl">
            Booking code: {bookingCode}
          </div>
        )}
        <button
          className="bg-black text-white text-sm sm:text-base m-0 py-3 px-8 sm:py-4 sm:px-8 rounded-xl cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <div className="flex py-[50] md:py-[100]">
        <h1 className="text-5xl md:text-7xl font-medium">Destinations</h1>
      </div>

      <DestinationsList />
    </main>
  );
}
