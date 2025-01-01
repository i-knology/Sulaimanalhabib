import { faker } from "@faker-js/faker";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Attendance from "./Attendance";
import CourseAttendees from "./CourseAttendees";
import CourseContent from "./CourseContent";
import CourseDates from "./CourseDates";

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.displayName(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    avatar: faker.image.url(),
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 4,
});

export default function CourseDetails({ open, setOpen }) {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState("details");

  const title =
    activeStep == "courseDates"
      ? t("courseDates")
      : activeStep == "attendees"
      ? t("courseAttendee")
      : activeStep == "attendance"
      ? t("attendance")
      : t("courseDetails");

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      placement="left"
      title={title}
      width={512}
      footer={
        activeStep == "details" && (
          <Button
            type="primary"
            className="!w-full"
            onClick={() => setActiveStep("courseDates")}
          >
            {t("courseDates")}
          </Button>
        )
      }
    >
      {(() => {
        switch (activeStep) {
          case "courseDates":
            return <CourseDates onBackClick={() => setActiveStep("details")} />;
          case "attendees":
            return (
              <CourseAttendees
                onBackClick={() => setActiveStep("details")}
                onAttendeeClick={() => setActiveStep("attendance")}
              />
            );
          case "attendance":
            return <Attendance onBackClick={() => setActiveStep("details")} />;

          default:
            return (
              <CourseContent
                onAttendeeClick={() => setActiveStep("attendance")}
                onViewClick={() => setActiveStep("attendees")}
              />
            );
        }
      })()}
    </Drawer>
  );
}
