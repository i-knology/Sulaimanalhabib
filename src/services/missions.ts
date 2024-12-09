import instance from "@/utils/instance";

interface FilterOptions {
  searchKeyword?: string | null;
  pageSize?: number;
  pageIndex?: number;
  sortType?: string | null;
  sortField?: string;
  isActive?: boolean | null;
  ProjectId?: string;
  Name?: string | undefined;
  StatusId?: number | undefined;
}
async function getAllMissions(params: FilterOptions) {
  return instance.get("task/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

export { getAllMissions };
