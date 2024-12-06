import MasterLayout from "@/components/masterLayout";
import AddNewMemberPage from "@/components/members/AddNewMemberPage";
import ProjectDetails from "@/components/projects/ProjectDetails";
import TripDetails from "@/components/trips/TripDetails";
import CommitteesCouncils from "@/pages/committeesCouncils";
import Home from "@/pages/home";
import LogisticItems from "@/pages/logisticItems";
import Meetings from "@/pages/meetings";
import Members from "@/pages/members";
import Notifications from "@/pages/notifications";
import Profile from "@/pages/profile";
import Projects from "@/pages/projects";
import Tasks from "@/pages/tasks";
import Trips from "@/pages/trips";
import Guard from "./Guard";
import CommitteeDetails from "@/components/committeesConcils/CommitteeDetails";
import Missions from "@/pages/missions/page";

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
        errorElement: "",
        element: <Home />,
      },
      { path: "meetings", element: <Meetings /> },
      {
        path: "projects",
        element: <Projects />,
        children: [{ path: ":projectId", element: <ProjectDetails /> }],
      },
      {
        path: "missions",
        element: <Missions />,
      },
      // {
      //   path: "trips",
      //   element: <Trips />,
      //   children: [{ path: ":taskId", element: <TripDetails /> }],
      // },
      {
        path: "committees-councils",
        element: <CommitteesCouncils />,
        children: [{ path: ":committeeId", element: <CommitteeDetails /> }],
      },
      { path: "members", element: <Members /> },
      { path: "members/add-new-user", element: <AddNewMemberPage /> },
      { path: "tasks", element: <Tasks /> },
      // { path: "logistic-items", element: <LogisticItems /> },
      { path: "notifications", element: <Notifications /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default routes;
