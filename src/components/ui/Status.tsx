import Color from "color";

export default function Status({
  color,
  text,
  className,
}: {
  color: string;
  text: string;
  className?: string;
}) {
  const bgColor = Color(color).alpha(0.1).string();
  const textColor = color;

  return (
    <p
      className={`px-3 py-2 rounded-md text-sm text-center ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {text}
    </p>
  );
}
