import { Navigate, useRoutes } from "react-router-dom";
import { AppLayout, SimpleLayout } from "@/layouts";
import Page404 from "@/view/error/Page404.tsx";
import { DefaultDashboard } from "@/view/dashboard";
import Knowledge from "@/view/knowledge";
import Report from "@/view/report";
import Tools from "@/view/tools";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <AppLayout />,
      children: [
        { element: <Navigate to="/dashboard/index" />, index: true },
        { path: "index", element: <DefaultDashboard /> },
        { path: "knowledge", element: <Knowledge /> },
        { path: "report", element: <Report /> },
        { path: "tools", element: <Tools /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/index" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
};

export default Router;
