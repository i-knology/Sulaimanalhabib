import GlobalPagination from "../ui/Pagination";
import CommitteeCardLoader from "./CommitteeCardLoader";
import CommitteesCard, { Committee } from "./CommitteesCard";

export default function DisplayCards({
  committees,
  loading,
  dispatch,
  totalCount,
}: {
  committees: Committee[];
  loading: boolean;
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
              .fill(0)
              .map((_, i) => <CommitteeCardLoader key={i} />)
          : committees?.map((committee: Committee, i: number) => (
              <CommitteesCard committee={committee} key={i} />
            ))}
      </div>
      <GlobalPagination dispatch={dispatch} totalCount={totalCount} />
    </>
  );
}
