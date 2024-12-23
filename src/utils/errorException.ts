import { notification } from "antd";
import { AxiosError } from "axios";

type ErrorExceptionProp = AxiosError | any;

export default function errorException(error: ErrorExceptionProp) {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;
    const { errorMessage, errors } = error?.response?.data satisfies any;

    switch (statusCode) {
      case 500:
        return notification.error({
          message: "Server error",
          description: errorMessage,
        });

      case 401:
        notification.error({
          message: "Authorized",
          description: "You should logout first then login again , logging out...",
        });

        // cookies.remove("token");
        // cookies.remove("user");

        // localStorage.clear();
        // sessionStorage.clear();

        return;
      case 400: {
        const notAllowed = error?.response?.data?.find(
          (err) => err.errorCode == "PERMISSION_AUTHORITY",
        );
        if (notAllowed)
          return notification.error({
            message: "Permission not allowed",
            description: "You don't have permission to do this action",
          });
        else
          return notification.error({
            message: "Server error",
            description: error?.response?.data?.map((e) => e.errorMessage).join("\n"),
          });
      }

      default:
        return errors;
    }
  }

  if (error instanceof Error)
    return notification.error({
      message: "unexpected error!!",
      description: error.message,
    });
}
