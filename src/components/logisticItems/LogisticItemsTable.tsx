import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";

export interface DataType {
  item: string;          // Added item here
  lastUpdate: string;
  actions?: string;
}

interface CommitteesCouncilsProps {
  data?: DataType[];
  actions: {
    edit: () => void;
  };
}

const LogisticItemsTable: React.FC<CommitteesCouncilsProps> = ({
  data = [],
  actions,
}) => {
  const { t } = useTranslation();

  const columns: ColumnsType<DataType> = [
    {
      title: t("item"),
      dataIndex: "item",
      key: "item",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("lastUpdate"),
      dataIndex: "lastUpdate",
      key: "lastUpdate",
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <button
          onClick={actions.edit}
          className="bg-gray-50 rounded-lg outline-secondary p-2"
        >
          <FiEdit size={20} />
        </button>
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
        rowKey="item"   // Ensure each row has a unique key
      />
    </div>
  );
};

export default LogisticItemsTable;
