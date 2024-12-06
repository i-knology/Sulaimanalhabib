import { Typography } from "antd";
import Color from "color";
import React from "react";

export default function StatusButton({
  color,
  icon,
  count,
  text,
  bgcolor = "",
}: {
  color: string;
  icon: React.ReactElement;
  count: number | string;
  text: string;
  bgcolor?: string;
}) {
  return (
    <div
      className="flex flex-col gap-2 py-3 px-4 border-[#00000008] border-solid border rounded-lg"
      style={{
        boxShadow: "0px 4px 75px 0px #00000008",
        minWidth: "150px",
        backgroundColor: bgcolor,
      }}
    >
      <div className="flex items-center justify-between m-0 p-0">
        <div className="flex flex-col justify-between items-center">
          <Typography.Text className="font-semibold text-lg font-su">
            {text}
          </Typography.Text>
          <Typography.Text
            style={{
              color: color,
              fontSize: "1.5rem",
            }}
          >
            {count}
          </Typography.Text>
        </div>
        <div>
          <div
            style={{
              backgroundColor: Color(color).alpha(0.1).string(),
            }}
            className="w-14 h-12 rounded-xl flex items-center justify-center"
          >
            {React.cloneElement(icon, {
              style: { color: color },
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
