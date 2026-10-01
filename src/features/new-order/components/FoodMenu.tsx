import { Box, Stack, Typography } from "@mui/material";
import FoodCard from "./FoodCard";
import { useGetFoodsQuery } from "../../../api/foods.api";

export default function FoodMenu() {
  const { currentData, error } = useGetFoodsQuery({
    Page: 1,
    Per_Page: 100,
  });

  const foods = currentData?.data ?? [];

  return (
    <Stack spacing={2.5}>
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
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            quantity={0}
            onAdd={() => {}}
            onDecrease={() => {}}
          />
        ))}
      </Box>

      <Stack
        spacing={1}
        sx={{
          alignItems: "center",
          py: 1,
        }}
      >
        <Box sx={{ height: 1 }} />

        {error && foods.length > 0 && (
          <Typography color="error" variant="body2">
            Failed to load more foods.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
