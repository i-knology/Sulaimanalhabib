import Delete from "@/assets/icons/delete.svg?react";
import useResultModal from "@/hooks/useModal";
import { removeMember } from "@/services/projects";
import { useMutation } from "@tanstack/react-query";
import { Button, Image, List, Typography } from "antd";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export interface Member {
  id?: string;
  userInfo: {
    id: string;
    name: string;
    profilePictureUrl: string;
  };
  typeLookupInfo: {
    nameAr: string;
    nameEn: string;
  };
}
interface MemberCardProp {
  member: Member;
  refetch: () => void;
}

export default function TeamMemberCard({ member, refetch }: MemberCardProp) {
  const { t, i18n } = useTranslation();
  const { confirm, success, error } = useResultModal();
  const { projectId } = useParams();

  const onSuccess = () => {
    refetch();
    success({
      title: `${t("removedSuccessfully")}`,
      subtitle: "",
    });
  };

  const onError = (err: AxiosError) => {
    error(err?.response?.data?.[0]?.errorMessage || "someThingWentWrong", "");
  };

  const mutation = useMutation({
    mutationFn: (value: { userId: string | undefined; projectId: string | undefined }) =>
      removeMember(value),
    onSuccess,
    onError,
  });

  const handleConfirm = async () => {
    await confirm({
      title: t("confirmMemberRemovalTitle"),
      subtitle: t("confirmMemberRemovalSubtitle"),
    }).then(() => {
      mutation.mutate({ userId: member?.id, projectId });
    });
  };

  return (
    <List.Item className="border-t border-t-gray-200 first:border-t-0 first:!pt-0 w-full">
      <div className="flex items-center gap-3 w-full">
        <Image
          width={40}
          height={40}
          src={member?.userInfo?.profilePictureUrl}
          fallback="/profile.png"
          preview={false}
          className="flex-shrink-0 rounded-full cursor-pointer object-cover"
          alt={member?.userInfo?.name}
        />
        <div className="flex-1">
          <Typography className="font-medium">{member?.userInfo?.name}</Typography>
          <Typography.Paragraph className="text-gray-600 !mb-0">
            {i18n.language == "ar"
              ? member?.typeLookupInfo?.nameAr
              : member?.typeLookupInfo?.nameEn}
          </Typography.Paragraph>
        </div>
        <Button
          className="!rounded-lg !bg-red-500/5 text-red-500 !w-10 h-10 !min-w-10"
          onClick={() => {
            handleConfirm();
          }}
          icon={<Delete />}
          type="primary"
        />
      </div>
    </List.Item>
  );
}
