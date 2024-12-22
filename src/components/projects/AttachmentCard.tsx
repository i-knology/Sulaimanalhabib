import Delete from "@/assets/icons/delete.svg?react";
import Download from "@/assets/icons/download.svg?react";
import File from "@/assets/icons/file.svg?react";
import useResultModal from "@/hooks/useModal";
import { removeDocument } from "@/services/projects";
import { useMutation } from "@tanstack/react-query";
import { Button, List, Typography } from "antd";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function AttachmentCard({ document: item, refetch }) {
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
    mutationFn: (value: { documentId: string | undefined; projectId: string | undefined }) =>
      removeDocument(value),
    onSuccess,
    onError,
  });

  const handleDelete = async () => {
    await confirm({
      title: t("confirmDocumentRemovalTitle"),
      subtitle: t("confirmDocumentRemovalSubtitle"),
    }).then(() => {
      mutation.mutate({ documentId: item?.id, projectId });
    });
  };

  return (
    <List.Item className="border-t border-t-gray-200 first:border-t-0 first:!pt-0">
      <div className="flex items-center gap-3 w-full">
        <div className="w-10 h-10 flex-shrink-0 inline-flex items-center justify-center bg-lightGray rounded-lg">
          <File />
        </div>
        <div className="flex-1">
          <Typography className="font-medium">{item.title}</Typography>
          <Typography.Paragraph className="text-gray-600 !mb-0">
            {dayjs(item.modifiedDate).format("DD MMMM YYYY h:mmA")}
          </Typography.Paragraph>
        </div>
        <div className="inline-flex gap-2">
          <Button
            type="link"
            href={item.documentUrl}
            download={item.title}
            icon={<Download />}
            className="!rounded-lg !w-10 h-10 !min-w-10"
            disabled={mutation.isPending}
            loading={mutation.isPending}
          />
          {/* delete attachment is missing ENDPOINT */}
          <Button
            type="primary"
            icon={<Delete />}
            className="!rounded-lg !bg-red-500/5 text-red-500 !w-10 h-10 !min-w-10"
            onClick={handleDelete}
            disabled={mutation.isPending}
            loading={mutation.isPending}
          />
        </div>
      </div>
    </List.Item>
  );
}
