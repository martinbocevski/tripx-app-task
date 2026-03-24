"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { isUserAuthenticated } from "@/lib/login";

export default function DestionationsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = isUserAuthenticated();

    if (!loggedIn) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="destionationsHeadline">
        <h1 className="H1">Destinations</h1>
      </div>
    </main>
  );
}
