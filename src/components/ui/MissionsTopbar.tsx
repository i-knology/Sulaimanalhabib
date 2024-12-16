import { getMembers } from "@/services/meetings";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuPlus, LuSettings2 } from "react-icons/lu";
import MembersForm from "../missions/MembersForm";
import SearchBox from "./SearchBox";

export default function MissionTopBar({ search, onMemberClick, onNew }) {
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
              <Avatar
                src={member.profilePicture}
                key={member.id}
                onClick={() => onMemberClick(member.id)}
                alt={member.name ?? member.email}
              >
                {member.name}
              </Avatar>
            ))}
          </Avatar.Group>
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
