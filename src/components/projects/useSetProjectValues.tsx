import { FormInstance } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function useSetProjectValues(form: FormInstance, data: any) {
  const { i18n } = useTranslation();
  useEffect(() => {
    const members =
      data && typeof data !== "boolean" && Array.isArray(data.members)
        ? data.members.map((el) => ({
            value: el?.userInfo?.id,
            label: el?.userInfo?.name,
          }))
        : [];
    if (data && typeof data === "object") {
      form.setFieldValue("name", data?.projectName);
      form.setFieldValue("description", data?.description);
      form.setFieldValue(
        "orgId",
        data?.orgId && {
          value: data?.orgId,
          label: data?.orgInfo?.title,
        },
      );
      form.setFieldValue(
        "deptId",
        data?.deptId && {
          value: data?.deptId,
          label: data?.departmentInfo?.[i18n.language == "ar" ? "nameAr" : "nameEn"],
        },
      );
      form.setFieldValue("startDate", data?.startDate ? dayjs(data?.startDate) : null);
      form.setFieldValue("endDate", data?.endDate ? dayjs(data?.endDate) : null);
      form.setFieldValue("MemberIds", members || []);
    }
  }, [data, form]);
}
export default useSetProjectValues;
