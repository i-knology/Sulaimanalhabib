import { faker } from "@faker-js/faker";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
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
  count: 20,
});

export default function CourseAttendees({ onBackClick, onAttendeeClick }) {
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
      <CourseAttendeeList
        users={users}
        onAttendeeClick={onAttendeeClick}
      />
    </div>
  );
}
