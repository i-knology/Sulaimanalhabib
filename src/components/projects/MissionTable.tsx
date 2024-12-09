import type { TableProps } from "antd";
import { Avatar, Table, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { Project } from "./ProjectsCard";
import ProjectStatus from "./ProjectStatus";
import MissionImportanceStatus from "./MissionImportanceStatus";

interface MissionTableProps {
  data: any[];
  totalCount: number;
  dispatch: (action: {
    type: "paginate";
    payload: { current: number; pageSize: number };
  }) => void;
  isFetching?: boolean;
}

const MissionTable: React.FC<MissionTableProps> = ({
  data,
  totalCount,
  dispatch,
  isFetching,
}) => {
  const { t, i18n } = useTranslation();
  const columns: TableProps["columns"] = [
    {
      title: t("mission"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("project"),
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: t("createdBy"),
      key: "orgInfo",
      dataIndex: ["createdUserInfo", "name"],
      render: (value) => {
        return (
          <Typography.Paragraph
            ellipsis={{
              rows: 1,
            }}
          >
            {value}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: t("missionResponsibility"),
      key: "orgInfo",
      dataIndex: ["userInfo", "name"],
      render: (value) => {
        console.log("🚀 ~ value:", value)
        return (
          <Avatar.Group
          size="small"
          max={{
            count: 2,
            style: {
              color: "#22baed",
              backgroundColor: "#F3F4F6",
              cursor: "pointer",
            },
            popover: { trigger: "click" },
          }}
        >
            <Tooltip title={value} placement="top">
              <Avatar
                style={{ backgroundColor: "#F5F5F5", color: '#0A0A0A' }}
                // src={value?.profilePictureUrl}
                
              >{value.slice(0,2)}</Avatar>
            </Tooltip>
        </Avatar.Group>
        );
      },
    },
    {
      title: t("missionImportance"),
      dataIndex: ["priorityInfo"],
      key: "statusInfo",
      render: (value) => {
        return <MissionImportanceStatus id={value?.id} />;
      },
    },
    {
      title: t("status"),
      dataIndex: "statusInfo",
      key: "statusInfo",
      render: (value) => {
        return <ProjectStatus id={value?.id} />;
      },
    },
    {
        title: t("startDate"),
        dataIndex: "startDate",
        key: "startDate",
        render: (value) => {
          return value
            ? dayjs(value).locale(i18n.language).format("YYYY-MMMM-DD")
            : "-";
        },
      },
      {
        title: t("endDate"),
        dataIndex: "endDate",
        key: "endDate",
        render: (value) => {
          return value
            ? dayjs(value).locale(i18n.language).format("YYYY-MMMM-DD")
            : "-";
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
        }}
        onChange={({ current = 1, pageSize = 10 }, _, __, { action }) => {
          if (action === "paginate") {
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

export default MissionTable;
