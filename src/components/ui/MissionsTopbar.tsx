import { Avatar, Button, Dropdown, Segmented, Tooltip } from "antd";
import { MenuProps } from "antd/lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchBox from "./SearchBox";

export default function MissionTopBar({
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
    return (
        <div className="p-2 rounded-md bg-white flex items-center gap-3 justify-between flex-wrap md:flex-nowrap">

            <div className="flex items-center gap-[8px]">
                <h6>{t("missionResponsibility")}</h6>
                <Avatar.Group
                    size={'small'}
                    max={{
                        count: 2,
                        style: {
                            color: "#22baed",
                            backgroundColor: "#F3F4F6",
                            cursor: "pointer",
                        },
                        popover: { trigger: "click" },
                    }}
                >
                    <Avatar className="bg-[#87d068]" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"></Avatar>
                    <Avatar className="bg-[#87d068]">RO</Avatar>
                    <Avatar className="bg-[#87d068]">MA</Avatar>
                    <Avatar className="bg-[#87d068]">SH</Avatar>

                </Avatar.Group>
            </div>
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
        </div>
    );
}
