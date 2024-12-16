import instance from "@/utils/instance";

async function getAllNotifications(params: any) {
  return instance.get("FirebaseNotification/GetAll", { params }).then((res) => {
    return {
      data: res.data?.data || [],
    };
  });
}

export { getAllNotifications };
