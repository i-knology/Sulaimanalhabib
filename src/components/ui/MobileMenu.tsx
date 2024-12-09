import { logout } from "@/redux/slices/loginSlice";
import { Divider, Drawer, Flex, Image, Typography } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { CiGlobe, CiLogout } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import logo from "../../../public/logo.png";
import HeaderButton from "./HeaderButton";
import MobileMenuItem from "./MobileMenuItem";
import { menuItems } from "./SideBar";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <HeaderButton
        icon={
          <GiHamburgerMenu
            color="black"
            size={20}
          />
        }
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
        classNames={{
          body: "bg-menu",
        }}
      >
        <Flex
          justify="space-between"
          className="text-2xl gap-6 mt-1 "
        >
          <img
            src={logo}
            alt="logo"
            width={100}
          />
          <IoCloseOutline
            className="cursor-pointer text-white"
            size={36}
            onClick={() => setIsOpen(false)}
          />
        </Flex>

        <Divider />
        <Flex
          className="p-3 rounded-md border border-white/20 "
          align="center"
        >
          <Image
            src="/illustrations/profile-image.svg"
            alt=""
            width={40}
            height={40}
          />
          <div className="mx-2 text-sm">
            <p className="text-white">Mohamed</p>
            <p className="text-gray-400">المنصب</p>
          </div>

          <span className="flex-1"></span>
          <BiChevronLeft
            size={24}
            className="text-white flex-shrink-0"
          />
        </Flex>
        <Divider />

        <Typography className="text-white">{t("menu")}</Typography>
        <Flex
          vertical
          className="text-xl my-5"
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="w-full"
            >
              <MobileMenuItem
                key={index}
                route={{
                  name: t(item.content),
                  path: item.path,
                  icon: item.icon,
                }}
                fontSize={16}
                onChange={() => setIsOpen(false)}
              />
              <Divider className="my-2" />
            </div>
          ))}
        </Flex>
        <Typography className="text-white">{t("additionalLinks")}</Typography>
        <Flex
          vertical
          className="my-4"
        >
          {/* <MobileMenuItem
            route={{
              name: t("addNewMeeting"),
              path: "#newMeeting",
              icon: <FaRegCalendarPlus size={20} />,
            }}
            fontSize={16}
            onChange={() => {
              console.log("dddd");
            }}
          />
          <Divider className="my-2" /> */}
          <MobileMenuItem
            route={{
              name: t("changeLanguage"),
              path: "#changeLanguage",
              icon: <CiGlobe size={20} />,
            }}
            fontSize={16}
            onChange={() => {
              console.log("dddd");
            }}
          />
          <Divider className="my-2" />
          <MobileMenuItem
            route={{
              name: t("logOut"),
              path: "#logout",
              icon: <CiLogout size={20} />,
            }}
            fontSize={16}
            onChange={() => {
              dispatch(logout());
            }}
          />
        </Flex>
      </Drawer>
    </>
  );
}
