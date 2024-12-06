import { useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Notification() {
  const navigate =useNavigate();
  return (
    <>
      <HeaderButton onClick={()=>navigate("/notifications")} icon={<IoNotificationsOutline className="text-2xl" />} />
    </>
  );
}
