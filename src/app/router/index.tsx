import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout.tsx";

export const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <div>Dashboard Home</div>,
      },
      {
        path: "employees",
        element: <div>Employees</div>,
      },
      {
        path: "foods",
        element: <div>Foods</div>,
      },
    ],
  },
]);
