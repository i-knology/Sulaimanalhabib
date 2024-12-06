import TaskCard from "./TaskCard";

export default function DisplayCards({
  openDetailsDrawer,
}: {
  openDetailsDrawer: () => void;
}) {
  return (
    <>
      {" "}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
        {Array.from({ length: 6 })
          .fill(0)
          .map((_, i) => (
            <TaskCard onClick={openDetailsDrawer} key={i} />
          ))}
      </div>
    </>
  );
}
