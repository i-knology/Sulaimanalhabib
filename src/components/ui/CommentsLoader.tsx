import IconLoader from "./IconLoader";
import { Button } from "antd";
import { FiDownloadCloud } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import FormBtn from "./FormBtn";
import { useTranslation } from "react-i18next";

export default function CommentsLoader() {
  const { t } = useTranslation();
  return (
    <div className="p-2 bg-white rounded-lg mb-3">
      {Array.from({ length: 2 })
        .fill(null)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="flex my-1 items-center px-1 justify-between"
            >
              <div className="w-full">
                <div className="flex items-center w-full">
                  <IconLoader />

                  <div className="mx-2 w-full flex flex-col">
                    <Skeleton width={60} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  disabled={true}
                  className="bg-green-50 text-primary"
                >
                  <FiDownloadCloud size={20} />
                </Button>
                <Button
                  disabled={true}
                  className="bg-red-50 text-red-700"
                >
                  <RiDeleteBinLine size={20} />
                </Button>
              </div>
            </div>
          );
        })}

      <FormBtn
        form="committee-form"
        text={t("addAttachments")}
        loading={true}
      />
    </div>
  );
}
