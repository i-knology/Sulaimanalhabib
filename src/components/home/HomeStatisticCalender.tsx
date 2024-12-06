import instance from "@/utils/instance";
import { useQuery } from "@tanstack/react-query";
import { Badge, Button, Calendar, Row, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function HomeStatisticCalender() {
  const { i18n } = useTranslation();
  //   const projectStartedDate = dayjs().clone().add(-1, "month").startOf("month");
  //   const projectEndDate = dayjs().clone().add(1, "year").startOf("month");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [_, setSelectedDay] = useState<Dayjs | null>(null);
  // const [pageSize, setPageSize] = useState(6);

  const { data } = useQuery({
    enabled: !!selectedDate,
    queryKey: ["invitationStatisticsRequests", { selectedDate }],
    queryFn: () =>
      instance
        .get("adminindex/getcalenderdata", {
          params: {
            year: selectedDate?.format("YYYY"),
            month: selectedDate?.format("MM"),
          },
        })
        .then((res) => res.data),
  });

  function headerRender({ value, onChange }) {
    return (
      <div className="-mb-3 py-4 px-2">
        <div className="w-full gap-4 flex items-center">
          <Typography.Title
            level={4}
            className="!mb-0 flex-1"
          >
            {dayjs(value).locale(i18n.language).format("MMM YYYY")}
          </Typography.Title>
          <Row className="gap-2">
            <Button
              className="!w-10 h-10 rounded-full bg-gray-50 border-none"
              disabled={
                value.format("YYYY-MM") ==
                dayjs(
                  import.meta.env.VITE_PUBLISH_YEAR +
                    "-" +
                    import.meta.env.VITE_PUBLISH_MONTH +
                    "-" +
                    "1",
                ).format("YYYY-MM")
              }
              onClick={() => {
                const now = value.clone().month(value.month() - 1);
                // if (now.isAfter(projectStartedDate)) {
                setSelectedDate(now);
                onChange(now);
                // }
              }}
              icon={
                i18n.language == "ar" ? <LuChevronRight size={20} /> : <LuChevronLeft size={20} />
              }
            />
            <Button
              className="!w-10 h-10 rounded-full bg-gray-50 border-none"
              onClick={() => {
                const now = value.clone().month(value.month() + 1);
                // if (now.isBefore(projectEndDate)) {
                setSelectedDate(now);
                onChange(now);
                // }
              }}
              icon={
                i18n.language == "ar" ? <LuChevronLeft size={20} /> : <LuChevronRight size={20} />
              }
            />
          </Row>
        </div>
      </div>
    );
  }

  function fullCellRender(current, info) {
    const item = data?.data?.find(
      (e) => dayjs(e.dateOfAction).format("YYYY-MM-DD") == current?.format("YYYY-MM-DD"),
    );

    if (info.type === "date")
      return (
        <Button
          //   type={current?.format("YYYY-MM-DD") == current?.format("YYYY-MM-DD") ? "primary" : "text"}
          type="text"
          className={`!w-10 !h-10 rounded-full flex-col align-middle !gap-0`}
          disabled={!item}
        >
          <p>{current.date()}</p>
          <div className="inline-flex gap-0.5">
            {item?.meeting >= 1 && (
              <Badge
                status="success"
                className="!leading-[0px] !-mb-[6px]"
                classNames={{
                  indicator: "!bg-teal-500",
                }}
              />
            )}
            {item?.summons >= 1 && (
              <Badge
                status="success"
                className="!leading-[0px] !-mb-[6px]"
                classNames={{
                  indicator: "!bg-blue-500",
                }}
              />
            )}
            {item?.travel >= 1 && (
              <Badge
                status="success"
                className="!leading-[0px] !-mb-[6px]"
                classNames={{
                  indicator: "!bg-red-500",
                }}
              />
            )}
          </div>
        </Button>
      );

    return info.originNode;
  }

  return (
    <div className="space-y-4">
      <Calendar
        headerRender={headerRender}
        fullCellRender={fullCellRender}
        fullscreen={false}
        onSelect={(date) => setSelectedDay(date)}
        // validRange={[projectStartedDate, projectEndDate]}
      />
    </div>
  );
}
