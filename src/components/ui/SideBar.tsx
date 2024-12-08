import { useTranslation } from "react-i18next";
import { FaUsersGear } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { RiHomeLine } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/logo.png";

export default function SideBar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  // const [isCollapsed, setIsCollapsed] = useState(false);

  // const handleToggle = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  const menuItems = [
    {
      icon: <RiHomeLine className="text-2xl" />,
      path: "/",
      content: t("home"),
    },
    {
      icon: <LuCalendarCheck className="text-2xl" />,
      path: "/meetings",
      content: t("meetings"),
    },
    // {
    //   icon: <SlCalender className="text-2xl" />,
    //   path: "/",
    //   content: t("calendar"),
    // },
    {
      icon: <IoDocumentTextOutline className="text-2xl" />,
      path: "/projects",
      content: t("projects"),
    },
    {
      icon: <FaUsersGear className="text-2xl" />,
      path: "/committees-councils",
      content: t("committeesCouncils"),
    },
    // {
    //   icon: <HiSquare3Stack3D className="text-2xl" />,
    //   path: "/logistic-items",
    //   content: t("logisticItems"),
    // },
    {
      icon: <TbUsersGroup className="text-2xl" />,
      path: "/members",
      content: t("members"),
    },
    // {
    //   icon: <BiTask className="text-2xl" />,
    //   path: "/tasks",
    //   content: t("tasks"),
    // },
    // {
    //   icon: <BiTrip className="text-2xl" />,
    //   path: "/trips",
    //   content: t("trips"),
    // },
  ];

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="sidebar-container sticky top-0 h-screen w-full"
    >
      <Sidebar
        className="h-dvh w-full"
        // collapsed={isCollapsed}
      >
        <Menu className="bg-[#02151F] min-h-dvh text-gray-300 w-full p-3">
          <div
            // className={!isCollapsed ? "p-5" : "py-2 mx-2"}
            className={"flex items-center justify-center mb-6"}
            // onClick={handleToggle}
          >
            <img
              className="w-3/4"
              src={logo}
              alt="logo"
            />
          </div>

          {menuItems.map((item, idx) => (
            <MenuItem
              key={idx}
              className={`${location.pathname === item.path ? "bg-[#17352B] rounded-lg" : ""}
              
              
              `}
              icon={item.icon}
              component={
                <Link
                  to={item.path}
                  title={item.content}
                  aria-label={item.content}
                  className="!px-2 text-sm hover:!bg-transparent"
                />
              }
            >
              {item.content}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
}
