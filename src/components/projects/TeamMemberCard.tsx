import useResultModal from "@/hooks/useModal";
import { removeMember } from "@/services/projects";
import { useMutation } from "@tanstack/react-query";
import { Button, Image } from "antd";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { RiDeleteBinLine } from "react-icons/ri";
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
    mutationFn: (value: {
      userId: string | undefined;
      projectId: string | undefined;
    }) => removeMember(value),
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
    <div className="my-1 ">
      <div className="flex items-center justify-between ">
        <div className="w-full">
          <div className="flex items-center w-full">
            <Image
              width={50}
              src={member?.userInfo?.profilePictureUrl}
              className=" rounded-full cursor-pointer"
              alt=""
            />

            <div className="mx-2 w-full flex flex-col">
              <span>{member?.userInfo?.name}</span>
              <span className="text-primary">
                {i18n.language == "ar"
                  ? member?.typeLookupInfo?.nameAr
                  : member?.typeLookupInfo?.nameEn}
              </span>
            </div>
          </div>
        </div>
        <Button
          className="bg-red-50 text-red-700"
          onClick={() => {
            handleConfirm();
          }}
        >
          <RiDeleteBinLine size={20} />
        </Button>
      </div>
      <div className="h-[1px] bg-semiGray w-full mt-2" />
    </div>
  );
}
