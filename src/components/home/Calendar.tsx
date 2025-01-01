import { Button, Calendar, Card, Row, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function HomeCalendar() {
  const { i18n } = useTranslation();
  const projectStartedDate = dayjs().clone().add(-1, "month").startOf("month");
  const projectEndDate = dayjs().clone().add(1, "year").startOf("month");
  const [_selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  //   const [pageSize, setPageSize] = useState(6);

  //   const { data } = useQuery({
  //     enabled: !!selectedDate,
  //     queryKey: ["invitationStatisticsRequest  s", { selectedDate }],
  //     queryFn: () =>
  //       instance
  //         .get("hospitality/statistics/calender", {
  //           params: {
  //             year: selectedDate?.format("YYYY"),
  //             month: selectedDate?.format("MM"),
  //           },
  //         })
  //         .then((res) => res.data),
  //   });

  //   const {
  //     data: invitations,
  //     isPending,
  //     refetch,
  //   } = useQuery({
  //     enabled: !!selectedDay,
  //     queryKey: ["invitationStatisticsRequests", { selectedDay, pageSize }],
  //     queryFn: () =>
  //       instance
  //         .get("hospitality/admin-request", {
  //           params: {
  //             date: selectedDay?.format("YYYY-MM-DD"),
  //             statuses: ["approved", "completed", "inPlace", "current"],
  //             pageSize,
  //           },
  //         })
  //         .then((res) => {
  //           return res.data;
  //         }),
  //   });

  function headerRender({ value, onChange }) {
    return (
      <div className="-mb-3 py-4 px-2">
        <div className="w-full gap-4 flex items-center">
          <Typography.Title
            level={4}
            className="!mb-0 flex-1"
          >
            {value.format("MMM YYYY")}
          </Typography.Title>
          <Row className="gap-2">
            <Button
              className="!w-10 h-10 !rounded-full bg-gray-50 border-none"
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
                const now = value.clone().add(-1, "months");

                if (value.isAfter(projectStartedDate)) {
                  setSelectedDate(now);
                  onChange(now);
                }
              }}
              icon={
                i18n.language == "ar" ? <LuChevronRight size={20} /> : <LuChevronLeft size={20} />
              }
            />
            <Button
              className="!w-10 h-10 !rounded-full bg-gray-50 border-none"
              onClick={() => {
                const now = value.clone().month(value.month() + 1);
                if (value.isBefore(projectEndDate)) {
                  setSelectedDate(now);
                  onChange(now);
                }
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

  //   const findVisitsByDay = (current) =>
  //     data?.data?.find((e) => dayjs(e.day).format("YYYY-MM-DD") == current?.format("YYYY-MM-DD"))
  //       ?.visitCount ?? 0;

  function fullCellRender(current, info) {
    // const count = findVisitsByDay(current);
    if (info.type === "date")
      return (
        <Button
          type={
            current?.format("YYYY-MM-DD") == selectedDay?.format("YYYY-MM-DD") ? "primary" : "text"
          }
          className={`!w-10 !h-10 !rounded-full flex-col align-middle !gap-0`}
        >
          <p>{current.date()}</p>
          {/* {count >= 1 && (
            <Badge
              status="success"
              className="!leading-[0px] !-mb-[6px]"
              classNames={{
                indicator: "!bg-secondary",
              }}
            />
          )} */}
        </Button>
      );

    return info.originNode;
  }

  return (
    <Card
      className="border-none"
      classNames={{
        body: "!px-2 !py-1",
      }}
    >
      <Calendar
        headerRender={headerRender}
        fullCellRender={fullCellRender}
        fullscreen={false}
        onSelect={(date) => setSelectedDay(date)}
        validRange={[projectStartedDate, projectEndDate]}
        disabledDate={(date) => date.isBefore(projectStartedDate)}
      />
    </Card>
  );
}
