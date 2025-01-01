import Login from "@/assets/icons/login.svg?react";
import Logout from "@/assets/icons/logout.svg?react";
import { faker } from "@faker-js/faker";
import { Button, Card, Image, List, Typography } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import AttendStatus from "./AttendStatus";

function createAttendances() {
  return {
    id: faker.string.uuid(),
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    date: faker.date.anytime(),
    isAttend: true,
  };
}

const attendances = faker.helpers.multiple(createAttendances, {
  count: 12,
});

function createAbsence() {
  return {
    id: faker.string.uuid(),
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    date: faker.date.anytime(),
    isAttend: false,
  };
}

const absence = faker.helpers.multiple(createAbsence, {
  count: 4,
});

export default function Attendance({ onBackClick }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2">
        <Button
          icon={i18n.language == "ar" ? <PiArrowRight size={20} /> : <PiArrowLeft size={20} />}
          shape="circle"
          size="small"
          onClick={onBackClick}
        />
        <p className="font-medium text-base">{t("courseDetails")}</p>
      </div>

      <div className="flex gap-3 items-center">
        <Image
          width={50}
          height={50}
          className="rounded-full object-cover"
          preview={false}
          src="/profile.png"
        />
        <div>
          <Typography.Paragraph className="font-semibold text-sm !mb-0">
            Mohammed Ahmed
          </Typography.Paragraph>
          <Typography.Paragraph className="!mb-0">ahmed45@gmail.com</Typography.Paragraph>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card
          className="bg-teal-100 border-none rounded-xl"
          classNames={{
            body: "!p-4",
          }}
        >
          <Typography.Paragraph className="font-semibold text-lg !mb-0 text-teal-600">
            {12}
          </Typography.Paragraph>
          <Typography.Paragraph className="!mb-0 text-base">
            {t("attendance2")}
          </Typography.Paragraph>
        </Card>
        <Card
          className="bg-red-100 border-none rounded-xl"
          classNames={{
            body: "!p-4",
          }}
        >
          <Typography.Paragraph className="font-semibold text-lg !mb-0 text-red-600">
            {4}
          </Typography.Paragraph>
          <Typography.Paragraph className="!mb-0 text-base">{t("absence")}</Typography.Paragraph>
        </Card>
      </div>

      <List
        dataSource={[...attendances, ...absence]}
        renderItem={(item) => (
          <List.Item className="first:pt-0 last:pb-0">
            <UserAttendItem {...item} />
          </List.Item>
        )}
      />
    </div>
  );
}

function UserAttendItem({ startDate, endDate, isAttend, date }) {
  return (
    <Card
      classNames={{
        body: "!p-3 space-y-3",
      }}
      className="w-full"
    >
      <div className="flex items-center gap-3">
        <p className="text-base font-medium">
          <span>{dayjs(date).format("DD MMMM YYYY")}</span>
        </p>
        <span className="flex-1"></span>
        <AttendStatus status={isAttend ? "attend" : "notAttend"} />
      </div>

      {isAttend && (
        <div className="inline-flex flex-wrap gap-3">
          <div className="flex items-center gap-3 text-gray-600 ">
            <Login
              className="text-teal-600"
              width={24}
              height={24}
            />
            <p>{<span>{dayjs(startDate).clone().day(6).format("hh:mmA")}</span>}</p>
          </div>
          <div className="flex items-center gap-3 text-gray-600 ">
            <Logout
              className="text-red-600"
              width={24}
              height={24}
            />
            <p>{<span>{dayjs(endDate).clone().day(6).format("hh:mmA")}</span>}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
