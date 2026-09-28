import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout.tsx";
import { loginAction } from "../../features/auth/LoginAction.ts";

import LoginPage from "../../features/auth/Login.tsx";
import DashboardPage from "../../features/dashboard/Dashboard.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    action: loginAction,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "employees",
        element: <div>Employees</div>,
      },
      {
        path: "tables",
        element: <div>Tables</div>,
      },
      {
        path: "foods",
        element: <div>Tables</div>,
      },
      {
        path: "orders",
        element: <div>Orders</div>,
      },
      {
        path: "orders/new",
        element: <div>New Order</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
