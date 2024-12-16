import MasterLayout from "@/components/masterLayout";
import ProjectDetails from "@/components/projects/ProjectDetails";
import Missions from "@/pages/missions/page";
import Notifications from "@/pages/notifications";
import Profile from "@/pages/profile";
import Projects from "@/pages/projects";
import Guard from "./Guard";

const routes = [
  {
    path: "/",
    errorElement: "",
    element: (
      <Guard type="Private">
        <MasterLayout />
      </Guard>
    ),
    children: [
      {
        index: true,
        element: <Projects />,
      },
      { path: "projects/:projectId", element: <ProjectDetails /> },
      {
        path: "missions",
        element: <Missions />,
      },

      { path: "notifications", element: <Notifications /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default routes;
