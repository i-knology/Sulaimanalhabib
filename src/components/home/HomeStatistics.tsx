import { getMeetingStatistics } from "@/services/home";
import { years } from "@/utils/getYears";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import ApexCharts from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import CardWithHeader from "./StatisticsCard";

export default function HomeStatistics() {
  const { t } = useTranslation();
  const categories = [
    t("months:january"),
    t("months:february"),
    t("months:march"),
    t("months:april"),
    t("months:may"),
    t("months:june"),
    t("months:july"),
    t("months:august"),
    t("months:september"),
    t("months:october"),
    t("months:november"),
    t("months:december"),
  ];

  const { data } = useQuery({
    queryKey: ["MeetingStatistics"],
    queryFn: () =>
      getMeetingStatistics().then(({ data }) => {
        // const displayedArr: number[] = [];
        // const details: { External: number; Internal: number; Total: number }[] = [];
        const periods = data?.periods ?? {};
        const { totaly } = data;

        const displayedArr = categories.map((_, index) => {
          const period = periods[index + 1];

          if (period) return period.Total ?? 0;
          return 0;
        });

        const details = categories
          .map((_, index) => {
            const period = periods[index + 1];

            if (period)
              return {
                Total: period?.Total || 0,
                Internal: period?.Internal || 0,
                External: period?.External || 0,
              };
          })
          .filter((e) => e);

        // categories.forEach((_, idx: number) => {
        //   const periodIndex = idx + 1;
        //   const period = data?.periods[`${periodIndex}`];
        //   displayedArr.push(period?.Total || 0);
        //   details.push({
        //     Total: period?.Total || 0,
        //     Internal: period?.Internal || 0,
        //     External: period?.External || 0,
        //   });
        // });

        return { details, displayedArr, totaly };
      }),
  });

  return (
    <CardWithHeader
      titleSlot={
        <div className="flex justify-between w-full">
          <div className="flex bg-gray-100 w-full rounded-lg px-3 py-2 gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <span>{t("meetings")}</span>
              {/* {isFetching ? (
                <Skeleton
                  circle={true}
                  className="mx-2"
                  baseColor="white"
                  height={42}
                  width={50}
                />
              ) : (
                <span className="text-primary p-2 rounded-full bg-white mx-2">
                  {data?.totaly || 0}
                </span>
                )} */}
              <span className="text-primary p-2 rounded-full bg-white mx-2">
                {data?.totaly || 0}
              </span>
            </div>
            <Select
              suffixIcon={<IoIosArrowDown className="text-xl text-black" />}
              defaultValue={{
                label: (
                  <div className="flex items-center">
                    <SlCalender className="text-2xl text-content" />
                    <span className="mx-1 font-semibold text-content">
                      {2024}
                    </span>
                  </div>
                ),
              }}
              className="h-full border-none bg-white rounded-lg"
              options={years}
            />
          </div>
        </div>
      }
      className="col-span-2"
    >
      <ApexCharts
        series={[
          {
            name: t("meetings"),
            data: data?.displayedArr ?? [],
          },
        ]}
        type="bar"
        width={"100%"}
        height={350}
        options={{
          chart: {
            type: "bar",
            toolbar: {
              show: false,
            },
          },
          grid: {
            show: false,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "10px",
              borderRadius: 5,
              colors: {
                backgroundBarColors: ["#F8FAFB"],
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          colors: ["#88CB60"],
          xaxis: {
            categories,
          },
          yaxis: {
            show: true,
            opposite: true,
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: (_, { dataPointIndex }) => {
                const detail = data?.details?.[dataPointIndex];
                console.log(dataPointIndex, detail, data);
                if (!detail) return JSON.stringify(data?.details);

                return `
                  ${t("total")}: ${detail?.Total || 0}<br>
                  ${t("internalMeetings")}: ${detail?.Internal || 0}<br>
                  ${t("externalMeetings")}: ${detail?.External || 0}
                `;
              },
            },
          },
        }}
      />
    </CardWithHeader>
  );
}
