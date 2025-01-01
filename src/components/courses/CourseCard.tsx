import Calendar from "@/assets/icons/calendar.svg?react";
import LocateMap from "@/assets/icons/localemap.svg?react";
import Timer from "@/assets/icons/timer.svg?react";
import { Avatar, Card, Divider, Image, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import Status from "./Status";

export default function CourseCard({ onClick }) {
  return (
    <Card
      classNames={{
        body: "!p-3 relative",
      }}
      className="rounded-2xl border-none cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-500/5"
      onClick={onClick}
    >
      <span className="absolute top-5 right-5 z-10 block">
        <Status status="ongoing" />
      </span>
      <div className="space-y-2">
        <Image
          width="100%"
          height={160}
          className="rounded-xl object-cover"
          preview={false}
          src="/auth-bg.png"
        />
        <Typography className="font-medium line-clamp-1">
          المكثفة لطب الأطفال والمعتمدة من هيئة التخصصات
        </Typography>
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
        <Divider className="my-0" />
        <div className="flex items-center gap-3 text-gray-600">
          <Calendar
            width={20}
            height={20}
          />
          <p>
            <span>{dayjs().format("dddd DD MMMM YYYY")}</span> -{" "}
            <span>{dayjs().clone().day(6).format("dddd DD MMMM YYYY")}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Timer
            width={20}
            height={20}
          />
          <p>
            <span>{dayjs().format("h:mmA")}</span> -{" "}
            <span>{dayjs().clone().day(6).format("h:mmA")}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <LocateMap
            width={20}
            height={20}
          />
          <p>اسم القاعه هنا</p>
        </div>
      </div>
    </Card>
  );
}
