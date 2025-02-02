import { Button, Divider, Dropdown, Image, MenuProps, Space } from "antd";
import { useTranslation } from "react-i18next";
import { CiLogout } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { PiBellSimple, PiMagnifyingGlass } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
// import ThemeToggle from "./ThemeToggle";
import {} from "react-redux";

import { logout } from "@/redux/slices/loginSlice";
import { LuChevronDown } from "react-icons/lu";
import { useDispatch } from "react-redux";
import MobileSideMenu from "./MobileSideMenu";

export default function Navbar() {
  const { t, i18n } = useTranslation();
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
              <span className={"p-2 rounded-full bg-gray-50 text-gray-600"}>
                <IoPersonOutline size={20} />
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
              <span className={"p-2 rounded-full bg-gray-50 text-gray-600"}>
                <CiLogout size={20} />
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
        <a
          href={import.meta.env.VITE_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          title={import.meta.env.VITE_APP_NAME}
          aria-label={import.meta.env.VITE_APP_NAME}
        >
          <img
            src="/logo.png"
            width={250}
            // height={78}
            alt={import.meta.env.VITE_APP_NAME}
          />
        </a>
        {/* <Flex align="center">
          <Divider
            className="h-6 w-1 bg-primary rounded-full"
            type="vertical"
          />
          <Typography className="text-lg">
            {t(location.pathname.split("/")?.[1] || "home")}
          </Typography>
        </Flex> */}

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
              <Button
                icon={<PiMagnifyingGlass size={22} />}
                shape="circle"
                size="middle"
                type="primary"
                className="bg-gray-50 text-gray-700 hover:!bg-gray-50 hover:!text-gray-700"
              />
              <Button
                shape="circle"
                size="middle"
                type="primary"
                className="font-medium bg-gray-50 text-gray-700 hover:!bg-gray-50 hover:!text-gray-700 hidden md:block"
                onClick={() => {
                  i18n.changeLanguage(i18n.language == "ar" ? "en" : "ar");
                  localStorage.setItem(
                    "locale",
                    i18n.language == "ar" ? "en" : "ar"
                  );
                }}
              >
                {i18n.language == "ar" ? "ع" : "EN"}
              </Button>
              <Button
                icon={<PiBellSimple size={22} />}
                shape="circle"
                size="middle"
                type="primary"
                className="bg-gray-50 text-gray-700 hover:!bg-gray-50 hover:!text-gray-700"
              />

              <div className="lg:mx-2">
                <Divider
                  className="py-4 px-[.5px] bg-gray-100"
                  type="vertical"
                />
              </div>
            </div>

            <div className="hidden lg-md:flex w-full">
              <Dropdown menu={{ items: menueItems }} trigger={["click"]}>
                <Space className="cursor-pointer flex justify-between">
                  <div className="flex items-center mx-2 whitespace-nowrap">
                    <Image
                      //   src={user?.imageProfile}
                      //   alt={user?.fullName}
                      fallback="/profile.png"
                      sizes="small"
                      width={40}
                      height={40}
                      className="w-full rounded-full object-fill"
                      preview={false}
                    />
                    <div className="mx-2 text-sm">
                      <p>Moahmmed Ahmed</p>
                      <p className="text-gray-400">نوع الحساب</p>
                      {/* <p>{user?.fullName}</p>
                      <p className="text-gray-400">{user?.mobileNo}</p> */}
                    </div>
                  </div>
                  <Button
                    icon={<LuChevronDown size={20} />}
                    shape="circle"
                    size="small"
                    type="primary"
                    className="bg-gray-50 text-gray-700 hover:!bg-gray-50 hover:!text-gray-700"
                  />
                </Space>
              </Dropdown>
            </div>
          </div>

          <MobileSideMenu />
        </div>
      </div>
    </>
  );
}

