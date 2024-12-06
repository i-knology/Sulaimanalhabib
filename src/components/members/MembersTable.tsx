import { formatDate } from "@/utils/displayDate";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { RxCountdownTimer } from "react-icons/rx";

export interface User {
  name: string;
  userName: string;
  id: string;
  email: string;
  roles: string[];
  mobileNumber: string;
  profilePicture: string;
  isActive: boolean;
}

interface CommitteesCouncilsProps {
  data?: User[];
  actions: {
    view: (userData: any) => void;
    edit: (userData: any) => void;
    paginate: (action: {
      type: "paginate";
      payload: { current: number; pageSize: number };
    }) => void;
  };
  loading: boolean;
}

const MembersTable: React.FC<CommitteesCouncilsProps> = ({
  data = [],
  actions,
  loading,
}) => {
  const { t, i18n } = useTranslation();

  const columns: ColumnsType<User> = [
    {
      title: t("username"),
      dataIndex: "name",
      key: "name",
      render: (text) => text || "-",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
      render: (text) => text || "-",
    },
    {
      title: t("permissionType"),
      dataIndex: "roles",
      key: "permissionType",
      render: (value) => {
        return value?.[0] || "-";
      },
    },
    {
      title: t("usagePermissions"),
      dataIndex: "permissions",
      key: "usagePermissions",
      render: (value) => value || "-",
    },
    {
      title: t("lastUpdate"),
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      render: (value) => (value ? formatDate(value, i18n.language) : "-"),
    },
    {
      title: t("actions"),
      dataIndex: "id",
      key: "actions",
      render: (_, record:User) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              actions.edit(record);
            }}
            className="bg-gray-50 rounded-lg outline-secondary p-2"
          >
            <FiEdit size={20} />
          </button>
          <button
            onClick={() => {
              actions.view(record);
            }}
            className="bg-gray-50 rounded-lg outline-secondary p-2"
          >
            <RxCountdownTimer size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-2">
      <Table
        className="mt-2 whitespace-nowrap custom-table"
        scroll={{ x: "100%" }}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: 1,
          pageSize: 10,
          // total: totalCount,
        }}
        onChange={({ current = 1, pageSize = 10 }, _, __, { action }) => {
          if (action === "paginate") {
            actions.paginate({
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

export default MembersTable;
