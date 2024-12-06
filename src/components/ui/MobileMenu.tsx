import { Drawer, Flex } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { BiTask, BiTrip } from "react-icons/bi";
import { FaUsersGear } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline, IoDocumentTextOutline } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { RiHomeLine } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import logo from "../../../public/logo.png";
import HeaderButton from "./HeaderButton";
import MobileMenuItem from "./MobileMenuItem";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
    {
      icon: <BiTrip className="text-2xl" />,
      path: "/trips",
      content: t("trips"),
    },
    {
      icon: <TbUsersGroup className="text-2xl" />,
      path: "/members",
      content: t("members"),
    },
    {
      icon: <BiTask className="text-2xl" />,
      path: "/tasks",
      content: t("tasks"),
    },
  ];

  return (
    <>
      <HeaderButton
        icon={<GiHamburgerMenu color="black" size={20} />}
        onClick={() => setIsOpen(!isOpen)}
      />

      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={() => setIsOpen(false)}
        open={isOpen}
        width={"100%"}
        headerStyle={{
          display: "none",
        }}
      >
        <IoCloseOutline
          className="cursor-pointer"
          size={36}
          onClick={() => setIsOpen(false)}
        />

        <Flex
          vertical
          style={{
            backgroundColor: "#F2F2F2",
          }}
          justify="center"
          className=" text-2xl gap-6 mt-1"
        >
          <div className="fixed-item  bg-primary rounded-lg flex justify-center">
            <div className={"py-2 mx-2 w-1/2"}>
              <img className="w-full" src={logo} alt="logo" />
            </div>
          </div>
        </Flex>

        <Flex vertical className="text-xl my-5 items-center justify-center">
          {menuItems.map((item, index) => (
            <div key={index} className="w-full">
              <MobileMenuItem
                key={index}
                route={{
                  name: item.content,
                  path: item.path,
                  icon: item.icon,
                }}
                fontSize={16}
                onChange={() => setIsOpen(false)}
              />
              <div className="border-[.5px] border-solid border-gray-100"></div>
            </div>
          ))}

          {/* <div className="my-5">
            <MobileMenuItem
              route={{
                name: t("profile"),
                path: "/profile",
                icon: <CiUser />,
              }}
              fontSize={16}
              onChange={() => setIsOpen(false)}
            />
            <MobileMenuItem
              route={{
                name: t("logout"),
                path: "/logout",
                icon: <IoIosLogOut />,
              }}
              danger={true}
              fontSize={16}
              onChange={() => {
                setIsOpen(false);
              }}
            />
          </div> */}
        </Flex>
      </Drawer>
    </>
  );
}
