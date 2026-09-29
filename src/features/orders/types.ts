export type Order = {
  amount: number;
  id: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  orderTime: string;
  tableNumber: string;
};

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "Prepared to Serve"
  | "Served"
  | "Paid";
