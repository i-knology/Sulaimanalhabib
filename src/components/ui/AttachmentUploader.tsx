import type { UploadProps } from "antd";
import { Upload } from "antd";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function AttachmentUploader({ ...props }: UploadProps) {
  const { Dragger } = Upload;
  const { t } = useTranslation();
  return (
    <Dragger
      beforeUpload={() => false}
      listType="picture"
      {...props}
    >
      <div className="flex items items-center justify-center text-center gap-2">
        <AiOutlineCloudUpload size={28} />
        <span className="text-gray-400">{t("dragAndDropFiles")}</span>
        <span className="text-black">{t("uploadFile")}</span>
      </div>
    </Dragger>
  );
}
