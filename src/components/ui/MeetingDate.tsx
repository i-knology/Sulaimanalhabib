import { Button } from "antd";
import { FaRegCalendarPlus } from "react-icons/fa";

export default function MeetingDate() {
  return (
    <Button
      className="bg-gradient-to-t from-primary/[0.92] to-secondary/[0.92] font-bold text-lg group duration-300"
      id={"headerButton"}
      shape="circle"
    >
      <FaRegCalendarPlus className="text-2xl text-white group-hover:text-black transition-colors duration-300" />
    </Button>
  );
}
