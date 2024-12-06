import instance from "@/utils/instance";

interface FilterOptions {
  searchKeyword?: string | null;
  pageSize?: number;
  pageIndex?: number;
  sortType?: string | null;
  sortField?: string;
  isActive?: boolean | null;
  CommitteeId?: string;
  Title?: string;
}

async function getAllCommittees(params: FilterOptions) {
  return instance.get("Committee/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function getCommitteesTypes() {
  return instance.get("CommitteeTypeLookup/GetAll").then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}
async function getCommitteeDetails(id: string | undefined) {
  return instance.get("Committee/GetAll?Id=" + id).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function getCommitteeMissionDetails(id:string) {
  return instance.get("CommitteeMession/GetAll?Id=" + id).then((res) => {
    return {
      data: res.data || [],
    };
  });
}

async function createCommittee(data) {
  return instance
    .post("Committee/Add", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

async function createCommitteeMission(data) {
  return instance
    .post("CommitteeMession/Add", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

async function updateCommittee(data) {
  const { id } = data;
  delete data.id;
  return instance
    .put("Committee/Edit/" + id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export {
  createCommittee,
  getAllCommittees,
  getCommitteesTypes,
  getCommitteeDetails,
  updateCommittee,
  createCommitteeMission,
  getCommitteeMissionDetails,
};
