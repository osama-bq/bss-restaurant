import type { Food } from "../foods/types";

export type Order = {
  amount: number;
  id: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  orderTime: string;
  orderItems: OrderItem[];
  table: {
    tableId: number;
    tableNumber: string;
  };
  orderedBy?: {
    id: string;
    userName: string | null;
    email: string | null;
    fullName: string | null;
    phoneNumber: string | null;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  };
  orderTakenBy?: {
    id: string;
    userName: string | null;
    email: string | null;
    fullName: string | null;
    phoneNumber: string | null;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  };
};

export type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  food: Food;
};

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "Prepared to Serve"
  | "Served"
  | "Paid";

export type OrderStatusValue = 0 | 1 | 2 | 3 | 4 | 5;

export const ORDER_STATUS_VALUES: Record<OrderStatus, OrderStatusValue> = {
  Pending: 0,
  Confirmed: 1,
  Preparing: 2,
  "Prepared to Serve": 3,
  Served: 4,
  Paid: 5,
};

export const NEXT_ORDER_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  Pending: "Confirmed",
  Confirmed: "Preparing",
  Preparing: "Prepared to Serve",
  "Prepared to Serve": "Served",
  Served: "Paid",
};
