import Color from "color";
import { ReactNode } from "react";

export default function DisplayIcon({
  children,
  bgColor,
}: {
  children: ReactNode;
  bgColor?: string;
}) {
  return (
    <div
      style={{ backgroundColor: `${Color(bgColor).alpha(0.05) || "#FAFAFA"}` }}
      className="flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full"
    >
      {children}
    </div>
  );
}
