import instance from "@/utils/instance";

async function getStatistics() {
  return instance.get("AdminIndex/Statistics").then((res) => {
    return res?.data;
  });
}
async function getMeetingTags() {
  return instance.get("Meetings/StatisticsByPriority").then((res) => {
    return res?.data;
  });
}
async function getCommitteeTags() {
  return instance.get("Committee/StatisticsByType").then((res) => {
    return res?.data;
  });
}
async function getProjectsTags() {
  return instance.get("Project/StatisticsByStatus").then((res) => {
    return res?.data;
  });
}
async function getMeetingStatistics() {
  return instance
    .get("Meetings/StatisticsByYear" + "?year=2024")
    .then((res) => {
      return { data: res?.data?.data };
    });
}
async function getCommitteeStatistics() {
  return instance
    .get("Committee/StatisticsByYear" + "?year=2024")
    .then((res) => {
      return { data: res?.data?.data };
    });
}

export {
  getCommitteeStatistics,
  getProjectsTags,
  getStatistics,
  getMeetingStatistics,
  getMeetingTags,
  getCommitteeTags,
};
