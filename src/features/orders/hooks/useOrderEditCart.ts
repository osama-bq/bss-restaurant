import { useMemo, useState } from "react";
import type { Food } from "../../foods/types";
import type { Order } from "../types";

export type OrderEditCartItem = {
  foodId: number;
  name: string;
  image?: string | null;
  unitPrice: number;
  quantity: number;
};

function getInitialCart(order: Order): OrderEditCartItem[] {
  return order.orderItems.map((item) => ({
    foodId: item.food.id,
    name: item.food.name,
    image: item.food.image,
    // Preserve the actual price from the existing order.
    unitPrice: item.unitPrice,
    quantity: item.quantity,
  }));
}

export function useOrderEditCart(order: Order) {
  const [items, setItems] = useState<OrderEditCartItem[]>(() =>
    getInitialCart(order),
  );

  const quantities = useMemo(
    () => new Map(items.map((item) => [item.foodId, item.quantity])),
    [items],
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const addFood = (food: Food) => {
    setItems((current) => {
      const existing = current.find((item) => item.foodId === food.id);

      if (existing) {
        return current.map((item) =>
          item.foodId === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...current,
        {
          foodId: food.id,
          name: food.name,
          image: food.image,
          unitPrice: food.discountPrice ?? food.price,
          quantity: 1,
        },
      ];
    });
  };

  const changeQuantity = (foodId: number, delta: number) => {
    setItems((current) =>
      current.map((item) =>
        item.foodId === foodId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item,
      ),
    );
  };

  const removeItem = (foodId: number) => {
    setItems((current) => current.filter((item) => item.foodId !== foodId));
  };

  return {
    items,
    quantities,
    total,
    totalQuantity,
    addFood,
    changeQuantity,
    removeItem,
  };
}
