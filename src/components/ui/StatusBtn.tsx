import { Button } from "antd";

export default function StatusBtn({
  text,
  count,
  bgColor,
}: {
  text: string;
  count: string;
  bgColor: string;
}) {
  return (
    <Button variant="text" type="text" className="p-2">
      <span className={`w-3 h-3 rounded-full ${bgColor} flex-shrink-0`}></span>
      <span className="text-content">{text}</span>
      <span className="text-primary">( {count} )</span>
    </Button>
  );
}
