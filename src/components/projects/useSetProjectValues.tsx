import { useEffect } from "react";
import dayjs from "dayjs";
import { ProjectFormValues } from "./ProjectForm";
import { FormInstance } from "antd";

function useSetProjectValues(
  form: FormInstance,
  data: ProjectFormValues | boolean | undefined
) {
  useEffect(() => {
    const members =
      data && typeof data !== "boolean" && Array.isArray(data.members)
        ? data.members.map((el) => el?.userInfo?.id)
        : [];
    if (data && typeof data === "object") {
      form.setFieldValue("name", data?.projectName);
      form.setFieldValue("description", data?.description);
      form.setFieldValue("orgId", data?.orgId);
      form.setFieldValue("deptId", data?.deptId);
      form.setFieldValue(
        "startDate",
        data?.startDate ? dayjs(data?.startDate) : null
      );
      form.setFieldValue(
        "endDate",
        data?.endDate ? dayjs(data?.endDate) : null
      );
      form.setFieldValue("MemberIds", members || []);
    }
  }, [data, form]);
}
export default useSetProjectValues;
