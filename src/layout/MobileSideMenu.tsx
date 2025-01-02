import { Button, Drawer, List } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { PiList, PiSignOut, PiX } from "react-icons/pi";
import { Link } from "react-router-dom";
import { sideMenuLinks } from "./Sidebar";

export default function MobileSideMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        icon={<PiList size={22} />}
        onClick={() => setOpen(true)}
        shape="circle"
        size="middle"
        type="primary"
        className="bg-gray-50 text-gray-700 hover:!bg-gray-50 hover:!text-gray-700 lg:hidden"
      />
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        classNames={{
          body: "!bg-primary !p-4",
          header: "!bg-primary !border-b-white/5",
          footer: "!bg-primary !border-t-white/5",
        }}
        title={<span className="text-white">{t("menu")}</span>}
        closeIcon={
          <Button
            icon={<PiX size={20} />}
            shape="circle"
            size="small"
            type="primary"
          />
        }
        footer={
          <Button
            type="primary"
            className="bg-white/5 w-full"
            icon={<PiSignOut size={20} />}
          >
            {t("logOut")}
          </Button>
        }
      >
        <List>
          {sideMenuLinks.map((item) => (
            <List.Item
              key={item.path}
              className="!p-0 my-3 !last:mb-0 !border-none"
            >
              <Link
                to={item.path}
                title={t(item.title)}
                className="p-3 rounded-lg flex items-center w-full relative group font-normal text-white/50
                hover:text-white hover:bg-white/5"
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
      </Drawer>
    </>
  );
}
