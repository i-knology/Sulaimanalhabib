import instance from "@/utils/instance";

interface FilterOptions {
  searchKeyword?: string | null;
  pageSize?: number;
  pageIndex?: number;
  sortType?: string | null;
  sortField?: string;
  isActive?: boolean | null;
  ProjectId?: string;
  Title?: string | undefined;
  StatusId?: number | undefined;
}
async function getAllMissions(params: FilterOptions) {
  return instance.get("task/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}
async function getTaskPriority(params: any) {
  return instance.get("TaskPriorityTypeLookup/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}
async function getMissionComments(params: any) {
  return instance.get("TaskComment/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}
async function getTaskMissions(params: any) {
  return instance.get("TaskMession/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function getMissionStatus(params: any) {
  return instance.get("TaskStatusLookup/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function updateMessionStatus(params: any) {
  return instance.put("TaskMession/ChangeStatus/" + params.id + "/" + params.status).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function deleteTaskMession(id) {
  return instance.delete("TaskMession/Delete/" + id).then((res) => res.data);
}

async function addComment(data) {
  return instance.post("TaskComment/Add", data, {}).then((res) => res.data);
}

async function addNewMession(data) {
  return instance.post("TaskMession/Add", data, {}).then((res) => res.data);
}

async function editTaskMession(data) {
  return instance.put("TaskMession/Edit/" + data?.id, data, {}).then((res) => res.data);
}

async function createMission(data) {
  return instance
    .post("Task/Add", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

async function updateMission(data) {
  const { id } = data;
  delete data.id;
  return instance
    .put("Task/Edit/" + id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export {
  addComment,
  addNewMession,
  createMission,
  deleteTaskMession,
  editTaskMession,
  getAllMissions,
  getMissionComments,
  getMissionStatus,
  getTaskMissions,
  getTaskPriority,
  updateMessionStatus,
  updateMission,
};
