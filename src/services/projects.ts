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
  // return instance.get("Org/GetDownLevel").then((res) => {
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
  const formData = new FormData();

  for (const key in data) {
    const item = data[key];
    if (key == "Files") {
      item?.forEach((file) => {
        console.log(file);
        formData.append("Files", file, file.name);
      });
    } else if (key == "MemberIds") {
      item?.forEach((member, index) => {
        formData.append("MemberIds[" + index + "]", member);
      });
    } else {
      console.log(key, item);
      formData.append(key, item);
    }
  }

  return instance
    .post("ProjectMession/Add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

async function updateProject(data) {
  const { id } = data;
  const formData = new FormData();

  for (const key in data) {
    const item = data[key];
    if (key == "Files") {
      item?.forEach((file) => {
        console.log(file);
        formData.append("Files", file, file.name);
      });
    } else if (key == "MemberIds") {
      item?.forEach((member, index) => {
        formData.append("MemberIds[" + index + "]", member);
      });
    } else {
      console.log(key, item);
      formData.append(key, item);
    }
  }

  delete data.id;
  return instance
    .put("Project/Edit/" + id, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

async function addDocuments(data) {
  const { id } = data;
  const formData = new FormData();

  for (const key in data) {
    const item = data[key];
    if (key == "files") {
      item?.forEach((file) => {
        console.log(file);
        formData.append("files", file, file.name);
      });
    } else {
      formData.append(key, item);
    }
  }

  delete data.id;
  return instance
    .put("Project/AddDocuments/" + id, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

async function addMembers(data) {
  const { id } = data;

  delete data.id;
  return instance.put("Project/AddMembers/" + id, data.MemberIds, {}).then((res) => res.data);
}

async function cancelProject(id) {
  return instance.put(`Project/Cancel/${id}`).then((res) => res.data);
}

async function closeProject(data) {
  return instance.put(`Project/Close/${data?.id}/${data?.isClosed}`).then((res) => res.data);
}

async function updateProjectStatus(data) {
  return instance.put(`Project/ChangeStatus/${data?.id}/${data?.statusId}`).then((res) => res.data);
}

async function deleteProject(id) {
  return instance.delete(`Project/Delete/${id}`).then((res) => res.data);
}

async function getProjectStatuses() {
  return instance.get("ProjectStatusLookup/GetAll").then((res) => {
    return res?.data || [];
  });
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
    .delete(`Project/DeleteDocuments/${data.projectId}`, {
      data: documents,
    })
    .then((res) => res.data);
}

export {
  addDocuments,
  addMembers,
  cancelProject,
  closeProject,
  createProject,
  createProjectTask,
  deleteProject,
  getAllDepartment,
  getAllManagers,
  getAllProjects,
  getMissionStatistics,
  getProjectMembers,
  getProjectStatuses,
  removeDocument,
  removeMember,
  updateProject,
  updateProjectStatus,
};
