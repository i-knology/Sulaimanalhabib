import Calendar from "@/assets/icons/calendar.svg?react";
import Users from "@/assets/icons/userGroup.svg?react";
import { getAllMissions } from "@/services/missions";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, List, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import MissionDetails from "../missions/MissionDetails";

export default function ProjectsMissions() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    pageIndex: 1,
    pageSize: 10,
    sortField: "createdAt",
    sortType: "desc",
  });
  // Fetch projects
  const { data, isFetching } = useQuery({
    queryKey: ["missions", filterOptions],
    queryFn: () => {
      return getAllMissions({
        ...filterOptions,
        ProjectId: projectId,
      });
    },
  });

  return (
    <>
      <List
        dataSource={data?.data?.items ?? []}
        loading={isFetching}
        pagination={{
          pageSize: 10,
          total: data?.data?.totalCount ?? 0,
          onChange: (page) => {
            setFilterOptions((prev) => ({
              ...prev,
              pageIndex: page,
            }));
          },
        }}
        renderItem={(item: any) => (
          <List.Item
            className="!p-0 mb-2 last:mb-0 w-full cursor-pointer"
            onClick={() => {
              setIsOpen(item);
            }}
          >
            <Card className="w-full transition hover:border-primary">
              <div className="space-y-2">
                <Typography>{item.description}</Typography>
                <div>
                  <div className="inline-flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-lightGray text-gray-500 flex-shrink-0">
                      <Users
                        width={20}
                        height={20}
                      />
                    </span>

                    <Avatar.Group
                      max={{
                        count: 2,
                      }}
                      size="small"
                    >
                      <Avatar
                        src={item?.userInfo?.profilePictureUrl}
                        className="text-sm"
                      >
                        {item?.userInfo?.name?.[0]}
                      </Avatar>
                    </Avatar.Group>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MissionItem
                    title={t("startDate")}
                    content={
                      item.startDate
                        ? dayjs(item.startDate).format("dddd DD MMM YYYY")
                        : t("notAvailable")
                    }
                    icon={
                      <Calendar
                        width={20}
                        height={20}
                      />
                    }
                  />
                  <MissionItem
                    title={t("endDate")}
                    content={
                      item.startDate
                        ? dayjs(item.startDate).format("dddd DD MMM YYYY")
                        : t("notAvailable")
                    }
                    icon={
                      <Calendar
                        width={20}
                        height={20}
                      />
                    }
                  />
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <MissionDetails
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}

function MissionItem({ title, content, icon }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-lightGray text-gray-500 flex-shrink-0">
        {icon}
      </span>
      <div className="flex-1">
        <Typography.Paragraph className="text-gray-500 text-xs !mb-1">{title}</Typography.Paragraph>
        <Typography className="!mb-0 font-medium text-sm">{content}</Typography>
      </div>
    </div>
  );
}
