import NotificationCard from "@/components/notifications/NotificationCard";
import TopBar from "@/components/ui/TopBar";
import { getAllNotifications } from "@/services/notifications";
import { useQuery } from "@tanstack/react-query";
import { List } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery({
    queryKey: ["notifications", search, page],
    queryFn: () => {
      return getAllNotifications({
        PageSize: 15,
        PageIndex: page,
        FullName: search,
        toFullName: search,
      });
    },
  });

  return (
    <div className="p-2 space-y-2">
      <TopBar
        text={t("notifications")}
        search={setSearch}
        searchProps={{
          defaultValue: search,
        }}
      />

      <List
        dataSource={data?.data?.items ?? []}
        renderItem={(item: any) => <NotificationCard {...item} />}
        loading={isFetching}
        pagination={{
          total: data?.data?.totalItems,
          pageSize: 15,
          current: page,
          onChange: (page) => {
            setPage(page);
          },
        }}
      />
    </div>
  );
}
