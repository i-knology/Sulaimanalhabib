import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsHourglassBottom } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { PiWarningCircleLight } from "react-icons/pi";
import StatusCard from "./StatusCard";
import { useState } from "react";

export default function StatusPanel() {
    
  const [status, setStatus] = useState("all");
  const statusCards = [
    {
      isActive: status == "all",
      icon: (
        <FaRegFileAlt color={status == "all" ? "#00A77D" : "gray"} size={24} />
      ),
      color: "#027747",
      text: "statuses:all",
    },
    {
      isActive: status == "new",
      icon: (
        <BsHourglassBottom
          color={status == "new" ? "#00A77D" : "gray"}
          size={24}
        />
      ),
      color: "#BB6BD9",
      text: "statuses:new",
    },
    {
      isActive: status == "completed",
      icon: (
        <AiOutlineCheckCircle
          color={status == "completed" ? "#00A77D" : "gray"}
          size={24}
        />
      ),
      color: "#027747",
      text: "statuses:completed",
    },
    {
      isActive: status == "overdue",
      icon: (
        <MdBlock color={status == "overdue" ? "#00A77D" : "gray"} size={24} />
      ),
      color: "#B32318",
      text: "statuses:overdue",
    },
    {
      isActive: status == "inProgress",
      icon: (
        <PiWarningCircleLight
          color={status == "inProgress" ? "#00A77D" : "gray"}
          size={24}
        />
      ),
      color: "#020209",
      text: "statuses:inProgress",
    },
  ];
  return (
    <>
      <div className="grid md:grid-cols-5 grid-cols-2 gap-2">
        {statusCards.map((card, index) => (
          <StatusCard
            onClick={() => {
              setStatus(card.text.split(":")?.[1]);
            }}
            isActive={card.isActive}
            key={index}
            icon={card.icon}
            color={card.color}
            text={card.text}
          />
        ))}
      </div>
    </>
  );
}
