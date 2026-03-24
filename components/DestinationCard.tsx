import { CountryDestination } from "@/types/destination";

type DestinationCardProps = {
  destination: CountryDestination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <article className="destination-card">
      <figure className="image-wrapper">
        <img
          src={destination.thumbnail}
          alt={destination.name || "Destination image"}
          className="destination-image"
        />
      </figure>

      <div className="content">
        <h3>{destination.name}</h3>

        <div className="aditional-info">
          <p>{destination.countHotels} hotels</p>
          <p>{destination.countDestinations} destinations</p>
        </div>
      </div>
    </article>
  );
}
