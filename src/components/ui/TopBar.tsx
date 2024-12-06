import { Button, Dropdown, Segmented } from "antd";
import { MenuProps } from "antd/lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCategory } from "react-icons/bi";
import { IoOptionsOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { PiListDashesDuotone } from "react-icons/pi";
import SearchBox from "./SearchBox";

export default function TopBar({
  openDrawer,
  displayItems,
  text,
  search,
  items,
}: {
  text?: string;
  openDrawer?: () => void;
  displayItems?: (value: boolean) => void;
  search?: (value: string) => void;
  items?: MenuProps["items"];
}) {
  const { t } = useTranslation();
  const [triggerItemAs, setTriggerItemAs] = useState(false);
  return (
    <div className="p-2 rounded-md bg-white flex items-center gap-3 flex-wrap md:flex-nowrap">
      {search && (
        <div className="flex-1 flex-shrink-0 md:max-w-xs">
          <SearchBox
            onChange={(e) => {
              search(e.target.value);
            }}
            variant="filled"
          />
        </div>
      )}

      {displayItems && (
        <Segmented
          className="overflow-hidden"
          options={[
            {
              icon: <PiListDashesDuotone size={24} />,
              value: true,
            },
            {
              icon: <BiCategory size={24} />,
              value: false,
            },
          ]}
          defaultValue={!triggerItemAs}
          onChange={() => {
            setTriggerItemAs(!triggerItemAs);
            displayItems(!triggerItemAs);
          }}
        />
      )}

      {items && (
        <>
          {
            <div className="bg-semiGray p-3 rounded-lg">
              <Dropdown menu={{ items }}>
                <IoOptionsOutline color="#88CB60" size={26} />
              </Dropdown>
            </div>
          }
        </>
      )}

      <span className="flex-1 hidden md:inline-block"></span>

      {openDrawer && (
        <Button
          onClick={openDrawer}
          id="topBarBtn"
          className="bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92] w-full md:w-[23%] justify-self-end group flex items-center gap-2 overflow-hidden"
          htmlType="button"
          type="primary"
        >
          <span className="flex items-center justify-center transition-all duration-500 xl:group-hover:-translate-x-[-230%] group-hover:-translate-x-[-182%] md:group-hover:-translate-x-[-190%] lg:group-hover:-translate-x-[-195%]">
            <LuPlus size={35} />
          </span>

          <p className="absolute -left-[100%] transition-all duration-500 md:group-hover:left-[10%] group-hover:left-[35%] xl:group-hover:left-[29%] lg:group-hover:left-[13%]">
            <span>{text || t("add")}</span>
          </p>
        </Button>
      )}
    </div>
  );
}
