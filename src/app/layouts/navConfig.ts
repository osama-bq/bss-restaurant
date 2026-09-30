import type { ElementType } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export const DRAWER_WIDTH = 240;
export const COLLAPSED_WIDTH = 57;

export interface NavItemConfig {
  title: string;
  path: string;
  icon: ElementType;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { title: "Dashboard", path: "/", icon: DashboardIcon },
  { title: "Employees", path: "/employees", icon: PeopleIcon },
  { title: "Tables", path: "/tables", icon: TableRestaurantIcon },
  { title: "Foods", path: "/foods", icon: RestaurantMenuIcon },
  { title: "New Order", path: "/orders/new", icon: AddShoppingCartIcon },
  { title: "Orders", path: "/orders", icon: ReceiptLongIcon },
];

export function getTitleFromPathname(pathname: string): string {
  const match = NAV_ITEMS.find((item) => item.path === pathname);
  return match?.title ?? "Dashboard";
}
