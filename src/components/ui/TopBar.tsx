import { Button, Dropdown, InputProps, Segmented } from "antd";
import { MenuProps } from "antd/lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuPlus } from "react-icons/lu";
import GridIcon from "./GridIcon";
import OptionsSettingIcon from "./OptionsSettingIcon";
import SearchBox from "./SearchBox";
import TableIcon from "./TableIcon";

interface TopBarProps {
  text?: string;
  openDrawer?: () => void;
  displayItems?: (value: boolean) => void;
  search?: (value: string) => void;
  items?: MenuProps["items"];
  searchProps?: InputProps;
}

export default function TopBar({
  openDrawer,
  displayItems,
  text,
  search,
  items,
  searchProps,
}: TopBarProps) {
  const { t } = useTranslation();
  const [triggerItemAs, setTriggerItemAs] = useState(false);
  return (
    <div className="p-3 rounded-xl bg-white flex items-center gap-3 flex-wrap md:flex-nowrap">
      {search && (
        <div className="flex-1 flex-shrink-0 md:max-w-xs">
          <SearchBox
            {...searchProps}
            onChange={(e) => {
              search(e.target.value);
            }}
          />
        </div>
      )}

      {displayItems && (
        <Segmented
          className="overflow-hidden"
          options={[
            {
              icon: <TableIcon />,
              value: true,
            },
            {
              icon: <GridIcon />,
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
                <OptionsSettingIcon />
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
          className="bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92] md:w-auto w-full justify-self-end group flex items-center gap-2 overflow-hidden"
          htmlType="button"
          type="primary"
        >
          <span className="flex items-center justify-center transition-all duration-500">
            <LuPlus size={24} />
          </span>

          <p className="transition-all duration-500">
            <span>{text || t("add")}</span>
          </p>
        </Button>
      )}
    </div>
  );
}
