import { useEffect } from "react";
import { FormInstance } from "antd";

interface Member {
  typeId: number;
  userInfo: { id: string; name: string };
}

interface CommitteeData {
  isInternal?: boolean;
  typeId?: number;
  title?: string;
  description?: string;
  members?: Member[];
}

export const useSetCommitteeFormValues = (
  form: FormInstance,
  data?: CommitteeData
) => {
  useEffect(() => {
    if (!data) return;

    form.setFieldsValue({
      IsInternal: data.isInternal,
      TypeId: data.typeId,
      Title: data.title,
      Description: data.description,
      CommitteeManagerId: data.members?.find((el) => el.typeId === 1)?.userInfo?.id,
      CommitteeDecisionId: data.members?.find((el) => el.typeId === 2)?.userInfo?.id,
      MemberIds: data.members
        ?.filter((el) => el.typeId !== 2 && el.typeId !== 1)
        ?.map((el) => el.userInfo.id),
    });
  }, [form, data]);
};
