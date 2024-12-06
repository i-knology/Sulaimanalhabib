import { useTranslation } from "react-i18next";
// import { useParams } from "react-router-dom"
import { Button, Checkbox, Divider, List, Typography } from "antd";
import { useMemo, useState } from "react";
import { BiTrip } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { FiDownloadCloud } from "react-icons/fi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { PiFilePdfLight } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";
import { Link } from "react-router-dom";
import DisplayIcon from "../ui/DisplayIcon";
import HrDivider from "../ui/HrDivider";
import ActiveIcon from "./ActiveIcon";
import { LuCalendarClock } from "react-icons/lu";

export default function TripDetails() {
  // const {taskId}=useParams();
  const { t } = useTranslation();
  const [activeBtn, setActiveBtn] = useState("tripTeam");

  const displayTeamMembers = useMemo(() => {
    return activeBtn === "tripTeam"
      ? Array.from({ length: 5 }).map(() => (
          <div className="my-1 " key={Math.random()}>
            <div className="flex items-center justify-between ">
              <div className="w-full">
                <div className="flex items-center w-full">
                  <img
                    src="/illustrations/profile-image.svg"
                    className="w-[13%]"
                    alt=""
                  />

                  <div className="mx-2 w-full flex flex-col">
                    <span>{"mohamed ahmed"}</span>
                    <span className="text-primary">منصب المستخدم</span>
                  </div>
                </div>
              </div>
              <Button
                className="bg-red-50 text-red-700"
                onClick={() => {
                  console.log("Delete");
                }}
              >
                <RiDeleteBinLine size={20} />
              </Button>
            </div>
            <div className="h-[1px] bg-lighborder-lightGray w-full mt-2" />
          </div>
        ))
      : null;
  }, [activeBtn, t]);

  const displayTasks = useMemo(() => {
    return activeBtn === "tripTasks"
      ? Array.from({ length: 2 }).map(() => (
          <div className="p-2 mb-4 rounded-lg bg-white border-solid border-semiGray border-[1px]" key={Math.random()}>
            <Checkbox className="my-2">المهمة</Checkbox>
            <HrDivider />

            <div className="w-full my-1 rounded-lg py-1">
              <div className="flex items-center w-full">
                <img
                  src="/illustrations/profile-image.svg"
                  className="w-[10%]"
                  alt=""
                />

                <div className="mx-2 w-full flex flex-col">
                  <span>{"mohamed ahmed"}</span>
                  <span className="text-content">منصب المستخدم</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 p-3">
             <div className="flex items-center gap-2">
             <DisplayIcon>
                <LuCalendarClock color="gray" size={22} />
              </DisplayIcon>
              <p>
                <span className="text-content">{t("startDate")}</span> الاحد 12
                ديسمبر 2023{" "}
              </p>
             </div>
             <div className="flex items-center gap-2">
             <DisplayIcon>
                <LuCalendarClock color="gray" size={22} />
              </DisplayIcon>
              <p>
                <span className="text-content">{t("endDate")}</span> الاحد 12
                ديسمبر 2023{" "}
              </p>
             </div>
            </div>
          </div>
        ))
      : null;
  }, [activeBtn, t]);

  const displayLogisticsItems = useMemo(() => {
    return activeBtn === "logisticsItems" ? (
      <div>
        {Array.from({ length: 4 }).map(() => (
          <div className="mb-6" key={Math.random()}>
            <Checkbox>المهمة</Checkbox>
          </div>
        ))}
        <div className="p-2">
          <p className="text-content mt-4 mb-2">{t("notes")}</p>
          <span>{t("noNotes")}</span>
        </div>
      </div>
    ) : null;
  }, [activeBtn, t]);

  const displayAttachments = useMemo(() => {
    return activeBtn === "tripAttachments"
      ? Array.from({ length: 6 }).map(() => (
          <div className="p-2 bg-white rounded-lg mb-3" key={Math.random()}>
            <div className="flex items-center px-1 justify-between">
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className="bg-red-50 text-red-700"
                    onClick={() => {
                      console.log("Delete");
                    }}
                  >
                    <PiFilePdfLight size={30} />
                  </div>

                  <div className="mx-2 w-full flex flex-col">
                    <span>{"اسم الملف"}</span>
                    <span className="text-lightGray">{"15 MB"}</span>
                  </div>
                </div>
              </div>
              <Button
                className="bg-green-50 text-primary"
                onClick={() => {
                  console.log("Delete");
                }}
              >
                <FiDownloadCloud size={20} />
              </Button>
            </div>
          </div>
        ))
      : null;
  }, [activeBtn, t]);

  return (
    <div>
      <div className="bg-white mx-2 my-1 flex items-center justify-between">
        <p className="flex items-center py-4 px-2 rounded-lg">
          <Link to={"/trips"} className="text-primary">
            {t("trips")}
          </Link>{" "}
          <MdOutlineKeyboardArrowLeft size={24} />
          <span>{t("tripDetails")}</span>{" "}
        </p>
        <button className="mx-2">
          <DisplayIcon>
            <RxDotsHorizontal color="#22baed" size={20} />
          </DisplayIcon>
        </button>
      </div>

      <div className="grid mt-3 grid-cols-1 gap-1 lg:grid-cols-12 lg:gap-8 p-2">
        <div className="rounded-lg bg-white p-4 col-span-5 min-h-full">
          <div className="">
            <div className="flex items-center justify-between">
              <span>{t("tripDetails")}</span>
              <DisplayIcon>
                <FaRegEdit color="black" size={20} />
              </DisplayIcon>
            </div>
            <div className="my-3">
              <HrDivider />
            </div>

            <div className="flex justify-between items-center gap-10">
              <div>
                <label className="flex gap-2 items-center !mb-0 text-base ">
                  <DisplayIcon bgColor="#22baed">
                    <BiTrip size={24} color="#22baed" />
                  </DisplayIcon>
                  عنوان الرحلة
                </label>
              </div>
            </div>
            <Typography.Paragraph className="mt-3 text-content">
              لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي
              تستخدم بشكل شائع لتوضيح الشكل المرئي للمستند لوريم إيبسوم طريقة
              لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم بشكل شائع لتوضيح
              الشكل المرئي للمستند
            </Typography.Paragraph>

            <Divider className="my-2 border-lightGray" />

            <List className="bg-lightGray rounded-lg py-4">
              <div className="grid grid-cols-2 px-3">
                <List.Item className="!justify-start !p-0">
                  <div className="flex flex-col gap-2">
                    <span className="text-content">{t("tripEndDate")}</span>
                    <span>12 نوفمبر 2023</span>
                  </div>
                </List.Item>
                <List.Item className="!justify-start !p-0">
                  <div className="flex flex-col gap-2">
                    <span className="text-content">{t("tripStartDate")}</span>
                    <span>12 نوفمبر 2023</span>
                  </div>
                </List.Item>
              </div>
            </List>

            <div className="my-4">
              <span className="my-4">{t("startAndEndPoint")}</span>
              <div className="grid grid-cols-12">
                <div className="col-span-1 flex flex-col justify-center items-center">
                  <div className="m-1">
                    <ActiveIcon />
                  </div>

                  <div className="h-full bg-content w-[.5px]" />
                </div>
                <div className="col-span-11">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-content">{t("startPointFrom")}</p>
                    </div>
                    <div>
                      <p className="text-content">
                        {t("durationOfStay")}{" "}
                        <span className="text-primary mx-1">
                          4{" " + t("days")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xl mb-2">السعودية، الرياض</p>
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-1 flex flex-col justify-center items-center">
                  <div className="m-1">
                    {/* <IdleIcon /> */}
                  </div>

                  <div className="h-full bg-content w-[.5px]" />
                </div>
                <div className="col-span-11">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-content">{t("startPointFrom")}</p>
                    </div>
                    <div>
                      <p className="text-content">
                        {t("durationOfStay")}{" "}
                        <span className="text-primary mx-1">
                          4{" " + t("days")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xl mb-2">السعودية، الرياض</p>
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-1 flex flex-col justify-center items-center">
                  <div className="m-1">
                    {/* <IdleIcon /> */}
                  </div>

                  <div className="h-full bg-white w-[.5px]" />
                </div>
                <div className="col-span-11">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-content">{t("startPointFrom")}</p>
                    </div>
                    <div>
                      <p className="text-content">
                        {t("durationOfStay")}{" "}
                        <span className="text-primary mx-1">
                          4{" " + t("days")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xl">السعودية، الرياض</p>
                </div>
              </div>
            </div>

            <div className="my-4">
              <span className="my-4">{t("tripManager")}</span>
              <div className="w-full my-1 bg-lightGray rounded-lg p-1">
                <div className="flex items-center w-full">
                  <img
                    src="/illustrations/profile-image.svg"
                    className="w-[13%]"
                    alt=""
                  />

                  <div className="mx-2 w-full flex flex-col">
                    <span>{"mohamed ahmed"}</span>
                    <span className="text-primary">منصب المستخدم</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full rounded-lg bg-lightGray col-span-7">
          <div className="bg-white rounded-lg p-1">
            <div className="bg-lightGray rounded-lg gap-1 flex mx-2 my-1 p-1">
              <Button
                className={`w-1/3 text-black border-none ${
                  activeBtn !== "tripTeam" ? "bg-transparent" : ""
                }`}
                variant="filled"
                onClick={() => setActiveBtn("tripTeam")}
              >
                {t("tripTeam")}
              </Button>

              <Button
                variant="filled"
                className={`w-1/3 text-black border-none ${
                  activeBtn !== "tripTasks" ? "bg-transparent" : ""
                }`}
                onClick={() => setActiveBtn("tripTasks")}
              >
                {t("tripTasks")}
              </Button>

              <Button
                className={`w-1/3 text-black border-none ${
                  activeBtn !== "logisticsItems" ? "bg-transparent" : ""
                }`}
                variant="filled"
                onClick={() => setActiveBtn("logisticsItems")}
              >
                {t("logisticsItems")}
              </Button>

              <Button
                className={`w-1/3 text-black border-none ${
                  activeBtn !== "tripAttachments" ? "bg-transparent" : ""
                }`}
                variant="filled"
                onClick={() => setActiveBtn("tripAttachments")}
              >
                {t("tripAttachments")}
              </Button>
            </div>
          </div>

          <div className="bg-white p-2">{displayTeamMembers}</div>
          <div className="bg-white p-2 ">{displayTasks}</div>
          <div>{displayAttachments}</div>
          <div className="bg-white p-2 ">{displayLogisticsItems}</div>
        </div>
      </div>
    </div>
  );
}
