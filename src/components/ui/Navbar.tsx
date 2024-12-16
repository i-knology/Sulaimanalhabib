import { Divider, Dropdown, Flex, Image, MenuProps, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import LanguageBtn from "./languageBtn";
import MobileMenu from "./MobileMenu";
import Notification from "./Notification";
// import ThemeToggle from "./ThemeToggle";
import {} from "react-redux";

import { logout } from "@/redux/slices/loginSlice";
import Color from "color";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
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
                <IoPersonOutline
                  size={20}
                  color="#22baed"
                />
              </span>
              {t("profile")}
            </p>
          </div>
        </button>
      ),
      key: "0",
      className: "!p-2 border-t border-t-gray-100 first:border-t-0",
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
      className: "!p-2 border-t border-t-gray-100 first:border-t-0",
    },
  ];

  return (
    <>
      <div className="p-3 justify-between items-center flex h-20 bg-white sticky top-0 z-10 shadow-sm shadow-gray-100">
        <Flex align="center">
          <Divider
            className="h-6 w-1 bg-primary rounded-full"
            type="vertical"
          />
          <Typography className="text-lg">
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
              <LanguageBtn />
              {/* <ThemeToggle /> */}
              <Notification />

              <div className="lg-md:hidden">
                <MobileMenu />
              </div>

              <div className="hidden lg-md:block mx-2">
                <Divider
                  className="py-4 px-[.5px] bg-gray-100"
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
                  <div className="flex items-center mx-2 whitespace-nowrap">
                    <Image
                      src={user?.imageProfile}
                      alt={user?.fullName}
                      fallback="/profile.png"
                      sizes="small"
                      width={40}
                      height={40}
                      className="w-full rounded-full object-fill"
                      preview={false}
                    />
                    <div className="mx-2 text-sm">
                      <p>{user?.fullName}</p>
                      <p className="text-gray-400">{user?.mobileNo}</p>
                    </div>
                  </div>
                  <HeaderButton icon={<IoIosArrowDown className="text-xl text-[#22BEEF]" />} />
                </Space>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
