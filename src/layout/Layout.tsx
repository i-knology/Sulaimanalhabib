import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="flex items-start min-h-[calc(100dvh-5rem)] lg:ps-[270px]">
        <Sidebar />
        <div className="p-4 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
