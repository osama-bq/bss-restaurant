import type { OrderStatus, OrderStatusValue } from "./types";

export const ORDER_STATUS_VALUES: Record<OrderStatus, OrderStatusValue> = {
  Pending: 0,
  Confirmed: 1,
  Preparing: 2,
  PreparedToServe: 3,
  Served: 4,
  Paid: 5,
};

export const NEXT_ORDER_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  Pending: "Confirmed",
  Confirmed: "Preparing",
  Preparing: "PreparedToServe",
  PreparedToServe: "Served",
  Served: "Paid",
};

export const statusPalette = {
  Pending: "warning",
  Confirmed: "info",
  Preparing: "primary",
  PreparedToServe: "secondary",
  Served: "success",
  Paid: "neutral",
} as const;
