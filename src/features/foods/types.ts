import type { ImagePickerValue } from "../../components/ImagePicker";

export type Food = {
  id: number;
  image: string;
  name: string;
  description: string;
  discountType: Discount;
  discount: number;
  discountPrice: number;
  price: number;
  totalQuantitySold?: number;
  totalRevenue?: number;
};

export type Discount = "Percentage" | "Flat" | "None";

export type FoodFormValues = {
  name: string;
  description: string;
  price: string;
  discountType: Discount;
  discount: string;
  image: ImagePickerValue | null;
};

export type FoodMutationPayload = {
  name: string;
  description: string;
  price: number;
  discountType: Discount;
  discount: number;
  image: string;
  base64: string;
};
