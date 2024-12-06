import { Typography } from "antd";
import Color from "color";

export default function MeetingStatus({
  status,
  id,
}: {
  status: string;
  id: number;
}) {
  const color = id === 3 ? "#D10008" : id === 1 ? "#4CADCF" : "#E88A0A";
  return (
    <Typography.Paragraph
      style={{
        color: color,
        backgroundColor: Color(color).alpha(0.1).toString(),
      }}
      ellipsis={{
        rows: 1,
      }}
      className="rounded-lg px-2 py-1 text-center"
    >
      {status || "-"}
    </Typography.Paragraph>
  );
}
