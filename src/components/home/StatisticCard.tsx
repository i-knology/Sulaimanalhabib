import { Card, Tag, Typography } from "antd";
import { cloneElement } from "react";

export default function StatisticCard({ title, count, color, icon }) {
  return (
    <Card
      className="border-none"
      classNames={{
        body: "!p-5",
      }}
    >
      <div className="flex items-center gap-3 justify-between">
        <Tag
          color={color}
          className="w-12 h-12 flex items-center justify-center rounded-xl border-none"
        >
          {cloneElement(icon, {
            width: 22,
            height: 22,
          })}
        </Tag>
        <Typography.Title
          level={4}
          className="font-bold"
          color="green"
        >
          {count}
        </Typography.Title>
      </div>
      <Typography.Paragraph className="text-base !mt-4 !mb-0">{title}</Typography.Paragraph>
    </Card>
  );
}
