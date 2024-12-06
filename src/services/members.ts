import instance from "@/utils/instance";

interface FilterOptions {
  searchKeyword: string | null;
  pageSize: number;
  pageIndex: number;
  sortType: string | null;
  sortField: string;
  isActive: boolean | null;
}
async function getUsers(params: FilterOptions) {
  return instance.get("Users/GetListUsers", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}
async function suspendAccount(data) {
  return instance
    .post(
      "Users/UserChangeInfoByAdmin/" + data.id,
      { isActive: data?.isActive },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((res) => res.data);
}
async function updateUserData(data) {
    console.log(data);
    
  return instance
    .post("Users/UserChangeInfoByAdmin/" + data.id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export { getUsers, suspendAccount, updateUserData };
