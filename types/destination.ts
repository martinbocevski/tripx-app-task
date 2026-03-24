export type CityDestination = {
  name: string;
  slug: string;
  code: string;
  thumbnail: string;
  countHotels: number;
  alias: string[];
};

export type CountryDestination = {
  name: string;
  slug: string;
  code: string;
  thumbnail: string;
  countHotels: number;
  countDestinations: number;
  destinations: CityDestination[];
};
