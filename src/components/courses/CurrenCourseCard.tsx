import LocateMap from "@/assets/icons/localemap.svg?react";
import { Avatar, Card, Divider, Tooltip, Typography } from "antd";
import dayjs from "dayjs";

export default function CurrenCourseCard() {
  return (
    <>
      <Card
        color="red"
        className="rounded-xl bg-teal-500/5 border-none"
        classNames={{
          body: "!p-4",
        }}
      >
        <div className="space-y-2">
          <Typography className="font-semibold text-base">
            <span>{dayjs().format("DD MMMM YYYY")}</span> /{" "}
            <span>{dayjs().clone().day(6).format("hh:mm")}</span> -{" "}
            <span>{dayjs().clone().day(6).format("hh:mm")}</span>
          </Typography>
          <Typography.Paragraph className="line-clamp-1">
            المكثفة لطب الأطفال والمعتمدة من هيئة التخصصات
          </Typography.Paragraph>
          <Divider className="border-gray-200" />
          <Avatar.Group
            max={{
              count: 3,
            }}
            size="small"
          >
            {Array.from({ length: 15 })
              .fill(0)
              .map((_, i) => (
                <Tooltip
                  title="User name"
                  key={i}
                >
                  <Avatar src="/profile.png" />
                </Tooltip>
              ))}
          </Avatar.Group>
          <div className="flex items-center gap-3 text-gray-600">
            <LocateMap
              width={20}
              height={20}
            />
            <p>اونلاين</p>
          </div>
        </div>
      </Card>
    </>
  );
}
