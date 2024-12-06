import Login from "@/pages/auth/Login";
import Guard from "./Guard";
import AuthWrapper from "@/components/auth/AuthWrapper";

const commonRoutes = [
  {
    path: "/auth",
    errorElement: "",
    element: (
      <Guard type="Public">
        <AuthWrapper />
      </Guard>
    ),
    children: [
      {
        index: true,
        errorElement: "",
        element: <Login />,
      },

      // {
      //   path: "forgot-password",
      //   element: <ForgotPassword />,
      // },
      // {
      //   path: "otp",
      //   element: <OTP />,
      // },
      // {
      //   path: "change-password",
      //   element: <ChangePassword />,
      // },
    ],
  },
];

export default commonRoutes;
