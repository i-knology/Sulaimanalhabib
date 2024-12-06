import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { HiOutlineDownload } from "react-icons/hi";
import { PiFilePdfLight } from "react-icons/pi";

export default function TaskAttachments() {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <p className="text-primary">{t("attachments")}</p>

        <div className="p-2 bg-white rounded-lg mb-3 border-[1px] my-2 border-solid border-gray-200 ">
          <div className="flex items-center px-1 justify-between">
            <div className="w-full">
              <div className="flex items-center w-full">
                <div
                  className="bg-red-50 text-red-700"
                  onClick={() => {
                    console.log("Delete");
                  }}
                >
                  <PiFilePdfLight size={30} />
                </div>

                <div className="mx-2 w-full flex flex-col">
                  <span>{"اسم الملف"}</span>
                  <span className="text-gray-300">{"15 MB"}</span>
                </div>
              </div>
            </div>

            <Button
              variant="text"
              className="bg-gray-100 text-content"
              onClick={() => {
                console.log("Delete");
              }}
            >
              <HiOutlineDownload size={20} />
            </Button>
          </div>
        </div>
        
        <div className="p-2 bg-white rounded-lg mb-3 border-[1px] my-2 border-solid border-gray-200 ">
          <div className="flex items-center px-1 justify-between">
            <div className="w-full">
              <div className="flex items-center w-full">
                <div
                  className="bg-red-50 text-red-700"
                  onClick={() => {
                    console.log("Delete");
                  }}
                >
                  <PiFilePdfLight size={30} />
                </div>

                <div className="mx-2 w-full flex flex-col">
                  <span>{"اسم الملف"}</span>
                  <span className="text-gray-300">{"15 MB"}</span>
                </div>
              </div>
            </div>

            <Button
              variant="text"
              className="bg-gray-100 text-content"
              onClick={() => {
                console.log("Delete");
              }}
            >
              <HiOutlineDownload size={20} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
