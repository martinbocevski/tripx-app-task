"use client";

import { useEffect, useState } from "react";
import DestinationCard from "./DestinationCard";
import { fetchDestinations } from "@/lib/destinations";
import { CountryDestination } from "@/types/destination";

export default function DestinationsList() {
  const [destinations, setDestinations] = useState<CountryDestination[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const data = await fetchDestinations();
        setDestinations(data);
      } catch (err) {
        setError("Failed to load destinations");
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const filteredDestinations = destinations.filter((country) => {
    const searchValue = search.toLowerCase();

    if (!searchValue) return true;

    const countryMatch = country.name.toLowerCase().includes(searchValue);

    const cityMatch = country.destinations?.some((city) => {
      const nameMatch = city.name.toLowerCase().includes(searchValue);

      const aliasMatch = city.alias?.some((a) =>
        a.toLowerCase().includes(searchValue),
      );

      return nameMatch || aliasMatch;
    });

    return countryMatch || cityMatch;
  });

  if (loading) {
    return <p className="text-base text-black">Loading Destinations...</p>;
  }

  if (error) {
    return <p className="text-base text-black">{error}</p>;
  }

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search destinations"
        name="search"
        id="search"
        className="w-full py-5 px-5 mb-8 text-base sm:text-xl border-[1] border-[#e6e6e6] rounded-2xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredDestinations.length === 0 ? (
        <p className="text-base text-black">No results found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((item) => (
            <DestinationCard key={item.code} destination={item} />
          ))}
        </div>
      )}
    </div>
  );
}
