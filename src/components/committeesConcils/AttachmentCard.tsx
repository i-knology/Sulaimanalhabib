import useResultModal from "@/hooks/useModal";
import { removeDocument } from "@/services/projects";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { FiDownloadCloud } from "react-icons/fi";
import { PiFilePdfLight } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

export default function AttachmentCard({ document: attachment, refetch }) {

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { t } = useTranslation();
  const { confirm, success, error } = useResultModal();
  const { projectId } = useParams();

  const onSuccess = () => {
    refetch();
    success({
      title: `${t("deletedSuccessfully")}`,
      subtitle: "",
    });
  };

  const onError = (err: AxiosError) => {
    error(err?.response?.data?.[0]?.errorMessage || "someThingWentWrong", "");
  };

  const mutation = useMutation({
    mutationFn: (value: {
      documentId: string | undefined;
      projectId: string | undefined;
    }) => removeDocument(value),
    onSuccess,
    onError,
  });

  const handleDelete = async () => {
    await confirm({
      title: t("confirmDocumentRemovalTitle"),
      subtitle: t("confirmDocumentRemovalSubtitle"),
    }).then(() => {
      mutation.mutate({ documentId: attachment?.id, projectId });
    });
  };

  return (
    <div className="p-2 bg-white rounded-lg mb-3">
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
              <span>{attachment?.title}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-green-50 text-primary"
            onClick={() =>
              handleDownload(attachment?.documentUrl, attachment?.title)
            }
          >
            <FiDownloadCloud size={20} />
          </Button>
          <Button
            className="bg-red-50 text-red-700"
            onClick={() => {
              handleDelete();
            }}
          >
            <RiDeleteBinLine size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
