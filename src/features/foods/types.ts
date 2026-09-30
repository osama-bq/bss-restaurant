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
