import {
  getCommitteeTags,
  getMeetingTags,
  getProjectsTags,
} from "@/services/home";
import { useQuery } from "@tanstack/react-query";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { LuCalendarCheck } from "react-icons/lu";
import FlatButton from "../ui/FlatButton";
import PriorityCounts from "./PriorityCounts";
import HomeStatistics from "./HomeStatistics";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import CommitteeStatistics from "./CommitteeStatistics";

export default function CategoryPanel() {
  const { t } = useTranslation();
  const [displayedCategory, setdisplayedCategory] = useState("meetings");
  const { data, isFetching: meetingLoading } = useQuery({
    queryKey: ["MeetingTags"],
    queryFn: () => getMeetingTags(),
  });
  const { data: committeeTags, isFetching: committeeLoading } = useQuery({
    queryKey: ["CommitteeTags"],
    queryFn: () => getCommitteeTags(),
  });
  const { data: projectsTags, isFetching: projectLoading } = useQuery({
    queryKey: ["ProjectsTags"],
    queryFn: () => getProjectsTags(),
  });

  const statistics = data?.data?.priorities;
  const committeeStatistics = committeeTags?.data?.priorities;
  const projectStatistics = projectsTags?.data?.statuses;

  const meetingsPriority = [
    {
      bgcolor: "white",
      count:
        statistics?.filter((el) => el?.priorityTypeId == 2)?.[0]?.counter || 0,
      color: "#D10008",
      text: t("veryImportant"),
      icon: <LuCalendarCheck className="text-2xl" />,
      isLoading: meetingLoading,
    },
    {
      bgcolor: "white",
      count:
        statistics?.filter((el) => el?.priorityTypeId == 1)?.[0]?.counter || 0,
      color: "#E88A0A",
      text: t("important"),
      icon: <LuCalendarCheck className="text-2xl" />,
      isLoading: meetingLoading,
    },
    {
      bgcolor: "white",
      count:
        statistics?.filter((el) => el?.priorityTypeId == 3)?.[0]?.counter || 0,
      color: "#4CADCF",
      text: t("notImportant"),
      icon: <LuCalendarCheck className="text-2xl" />,
      isLoading: meetingLoading,
    },
  ];
  const committeesPriority = [
    {
      bgcolor: "white",
      count:
        committeeStatistics?.filter((el) => el?.typeId == 3)?.[0]?.counter || 0,
      color: "#F0A02A",
      text: t("statuses:permanentCommittees"),
      isLoading: committeeLoading,
      icon: <FaUserShield className="text-2xl" />,
    },
    {
      bgcolor: "white",
      count:
        (committeeStatistics?.filter((el) => el?.typeId == 1)?.[0]?.counter ||
          0) +
        (committeeStatistics?.filter((el) => el?.typeId == 4)?.[0]?.counter ||
          0),
      color: "#12704C",
      text: t("statuses:fixedCommittees"),
      isLoading: committeeLoading,
      icon: <FaUserShield className="text-2xl" />,
    },
    {
      bgcolor: "white",
      count:
        committeeStatistics?.filter((el) => el?.typeId == 2)?.[0]?.counter || 0,
      color: "#5ECCE8",
      text: t("statuses:procurementCommittees"),
      isLoading: committeeLoading,
      icon: <FaUserShield className="text-2xl" />,
    },
  ];
  const projectsPriority = [
    {
      bgcolor: "white",
      count:
        projectStatistics?.filter((el) => el?.statusId == 3)?.[0]?.counter || 0,
      color: "#0CC981",
      text: t("statuses:completed"),
      isLoading: projectLoading,
      icon: <HiDocumentText className="text-2xl" />,
    },
    {
      bgcolor: "white",
      count:
        projectStatistics?.filter((el) => el?.statusId == 2)?.[0]?.counter || 0,
      color: "#F59E0B",
      text: t("statuses:ongoing"),
      isLoading: projectLoading,
      icon: <HiDocumentText className="text-2xl" />,
    },
    {
      bgcolor: "white",
      count:
        (projectStatistics?.filter((el) => el?.statusId == 1)?.[0]?.counter ||
          0) +
          projectStatistics?.filter((el) => el?.statusId == 5)?.[0]?.counter ||
        0,
      color: "#D10008",
      text: t("statuses:incomplete"),
      isLoading: projectLoading,
      icon: <HiDocumentText className="text-2xl" />,
    },
  ];

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg">
        <div className="pt-3 px-3 flex gap-5">
          <FlatButton
            content={"meetings"}
            isClicked={displayedCategory == "meetings"}
            onClick={() => setdisplayedCategory("meetings")}
          />
          <FlatButton
            content={"committeesCouncils"}
            isClicked={displayedCategory == "committees"}
            onClick={() => setdisplayedCategory("committees")}
          />
          <FlatButton
            content={"projects"}
            isClicked={displayedCategory == "projects"}
            onClick={() => setdisplayedCategory("projects")}
          />
        </div>
        <Divider
          type="vertical"
          className="bg-gray-200 text-[1px] w-[98%] px-3 py-0 "
        />
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2 ">
          {displayedCategory == "meetings" &&
            meetingsPriority.map((props, index) => (
              <div key={index} className="flex justify-between">
                <PriorityCounts key={index} {...props} />
                <div className="bg-gray-100 text-[1px] w-[1px] h-full p-0" />
              </div>
            ))}

          {displayedCategory == "committees" &&
            committeesPriority.map((props, index) => (
              <div key={index} className="flex justify-between">
                <PriorityCounts key={index} {...props} />
                <div className="bg-gray-100 text-[1px] w-[1px] h-full p-0" />
              </div>
            ))}
          {displayedCategory == "projects" &&
            projectsPriority.map((props, index) => (
              <div key={index} className="flex justify-between">
                <PriorityCounts key={index} {...props} />
                <div className="bg-gray-100 text-[1px] w-[1px] h-full p-0" />
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white mt-5 rounded-lg">
        {displayedCategory == "meetings" && <HomeStatistics />}
        {displayedCategory == "committees" && <CommitteeStatistics />}
      </div>
    </div>
  );
}
