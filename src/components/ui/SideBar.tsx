import ProjectIcon from "@/assets/icons/projects.svg?react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/logo.png";
import MissionIcon from "./MissionIcon";

export const menuItems = [
  {
    icon: <ProjectIcon />,
    path: "/",
    content: "projects",
  },
  {
    icon: <MissionIcon />,
    path: "/missions",
    content: "missions",
  },
  // {
  //   icon: <FaUsersGear className="text-2xl" />,
  //   path: "/committees-councils",
  //   content: "committeesCouncils",
  // },

  // {
  //   icon: <TbUsersGroup className="text-2xl" />,
  //   path: "/members",
  //   content: "members",
  // },
];

export default function SideBar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="sidebar-container sticky top-0 h-screen w-full"
    >
      <Sidebar
        className="h-dvh w-full"
        // collapsed={isCollapsed}
      >
        <Menu className="bg-menu min-h-dvh text-gray-300 w-full p-3">
          <div
            // className={!isCollapsed ? "p-5" : "py-2 mx-2"}
            className={"flex items-center justify-center mb-6"}
            // onClick={handleToggle}
          >
            <img
              src={logo}
              alt="logo"
              width={100}
            />
          </div>

          {menuItems.map((item, idx) => (
            <MenuItem
              key={idx}
              className={`${location.pathname === item.path ? "bg-primary/20 rounded-lg" : ""}
              
              
              `}
              icon={item.icon}
              component={
                <Link
                  to={item.path}
                  title={t(item.content)}
                  aria-label={t(item.content)}
                  className="!px-2 text-sm hover:!bg-transparent"
                />
              }
            >
              {t(item.content)}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
}
