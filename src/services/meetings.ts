import instance from "@/utils/instance";

interface FilterOptions {
  searchKeyword?: string | null;
  pageSize?: number;
  pageIndex?: number;
  sortType?: string | null;
  sortField?: string;
  isActive?: boolean | null;
  Title?:string;
  PriorityTypeId?:number|undefined;
  CommitteeId?:string;
}
async function getMeetings(params?: FilterOptions) {
  return instance.get("Meetings/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function getMeetingsType() {
  return instance.get("MeetingPriorityTypesLookup/GetAll").then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function getMeetingsPriority(params: { IsInternal: boolean }) {
  return instance.get("MeetingTypesLookup/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}
async function getLocations() {
  return instance.get("MeetingSuggestionsLookup/GetAll").then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}
async function getSecertary() {
  return instance.get("MeetingGroup/GetAll").then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function getMembers(params) {
  return instance.get("Users/GetListUsers", {params}).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function createMeeting(data) {
  return instance
    .post("Meetings/CreateMeeting", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}
export {
  createMeeting,
  getMeetings,
  getMeetingsPriority,
  getMeetingsType,
  getLocations,
  getSecertary,
  getMembers,
};
