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

  const isLocked = lockTime > 0;

  useEffect(() => {
    if (lockTime > 0) {
      const timer = setInterval(() => {
        setLockTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lockTime]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLocked || loading) return;

    setLoading(true);
    setMessage("");

    const result = await login(username, password);

    if (result.success) {
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
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}

      {isLocked && <p>Try again in {lockTime} seconds</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLocked || loading}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLocked || loading}
      />

      <button disabled={isLocked || loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
