import { useEffect } from "react";

export default function useErrors(form, isError, type = "") {
  useEffect(() => {
    if (isError instanceof Object) {
      const errors = Object.entries(isError || {}).map(([key, value]) => {
        let name =type == ""? key: key?.split("")?.reduce((a, b, i) => (i == 0 ? a + b?.toLowerCase() : a + b),"");
        return {
          name: name,
          errors: value,
          required: true,
        };
      }, []);
      form.setFields(errors);
    }
  }, [isError]);
}
