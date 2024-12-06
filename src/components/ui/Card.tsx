import { Card as AndCard, CardProps } from "antd";

export default function Card({ className, ...props }: CardProps) {
  return (
    <AndCard
      className={`p-0 border-none shadow-lg shadow-gray-100 rounded-2xl ${className}`}
      size="small"
      {...props}
    />
  );
}
