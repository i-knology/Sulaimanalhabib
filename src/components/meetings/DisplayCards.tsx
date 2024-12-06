import GlobalPagination from "../ui/Pagination";
import CardLoader from "./CardLoader";
import MeetingCard, { Meeting } from "./MeetingCard";

export default function DisplayCards({
  data,
  loading,
  dispatch,
  totalCount,
}: {
  loading: boolean;
  data: Meeting[];
  dispatch: (action: {
    type: "paginate";
    payload: { current: number; pageSize: number };
  }) => void;
  totalCount: number;
}) {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
        {loading
          ? Array.from({ length: 6 })
              .fill(null)
              .map(() => {
                return <CardLoader />;
              })
          : data?.map((meeting, i: number) => (
              <MeetingCard meeting={meeting} key={i} />
            ))}
      </div>
      <GlobalPagination dispatch={dispatch} totalCount={totalCount} />
    </>
  );
}
