import Calendar from "@/assets/icons/calendar.svg?react";
import LocateMap from "@/assets/icons/localemap.svg?react";
import Timer from "@/assets/icons/timer.svg?react";
import { faker } from "@faker-js/faker";
import { Button, Card, Divider, Image, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import CourseAttendeeList from "./CourseAttendeeList";

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.displayName(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    avatar: faker.image.url(),
  };
}

const users = faker.helpers.multiple(createRandomUser, {
  count: 4,
});

export default function CourseContent({ onAttendeeClick, onViewClick }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <Image
        width="100%"
        height={200}
        className="rounded-xl object-cover"
        preview={false}
        src="/auth-bg.png"
      />
      <Typography className="font-semibold text-base">
        المكثفة لطب الأطفال والمعتمدة من هيئة التخصصات
      </Typography>

      <Card
        classNames={{
          body: "!p-3 space-y-3",
        }}
      >
        <div className="inline-flex gap-3 items-center">
          <Image
            width={35}
            height={35}
            className="rounded-full object-cover"
            preview={false}
            src="/profile.png"
          />
          <Typography.Paragraph className="font-semibold text-sm !mb-0">
            طلال السعيد
          </Typography.Paragraph>
        </div>
        <div className="flex items-center gap-3 text-gray-600 bg-gray-100 rounded-lg p-3">
          <Calendar
            width={20}
            height={20}
          />
          <p>
            <span>{dayjs().format("dddd DD MMMM YYYY")}</span> -{" "}
            <span>{dayjs().clone().day(6).format("dddd DD MMMM YYYY")}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 text-gray-600 px-3">
          <Timer
            width={20}
            height={20}
          />
          <p>
            <span>{dayjs().format("h:mmA")}</span> -{" "}
            <span>{dayjs().clone().day(6).format("h:mmA")}</span>
          </p>
        </div>
        <Divider className="border-gray-200" />
        <div className="flex items-center gap-3 text-gray-600 px-3">
          <LocateMap
            width={20}
            height={20}
          />
          <p>اسم القاعه هنا</p>
        </div>
      </Card>

      <Space className="!w-full !justify-between !items-center">
        <Typography.Title className="!text-base !mb-0">
          {t("courseAttendee")}{" "}
          <Tag
            color="red-inverse"
            className="rounded-full px-3 py-0.5"
          >
            30
          </Tag>
        </Typography.Title>

        <Button
          type="text"
          className="underline hover:no-underline font-semibold"
          size="small"
          onClick={onViewClick}
          variant="text"
        >
          {t("viewAll")}
        </Button>
      </Space>

      <CourseAttendeeList
        onAttendeeClick={onAttendeeClick}
        users={users}
      />
    </div>
  );
}
