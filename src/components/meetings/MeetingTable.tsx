import { formatDateRange } from "@/utils/displayDate";
import type { TableProps } from "antd";
import { Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Meeting } from "./MeetingCard";
import MeetingStatus from "./MeetingStatus";

interface MeetingTableProps {
  data?: Meeting[];
  totalCount: number;
  dispatch: (action: {
    type: "paginate";
    payload: { current: number; pageSize: number };
  }) => void;
  isFetching: boolean;
}

const MeetingTable: React.FC<MeetingTableProps> = ({
  isFetching,
  data = [],
  totalCount,
  dispatch,
}) => {
  const { t, i18n } = useTranslation();

  const columns: TableProps<Meeting>["columns"] = [
    {
      title: t("aboutMeeting"),
      dataIndex: "meetingTypeInfo",
      key: "meetingTypeInfo",
      render: (value) =>
        i18n.language === "ar" ? value?.name || "-" : value?.nameEn || "-",
    },
    {
      title: t("meetingType"),
      dataIndex: "meetingTypeInfo",
      key: "meetingTypeInfo",
      render: (value) => {
        return value?.isInternal
          ? t("statuses:internal")
          : t("statuses:external");
      },
    },
    {
      title: t("meetingDate"),
      dataIndex: "startDate",
      key: "date",
      render: (value, record) => {
        return <>{formatDateRange(value, record?.endDate)}</>;
      },
    },
    {
      title: t("meetingTitle"),
      dataIndex: "meet_Place",
      key: "meet_Place",
    },
    {
      title: t("meetingOwner"),
      dataIndex: "title",
      key: "title",
      render: () => "-",
    },
    {
      title: t("meetingCategory"),
      dataIndex: "meetingPriorityTypeLookup",
      key: "meetingPriorityTypeLookup",
      render: (value) => {
        return (
          <MeetingStatus
            status={i18n.language == "ar" ? value?.nameAr : value?.nameEn}
            id={value?.id}
          />
        );
      },
    },
  ];

  return (
    <div className="bg-white p-2">
      <Table
        className="mt-2 whitespace-nowrap custom-table"
        scroll={{ x: "100%" }}
        columns={columns}
        dataSource={data}
        loading={isFetching}
        pagination={{
          pageSize: 10,
          total: totalCount,
          showSizeChanger:false,
          defaultCurrent:1
        }}
        onChange={({ current = 1, pageSize = 10 }, _, __, { action }) => {
          if (action === "paginate") {
            console.log(current);
            
            dispatch({
              type: "paginate",
              payload: {
                current,
                pageSize,
              },
            });
          }
        }}
      />
    </div>
  );
};

export default MeetingTable;
