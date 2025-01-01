import CourseCard from "@/components/courses/CourseCard";
import CourseDetails from "@/components/courses/CourseDetails";
import CurrenCourseCard from "@/components/courses/CurrenCourseCard";
import HomeCalendar from "@/components/home/Calendar";
import { Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Courses() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="flex-1 w-full space-y-4">
        <Typography className="text-lg font-semibold">{t("allCourses")}</Typography>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3">
          {Array.from({
            length: 4,
          })
            .fill(0)
            .map((_, i) => (
              <CourseCard
                key={i}
                onClick={() => setOpen(true)}
              />
            ))}
        </div>
      </div>
      <div className="flex-1 w-full md:max-w-[350px] space-y-3">
        <HomeCalendar />
        <CurrenCourseCard />
        <CurrenCourseCard />
      </div>
      <CourseDetails
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
