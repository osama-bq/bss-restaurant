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
  | "PreparedToServe"
  | "Served"
  | "Paid";

export type OrderStatusValue = 0 | 1 | 2 | 3 | 4 | 5;

export const ORDER_STATUSES: {
  value: OrderStatusValue;
  label: OrderStatus;
}[] = [
  { value: 0, label: "Pending" },
  { value: 1, label: "Confirmed" },
  { value: 2, label: "Preparing" },
  { value: 3, label: "PreparedToServe" },
  { value: 4, label: "Served" },
  { value: 5, label: "Paid" },
];
