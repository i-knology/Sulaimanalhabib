import { Divider, Dropdown, Flex, MenuProps, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import LanguageBtn from "./languageBtn";
import MeetingDate from "./MeetingDate";
import MobileMenu from "./MobileMenu";
import Notification from "./Notification";
// import ThemeToggle from "./ThemeToggle";

import { logout } from "@/redux/slices/loginSlice";
import Color from "color";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menueItems: MenuProps["items"] = [
    {
      label: (
        <button
          onClick={() => {
            navigate("/profile");
          }}
          className="w-full text-sm"
        >
          <div className="flex flex-col w-full">
            <p className="flex gap-2 items-center !mb-0 text-sm w-full">
              <span
                style={{ backgroundColor: `${Color("#22baed").alpha(0.03)}` }}
                className={"p-2 rounded-full"}
              >
                <IoPersonOutline size={20} color="#22baed" />
              </span>
              {t("profile")}
            </p>
          </div>
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button
          onClick={() => {
            dispatch(logout());
          }}
          className="w-full text-sm"
        >
          <div className="flex flex-col w-full">
            <p className="flex gap-2 items-center !mb-0 text-sm w-full">
              <span
                style={{ backgroundColor: `${Color("#22baed").alpha(0.03)}` }}
                className={"p-2 rounded-full"}
              >
                <CiLogout
                  size={20}
                  color="#22baed"
                />
              </span>
              {t("logOut")}
            </p>
          </div>
        </button>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <div className="p-2 grid grid-cols-1 gap-2 justify-between items-center md:flex h-18 bg-white sticky top-0 z-10 shadow-sm shadow-gray-200">
        <Flex align="center">
          <Divider className="py-4 px-[2px] bg-[#22BEEF]" type="vertical" />
          <Typography className="text-2xl ">
            {t(location.pathname.split("/")?.[1] || "home")}
          </Typography>
        </Flex>

        <div className="flex items-center gap-2 lg-md:gap-8 bg-white">
          <Divider
            className="px-0 mx-0"
            style={{
              borderInlineStart: "1px solid #F2F2F21A",
              height: "20px",
            }}
            type="vertical"
          />

          <div className="flex w-full justify-between">
            <div className="flex w-full items-center gap-4  justify-around lg-md:justify-between bg-white">
              <MeetingDate />
              <LanguageBtn />
              {/* <ThemeToggle /> */}
              <Notification />

              <div className="lg-md:hidden">
                <MobileMenu />
              </div>

              <div className="hidden lg-md:block">
                <Divider
                  className="py-4 px-[.5px] bg-gray-300"
                  type="vertical"
                />
              </div>
            </div>

            <div className="hidden lg-md:flex w-full">
              <Dropdown
                menu={{ items: menueItems }}
                trigger={["click"]}
              >
                <Space className="cursor-pointer flex justify-between">
                  <div className="flex items-center mx-2">
                    <img
                      src="/illustrations/profile-image.svg"
                      alt=""
                    />
                    <div className="mx-2 text-sm">
                      <p>Mohamed</p>
                      <p className="text-gray-400">المنصب</p>
                    </div>
                  </div>
                  <HeaderButton
                    icon={
                      <IoIosArrowDown className="text-xl text-[#22BEEF]" />
                    }
                  />
                </Space>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
