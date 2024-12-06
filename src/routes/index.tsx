import { createBrowserRouter, RouterProvider } from "react-router-dom";
import commonRoutes from "./common";
import routes from "./routes";

export default function Routes() {
  const router = createBrowserRouter([...commonRoutes, ...routes]);
  return <RouterProvider router={router} />;
}
