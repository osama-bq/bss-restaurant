import { useMemo, useState } from "react";
import type { Food } from "../../foods/types";
import type { CartItem } from "../types";

type CartMap = Record<number, CartItem[]>;

export function useOrderCart(tableId: number | null) {
  const [carts, setCarts] = useState<CartMap>({});

  const items = useMemo(() => {
    if (tableId === null) return [];
    return carts[tableId] ?? [];
  }, [carts, tableId]);

  const updateCart = (updater: (current: CartItem[]) => CartItem[]) => {
    if (tableId === null) return;

    setCarts((previous) => ({
      ...previous,
      [tableId]: updater(previous[tableId] ?? []),
    }));
  };

  const addItem = (food: Food) => {
    updateCart((current) => {
      const existing = current.find((item) => item.food.id === food.id);

      if (existing) {
        return current.map((item) =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { food, quantity: 1 }];
    });
  };

  const decreaseItem = (foodId: number) => {
    updateCart((current) =>
      current
        .map((item) =>
          item.food.id === foodId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const getQuantity = (foodId: number) =>
    items.find((item) => item.food.id === foodId)?.quantity ?? 0;

  const clearCart = () => {
    if (tableId === null) return;

    setCarts((previous) => ({
      ...previous,
      [tableId]: [],
    }));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0,
  );

  return {
    items,
    addItem,
    decreaseItem,
    getQuantity,
    clearCart,
    totalItems,
    subtotal,
  };
}
