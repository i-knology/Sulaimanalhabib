import { Button } from "antd";
import { useTranslation } from "react-i18next";

export default function FlatButton({
  content,
  isClicked,
  onClick
}: {
  content: string;
  isClicked: boolean;
  onClick:()=>void
}) {
  const { t } = useTranslation();
  return (
    <>
      <Button
      onClick={onClick}
        className={`w-full ${
          isClicked
            ? "bg-lightGray border-solid border-secondary text-black"
            : "bg-gray-100 text-content border-none hover:bg-lightGray hover:text-black hover:border-solid"
        }`}
      >
        {t(String(content))}
      </Button>
    </>
  );
}
