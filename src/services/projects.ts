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

async function getAllProjects(params: FilterOptions) {
  return instance.get("Project/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function getAllDepartment() {
  return instance.get("DepartmentLookup/GetAll").then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function getAllManagers() {
  return instance.get("Org/GetDownLevel").then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

async function getMissionStatistics(projectId) {
  return instance.get("ProjectMession/GetAll?ProjectId=" + projectId).then((res) => {
    return res?.data || [];
  });
}
async function getProjectMembers(projectId) {
  return instance.get("Project/GetAll?ProjectId=" + projectId).then((res) => {
    return res?.data || [];
  });
}

async function createProject(data) {
  return instance
    .post("Project/Add", data, {
      headers: { "Content-Type": "application/json-patch+json" },
    })
    .then((res) => res.data);
}

async function createProjectTask(data) {
  return instance
    .post("ProjectMession/Add", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

async function updateProject(data) {
  const { id } = data;
  delete data.id;
  return instance
    .put("Project/Edit/" + id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

async function removeMember(data) {
  const members = [data.userId];
  return instance
    .delete(`Project/DeleteMembers/${data.projectId}`, {
      data: members,
    })
    .then((res) => res.data);
}

async function removeDocument(data) {
  const documents = [data.documentId];
  return instance
    .delete(`ProjectMession/DeleteDocuments/${data.projectId}`, {
      data: documents,
    })
    .then((res) => res.data);
}

export {
  createProject,
  createProjectTask,
  getAllDepartment,
  getAllManagers,
  getAllProjects,
  getMissionStatistics,
  getProjectMembers,
  removeDocument,
  removeMember,
  updateProject,
};
