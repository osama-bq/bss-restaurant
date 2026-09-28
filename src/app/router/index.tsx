import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <div>Login Page</div>,
  },
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
