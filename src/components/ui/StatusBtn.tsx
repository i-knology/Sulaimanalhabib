import { Button, ButtonProps } from "antd";

interface StatusBtnProps extends ButtonProps {
  text: string;
  count: number;
  bgColor: string;
  isActive?: boolean;
}

export default function StatusBtn({ text, count, bgColor, ...rest }: StatusBtnProps) {
  return (
    <Button
      variant="text"
      type="text"
      className="!text-sm !p-3 !h-auto"
      {...rest}
    >
      <span className={`w-3 h-3 rounded-full ${bgColor} flex-shrink-0`}></span>
      <span className="text-content">{text}</span>
      <span className="text-primary">( {count} )</span>
    </Button>
  );
}
