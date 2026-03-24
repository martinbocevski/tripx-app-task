import { CountryDestination } from "@/types/destination";

export async function fetchDestinations() {
  try {
    const response = await fetch(
      "https://book.tripx.se/wp-json/tripx/v1/destinations",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch destinations");
    }

    const data: CountryDestination[] = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching destinations:", error);
    return [];
  }
}
