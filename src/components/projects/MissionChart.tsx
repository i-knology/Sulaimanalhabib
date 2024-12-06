import { Avatar, Space, Typography } from "antd";
// import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import { getMissionStatistics } from "@/services/projects";

export default function MissionChart() {
//   const { projectId } = useParams();

//   const { data } = useQuery({
//     queryKey: ["projectMissionsStatistics", projectId],
//     queryFn: () => getMissionStatistics(projectId),
//   });

//   console.log(data);

  const series = [12, 8, 5];
  const total = series.reduce((acc, value) => acc + value, 0);

  const chartOptions: ApexOptions = {
    chart: {
      height: 250,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "22px",
          },
          total: {
            show: true,
            label: "Total",
            fontSize: "22px",
            formatter: () => total.toString(),
          },
        },
      },
    },

    colors: ["#86C960", "#E88A0A", "#939393"],
    labels: ["Apples", "Oranges", "Bananas"],
  };

  return (
    <div className="grid grid-cols-2 gap-12">
      <div>
        {/* <ReactApexChart
          options={chartOptions}
          series={series}
          type="radialBar"
          height={250}
        /> */}
      </div>
      <div className="flex flex-col items-center justify-around">
        <div>
          <Space direction="horizontal">
            <Avatar size={20} style={{ backgroundColor: "#E88A0A" }}></Avatar>
            <Typography.Text>Ant Design (default)</Typography.Text>
          </Space>
          <Typography.Paragraph className="px-7">5</Typography.Paragraph>
        </div>
        <div>
          <Space direction="horizontal">
            <Avatar size={20} style={{ backgroundColor: "#86C960" }}></Avatar>
            <Typography.Text>Ant Design (default)</Typography.Text>
          </Space>
          <Typography.Paragraph className="px-7">8</Typography.Paragraph>
        </div>
        <div>
          <Space direction="horizontal">
            <Avatar size={20} style={{ backgroundColor: "#939393" }}></Avatar>
            <Typography.Text>Ant Design (default)</Typography.Text>
          </Space>
          <Typography.Paragraph className="px-7">12</Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}
