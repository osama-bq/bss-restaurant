import {
  Box,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FoodCard from "./FoodCard";
import { useGetFoodsQuery } from "../../../api/foods.api";
import type { Table } from "../../tables/types";
import { Search, TableRestaurantOutlined } from "@mui/icons-material";
import type { Food } from "../../foods/types";
import type { CartItem } from "../types";
import OrderSummary from "./OrderSummary";
import { useState } from "react";

type Props = {
  table: Table | null;
  cartItems: CartItem[];
  totalItems: number;
  subtotal: number;
  onAdd: (food: Food) => void;
  onDecrease: (foodId: number) => void;
};

export default function FoodMenu({
  table,
  cartItems,
  totalItems,
  subtotal,
  onAdd,
  onDecrease,
}: Props) {
  const [search, setSearch] = useState("");
  const { currentData, isLoading, error } = useGetFoodsQuery({
    Page: 1,
    Per_Page: 100,
  });

  const quantities = new Map(
    cartItems.map((item) => [item.food.id, item.quantity]),
  );

  const foods = currentData?.data ?? [];

  return (
    <Stack
      spacing={2.5}
      sx={{
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <TableRestaurantOutlined color="primary" />

        <Stack>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Table {table?.tableNumber}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {table?.numberOfSeats} seats
          </Typography>
        </Stack>
      </Stack>

      <OrderSummary
        items={cartItems}
        totalItems={totalItems}
        subtotal={subtotal}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Add food to cart ({foods.length})
        </Typography>

        <TextField
          size="small"
          placeholder="Search foods..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{
            width: { xs: "100%", sm: 260 },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      {isLoading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Stack key={index} spacing={1}>
              <Skeleton variant="rounded" height={150} />
              <Skeleton width="70%" />
              <Skeleton width="90%" />
              <Skeleton width="40%" />
            </Stack>
          ))}
        </Box>
      ) : error && foods.length === 0 ? (
        <Typography color="error">Failed to load foods.</Typography>
      ) : foods.length === 0 ? (
        <Typography color="text.secondary">No foods found.</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2,
              gridAutoRows: "305px",
              overflowY: "auto",
              maxHeight: "100%",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                quantity={quantities.get(food.id) || 0}
                onAdd={onAdd}
                onDecrease={onDecrease}
              />
            ))}
          </Box>
        </>
      )}
    </Stack>
  );
}
