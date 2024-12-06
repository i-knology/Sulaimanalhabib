import { t } from "i18next";
import { cloneElement } from "react";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";

export default function MobileMenuItem({
  route,
  onChange,

  fontSize = 24,
}) {
  return (
    <NavLink
      to={route.path}
      key={route.key}
      onClick={onChange}
      className={() =>
        location.pathname === route.path
          ? "active-class w-full flex bg-primary text-white rounded-lg"
          : "inactive-class w-full rounded-lg"
      }
    >
      <div className="flex my-2 gap-2 ">
        {cloneElement(route?.icon ?? <RxDashboard />,)}
        <p
          style={{
            fontSize: fontSize,
          }}
        >
          {t(route.name)}
        </p>
      </div>
    </NavLink>
  );
}
