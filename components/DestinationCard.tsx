import { CountryDestination } from "@/types/destination";

type DestinationCardProps = {
  destination: CountryDestination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <article className="rounded-xl overflow-hidden shadow-lg">
      <figure className="h-[200] xl:h-[250] w-full">
        <img
          src={destination.thumbnail}
          alt={destination.name || "Destination image"}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="content flex flex-col py-5 px-5">
        <h3 className="text-2xl font-semibold mb-4">{destination.name}</h3>

        <div className="flex flex-col gap-1">
          <p className="text-base">{destination.countHotels} hotels</p>
          <p className="text-base">
            {destination.countDestinations} destinations
          </p>
        </div>
      </div>
    </article>
  );
}
