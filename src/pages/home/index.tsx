import CheckCircle from "@/assets/icons/checkCircle.svg?react";
import Hourglass from "@/assets/icons/hourglass.svg?react";
import Info from "@/assets/icons/info.svg?react";
import CurrenCourseCard from "@/components/courses/CurrenCourseCard";
import HomeCalendar from "@/components/home/Calendar";
import HeroSection from "@/components/home/HeroSection";
import StatisticCard from "@/components/home/StatisticCard";
import StatisticChart from "@/components/home/StatisticChart";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="flex-1 w-full space-y-4">
        <HeroSection />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          <StatisticCard
            icon={<Info />}
            title={t("currentCourses")}
            count={12}
            color="green"
          />
          <StatisticCard
            icon={<Hourglass />}
            title={t("incomingCourses")}
            count={12}
            color="orange"
          />
          <span className="sm:col-span-2 xl:col-span-1">
            <StatisticCard
              icon={<CheckCircle />}
              title={t("completedCourses")}
              count={12}
              color="default"
            />
          </span>
        </div>
        <StatisticChart />
      </div>
      <div className="flex-1 w-full md:max-w-[350px] space-y-3">
        <HomeCalendar />
        <CurrenCourseCard />
        <CurrenCourseCard />
      </div>
    </div>
  );
}
