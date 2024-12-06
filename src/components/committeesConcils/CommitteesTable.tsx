import { Avatar, Image, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { useTranslation } from "react-i18next";
import { Committee } from "./CommitteesCard";
import CommitteeStatus from "./CommitteeStatus";

interface CommitteesCouncilsProps {
  data: Committee[];
  isFetching: boolean;
  totalCount: number;
  dispatch: (action: {
    type: "paginate";
    payload: { current: number; pageSize: number };
  }) => void;
}

const CommitteesTable: React.FC<CommitteesCouncilsProps> = ({
  data = [],
  isFetching,
  totalCount,
  dispatch,
}) => {
  const { t } = useTranslation();

  const columns: ColumnsType<Committee> = [
    {
      title: t("committeeName"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("taskCount"),
      dataIndex: "messions",
      key: "taskCount",
      render: (_, record) => {
        return record?.messions?.length || "0";
      },
    },
    {
      title: t("memberCount"),
      dataIndex: "members",
      key: "members",
      render: (value) => {
        const membersData = value?.map((el) => {
          return {
            image: el?.userInfo?.profilePictureUrl,
            name: el?.userInfo?.name,
          };
        });
        return (
          <>
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
              {membersData?.map((el) => (
                <Tooltip title={el?.name} placement="top">
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    src={el?.image}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </>
        );
      },
    },
    {
      title: t("committeeChair"),
      dataIndex: "members",
      key: "createdBy",
      render: (value) => {
        const committeeChair = value
          ?.filter((el) => el?.typeId == 1)
          .map((el) => el?.userInfo);
        return (
          <p className="flex items-center gap-2 overflow-hidden">
            <Image
              className="rounded-full"
              width={35}
              src={committeeChair?.[0]?.profilePictureUrl}
            />
            <span className="truncate">{committeeChair?.[0]?.name}</span>
          </p>
        );
      },
    },
    {
      title: t("committeeSecretary"),
      dataIndex: "members",
      key: "id",
      render: (value) => {
        const committeeChair = value
          ?.filter((el) => el?.typeId == 2)
          .map((el) => el?.userInfo);
        return (
          <p className="flex items-center gap-2 overflow-hidden">
            <Image
              className="rounded-full"
              width={35}
              src={committeeChair?.[0]?.profilePictureUrl}
            />
            <span className="truncate">{committeeChair?.[0]?.name}</span>
          </p>
        );
      },
    },
    {
      title: t("committeeType"),
      dataIndex: "committeeType",
      key: "committeeType",
      render: (_, record) => <CommitteeStatus committee={record} />,
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
          current: 1,
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

export default CommitteesTable;
