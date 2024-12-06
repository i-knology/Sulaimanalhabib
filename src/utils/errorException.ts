import { notification } from "antd";
import { AxiosError } from "axios";
import cookies from "./cookies";

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

        cookies.remove("token");
        cookies.remove("user");

        localStorage.clear();
        sessionStorage.clear();

        return;

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
