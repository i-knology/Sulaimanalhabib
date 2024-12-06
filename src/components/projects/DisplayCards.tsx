import GlobalPagination from "../ui/Pagination";
import CardLoading from "./CardLoader";
import ProjectsCard, { Project } from "./ProjectsCard";

export default function DisplayCards({
  data,
  isLoading,
  totalCount,
  dispatch,
}: {
  data: Project[];
  isLoading: boolean;
  dispatch: (action: {
    type: "paginate";
    payload: { current: number; pageSize: number };
  }) => void;
  totalCount: number;
}) {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
        {isLoading
          ? Array.from({ length: 6 })
              .fill(0)
              .map((_, i) => <CardLoading key={i} />)
          : data?.map((project, i) => (
              <ProjectsCard project={project} key={i} />
            ))}
      </div>
      <GlobalPagination dispatch={dispatch} totalCount={totalCount} />
    </>
  );
}
