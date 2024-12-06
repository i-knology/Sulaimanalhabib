import { Typography } from "antd";
import Color from "color";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function PriorityCounts({
  color,
  icon,
  count,
  text,
  bgcolor = "",
  isLoading,
}: {
  color: string;
  icon: React.ReactElement;
  count: number | string;
  text: string;
  bgcolor?: string;
  isLoading: boolean;
}) {
  return (
    <div
      className="flex justify-start items-center gap-2 p-2"
      style={{
        backgroundColor: bgcolor,
      }}
    >
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

      <div className="flex flex-col justify-between items-center">
        {isLoading ? (
          <>
            <Skeleton width={50} />
            <Skeleton width={30} />
          </>
        ) : (
          <>
            <Typography.Text className=" text-lg font-su">
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
          </>
        )}
      </div>
    </div>
  );
}
