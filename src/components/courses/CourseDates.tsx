import LocateMap from "@/assets/icons/localemap.svg?react";
import { faker } from "@faker-js/faker";
import { Button, Card, Divider, List } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";

function createRandomUser() {
  return {
    id: faker.string.uuid(),
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    address: faker.location.streetAddress({
      useFullAddress: true,
    }),
  };
}

const dates = faker.helpers.multiple(createRandomUser, {
  count: 10,
});

export default function CourseDates({ onBackClick }) {
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
      <List
        dataSource={dates}
        renderItem={(item: any) => (
          <List.Item className="first:pt-0 last:pb-0">
            <CourseDate {...item} />
          </List.Item>
        )}
      />
    </div>
  );
}

function CourseDate({ startDate, endDate, address }) {
  return (
    <Card
      classNames={{
        body: "!p-3 space-y-3",
      }}
      className="w-full"
    >
      <div className="flex items-center gap-3 text-gray-600 ">
        <p>
          <span>{dayjs(startDate).format("DD MMMM YYYY")}</span> /{" "}
          <span>{dayjs(startDate).clone().day(6).format("hh:mmA")}</span> -{" "}
          <span>{dayjs(endDate).clone().day(6).format("hh:mmA")}</span>
        </p>
      </div>

      <Divider className="border-gray-200" />
      <div className="flex items-center gap-3 text-gray-600 ">
        <LocateMap
          width={20}
          height={20}
        />
        <p>{address}</p>
      </div>
    </Card>
  );
}
