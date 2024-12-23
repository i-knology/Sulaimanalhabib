import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

export default function ProjectStatistic({ series }) {
  const { t } = useTranslation();

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={{
            chart: {
              height: 200,
              type: "radialBar",
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  total: {
                    show: true,
                    label: t("mission"),
                    fontFamily: "SuisseIntl",
                    fontWeight: 600,
                    fontSize: "14px",
                    formatter: (v) => {
                      return series.reduce((a, b) => a + b, 0);
                    },
                  },
                },
              },
            },
            legend: {
              show: true,
              fontFamily: "SuisseIntl",
              fontWeight: 500,
              fontSize: "14px",
              formatter: (name, opt) => {
                return `<p class="mx-2">${name}</p><p class="mx-2"> ${
                  opt?.w?.config?.series?.[opt?.seriesIndex] ?? ""
                }</p>`;
              },
            },
            labels: [t("ongoingMissions"), t("completedMissions"), t("notStartedMissions")],
          }}
          series={series ?? []}
          type="radialBar"
          height={200}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
