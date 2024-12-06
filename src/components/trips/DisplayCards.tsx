import TripCard from "./TripCard";

export default function DisplayCards() {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
        {Array.from({ length: 6 })
          .fill(0)
          .map((_, i) => (
            <TripCard key={i} />
          ))}
      </div>
    </>
  );
}
