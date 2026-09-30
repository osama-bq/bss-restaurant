import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout.tsx";
import { loginAction } from "../../features/auth/LoginAction.ts";

import LoginPage from "../../features/auth/Login.tsx";
import DashboardPage from "../../features/dashboard/Dashboard.tsx";
import protectedRouteLoader from "./ProtectedRouteLoader.ts";
import EmployeesPage from "../../features/employees/Employees.tsx";
import TablesPage from "../../features/tables/Tables.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    action: loginAction,
  },
  {
    loader: protectedRouteLoader,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "employees",
        element: <EmployeesPage />,
      },
      {
        path: "tables",
        element: <TablesPage />,
      },
      {
        path: "foods",
        element: <div>Foods</div>,
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
