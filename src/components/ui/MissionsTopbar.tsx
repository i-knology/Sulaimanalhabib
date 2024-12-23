import { getMembers } from "@/services/meetings";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuPlus, LuSettings2 } from "react-icons/lu";
import { PiX } from "react-icons/pi";
import MembersForm from "../missions/MembersForm";
import SearchBox from "./SearchBox";

export default function MissionTopBar({ search, onMemberClick, onNew, onReset }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await getMembers({
        PageIndex: 1,
        PageSize: 8,
      });
      return response?.data;
    },
  });

  return (
    <>
      <div className="p-2 rounded-md bg-white flex sm:items-center gap-3 flex-col sm:flex-row ">
        <div className="flex items-center gap-[8px]">
          <Button
            icon={<LuSettings2 size={24} />}
            size="small"
            type="text"
            className="text-primary"
            onClick={() => setIsOpen(true)}
          />
          <h6 className="text-sm">{t("missionResponsibility")}</h6>
          <Avatar.Group
            size="small"
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
            {members.map((member) => (
              <Tooltip
                key={member.id}
                title={member.name}
              >
                <Avatar
                  src={member.profilePicture}
                  onClick={() => onMemberClick(member.id)}
                  alt={member.name ?? member.email}
                  className="cursor-pointer"
                >
                  {member.name}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
          <Button
            type="text"
            icon={<PiX size={20} />}
            htmlType="button"
            onClick={onReset}
            size="small"
            color="danger"
          >
            {t("clearFilter")}
          </Button>
        </div>
        <span className="flex-1"></span>

        <div className="flex-shrink-0 inline-flex gap-3 w-full sm:w-auto">
          {search && (
            <SearchBox
              onChange={(e) => {
                search(e.target.value);
              }}
            />
          )}
          <Button
            icon={<LuPlus size={24} />}
            type="primary"
            className="bg-gradient-to-r from-primary to-secondary !rounded-xl flex-shrink-0"
            onClick={onNew}
          />
        </div>
      </div>
      <MembersForm
        onMemberClick={onMemberClick}
        isOpen={isOpen}
        onClose={setIsOpen}
      />
    </>
  );
}
