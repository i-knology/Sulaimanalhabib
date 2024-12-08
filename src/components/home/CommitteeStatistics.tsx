import { getCommitteeStatistics } from "@/services/home";
import { years } from "@/utils/getYears";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import ApexCharts from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import Skeleton from "react-loading-skeleton";
import CardWithHeader from "./StatisticsCard";

export default function CommitteeStatistics() {
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

  const { data, isFetching } = useQuery({
    queryKey: ["CommitteeStatistics"],
    queryFn: () =>
      getCommitteeStatistics().then(({ data }) => {
        const displayedArr: number[] = [];
        const details: {
          permanentCommittees: number;
          fixedCommittees: number;
          procurementCommittees: number;
          Total: number;
        }[] = [];

        if (data?.periods) {
          data?.periods.forEach((period) => {
            const {
              Total,
              "لجان مشتريات": procurementCommittees = 0,
              مجالس: fixedCommittees2 = 0,
              "لجان دائمة": permanentCommittees = 0,
              "لجان عادية": fixedCommittees = 0,
            } = period.value;
            displayedArr.push(Total || 0);
            details.push({
              Total: Total || 0,
              permanentCommittees: permanentCommittees,
              procurementCommittees: procurementCommittees,
              fixedCommittees: fixedCommittees + fixedCommittees2,
            });
          });
        }
        return { displayedArr, details, totaly: data?.totaly };
      }),
  });

  const displayedArr = data?.displayedArr || [];
  const details = data?.details || [];
  const totaly = data?.totaly || 0;

  return (
    <CardWithHeader
      titleSlot={
        <div className="flex justify-between w-full">
          <div className="flex bg-gray-100 w-full rounded-lg px-3 py-2 gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <span>{t("committees")}</span>
              {isFetching ? (
                <Skeleton
                  circle={true}
                  baseColor="white"
                  height={40}
                  width={40}
                />
              ) : (
                <span className="text-primary p-2 rounded-full bg-white mx-2">
                  {totaly}
                </span>
              )}
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
            data: displayedArr,
          },
        ]}
        type="bar"
        width={"100%"}
        height={350}
        options={{
          chart: {
            type: "bar",
            toolbar: { show: false },
          },
          grid: { show: false },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "10px",
              borderRadius: 5,
              colors: { backgroundBarColors: ["#F8FAFB"] },
            },
          },
          dataLabels: { enabled: false },
          legend: { show: false },
          colors: ["#88CB60"],
          xaxis: { categories },
          yaxis: { show: true, opposite: true },
          tooltip: {
            enabled: true,
            y: {
              formatter: (_, { dataPointIndex }) => {
                const detail = details[dataPointIndex];
                if (!detail) return t("noDataAvailable");
                return `
                  ${t("total")}: ${detail?.Total || 0}<br>
                  ${t("statuses:permanentCommittees")}: ${
                  detail?.permanentCommittees || 0
                }<br>
                  ${t("statuses:fixedCommittees")}: ${
                  detail?.fixedCommittees || 0
                }<br>
                  ${t("statuses:procurementCommittees")}: ${
                  detail?.procurementCommittees || 0
                }
                `;
              },
            },
          },
        }}
      />
    </CardWithHeader>
  );
}
