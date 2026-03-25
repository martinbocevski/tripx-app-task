"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { login } from "@/lib/login";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockTime, setLockTime] = useState(0);

  const [bookingCode, setBookingCode] = useState("");

  const isLocked = lockTime > 0;

  useEffect(() => {
    if (lockTime > 0) {
      const timer = setInterval(() => {
        setLockTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lockTime]);

  useEffect(() => {
    if (lockTime === 0) {
      setMessage("");
    }
  }, [lockTime]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLocked || loading) return;

    setLoading(true);
    setMessage("");

    const result = await login(username, password);

    if (result.success) {
      if (bookingCode) {
        localStorage.setItem("booking_code", bookingCode);
      }

      setFailedAttempts(0);
      router.push("/destinations");
      setLoading(false);
      return;
    }

    setFailedAttempts((prev) => prev + 1);

    if (result.error === "Wrong username or password") {
      setMessage("Wrong username or password");
    } else if (result.error === "Server error") {
      setMessage("Server error, try again");
    } else {
      setMessage("Something went wrong");
    }

    if (failedAttempts + 1 >= 3) {
      setLockTime(30);
      setMessage("Too many attempts. Wait for 30 seconds.");
      setFailedAttempts(0);
    }

    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
      {message && (
        <p className="bg-red-200 rounded-lg py-3 px-3 text-sm text-red-500">
          {message}
        </p>
      )}

      {isLocked && (
        <p className="bg-amber-100 rounded-lg py-3 px-3 text-sm text-amber-500">
          Try again in {lockTime} seconds
        </p>
      )}

      <input
        type="text"
        placeholder="Username"
        className="w-full py-4 px-4 text-lg border-[1] border-[#e6e6e6] rounded-xl"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLocked || loading}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full py-4 px-4 text-lg border-[1] border-[#e6e6e6] rounded-xl"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLocked || loading}
      />

      <input
        type="text"
        placeholder="Booking code (Optional)"
        className="w-full py-4 px-4 text-lg border-[1] border-[#e6e6e6] rounded-xl"
        value={bookingCode}
        onChange={(e) => setBookingCode(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white rounded-xl py-3.5 text-lg cursor-pointer"
        disabled={isLocked || loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
