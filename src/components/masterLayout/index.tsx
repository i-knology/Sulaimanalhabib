import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import SideBar from "../ui/SideBar";

export default function MasterLayout() {
  return (
    <>
      <div className="flex min-h-dvh">
        <div className="flex-shrink-0 w-[250px] lg-md:block hidden">
          <SideBar />
        </div>

        <div className="bg-white flex-1 rounded-s-xl">
          <Navbar />
          <div className="bg-background p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
