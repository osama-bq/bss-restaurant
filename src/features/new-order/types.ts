import type { Food } from "../foods/types";

export type CartItem = {
  food: Food;
  quantity: number;
};
