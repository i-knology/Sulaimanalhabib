import Layout from "@/layout/Layout";
import Courses from "@/pages/courses";
import Home from "@/pages/home";
import Profile from "@/pages/profile";

const routes = [
  {
    path: "/",
    errorElement: "",
    element: <Layout />,

    children: [
      { index: true, element: <Home /> },
      { path: "/courses", element: <Courses /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default routes;
