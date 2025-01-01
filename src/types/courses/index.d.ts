import { PresetColorType } from "antd/lib/_util/colors";
import { LiteralUnion } from "antd/lib/_util/type";

declare type CourseStatus = "current" | "ongoing";

declare interface StatusAttributes {
  color: LiteralUnion<PresetColorType>;
  label: string;
}

declare type AttendStatusType = "attend" | "notAttend";
