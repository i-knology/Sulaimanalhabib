import { useEffect } from "react";

export default function useSetValues(form, userData) {
  return useEffect(() => {
    form.setFieldValue("PhoneNumber", userData?.mobileNumber);
    form.setFieldValue("email", userData?.email);
    form.setFieldValue("name", userData?.name);
    form.setFieldValue("id", userData?.id);
  }, []);
}
