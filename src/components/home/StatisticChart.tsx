import Calendar from "@/assets/icons/calendar.svg?react";
import { years } from "@/utils/getYears";
import { Card, Select, Space, Typography } from "antd";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

export default function StatisticChart() {
  const { t } = useTranslation();

  return (
    <Card
      classNames={{
        body: "!p-3",
      }}
    >
      <Space className="bg-gray-100 p-3 rounded-lg justify-between w-full items-center">
        <Typography.Title
          level={4}
          className="!mb-0 !text-base"
        >
          {t("coursesStatistics")}
        </Typography.Title>
        <Select
          suffixIcon={<Calendar />}
          placeholder={t("year")}
          options={years}
          className="w-24"
        />
      </Space>
      <ReactApexChart
        options={{
          chart: {
            type: "bar",
            height: 350,
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
              columnWidth: 10,
              borderRadius: 5,
              borderRadiusApplication: "end",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: false,
          },
          xaxis: {
            categories: [
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
            ],
          },
          yaxis: {
            show: false,
          },

          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val.toString();
              },
            },
          },
        }}
        series={[
          {
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 100, 10, 12],
          },
        ]}
        type="bar"
        height={350}
      />
    </Card>
  );
}
