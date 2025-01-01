import Chart from "@/assets/icons/chart.svg?react";
import Statistics from "@/assets/icons/statistics.svg?react";
import { List } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const sideMenuLinks = [
  {
    title: "statistics",
    path: "/",
    icon: <Statistics />,
  },
  {
    title: "courses",
    path: "/courses",
    icon: <Chart />,
  },
];

export default function Sidebar() {
  const { t } = useTranslation();
  return (
    <div className="fixed hidden lg:block top-20 h-[calc(100dvh-5rem)] bg-white left-0 rtl:left-auto rtl:right-0 w-[270px]">
      <List>
        {sideMenuLinks.map((item) => (
          <List.Item
            key={item.path}
            className="!p-0 !ps-3 my-3 !last:mb-0"
          >
            <Link
              to={item.path}
              title={item.title}
              className="p-3 rounded-s-lg flex items-center w-full relative group font-medium text-gray-600
                hover:text-primary hover:bg-primary/5"
            >
              {/* hover:text-primary bg-primary/5 text-primary */}
              <div className="inline-flex items-center gap-2">
                {item.icon}
                <span>{t(item.title)}</span>
              </div>

              {/* <span className="absolute left-0 w-1  rounded-full bg-primary top-1/2 -translate-y-1/2 h-[calc(100%-1rem)] "></span> */}
            </Link>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
