import { Add, RestaurantMenuOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Chip,
  Grid,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useGetFoodsQuery } from "../../../../api/foods.api";
import { BASE_URL } from "../../../../api/baseApi";
import type { Food } from "../../../foods/types";

type Props = {
  quantities: ReadonlyMap<number, number>;
  isSubmitting: boolean;
  onAdd: (food: Food) => void;
};

const PAGE_SIZE = 100;

const foodImageUrl = (image?: string | null) =>
  image ? `${BASE_URL}/images/food/${image}` : "";

const formatMoney = (value: number) => value.toLocaleString();

export default function OrderFoodPicker({
  quantities,
  isSubmitting,
  onAdd,
}: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useGetFoodsQuery({
    Page: 1,
    Per_Page: PAGE_SIZE,
    Search: debouncedSearch || undefined,
  });

  const foods = response?.data ?? [];

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Menu
        </Typography>

        <TextField
          size="small"
          placeholder="Search food"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ width: { xs: "100%", sm: 220 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <RestaurantMenuOutlined fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Box
        sx={{
          maxHeight: 380,
          overflowY: "auto",
          pr: 0.5,
        }}
      >
        {isLoading ? (
          <Grid container spacing={1.5}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6 }}>
                <Skeleton variant="rounded" height={76} />
              </Grid>
            ))}
          </Grid>
        ) : isError ? (
          <Typography
            color="error"
            variant="body2"
            sx={{ py: 4, textAlign: "center" }}
          >
            Failed to load foods.
          </Typography>
        ) : foods.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ py: 4, textAlign: "center" }}
          >
            No food found.
          </Typography>
        ) : (
          <Grid container spacing={1.5}>
            {foods.map((food) => {
              const price = food.discountPrice ?? food.price;
              const hasDiscount = price < food.price;
              const quantity = quantities.get(food.id) ?? 0;

              return (
                <Grid key={food.id} size={{ xs: 12, sm: 6 }}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      borderColor: quantity ? "primary.main" : "divider",
                    }}
                  >
                    <CardActionArea
                      onClick={() => onAdd(food)}
                      disabled={isSubmitting}
                      sx={{ p: 1.25, height: "100%" }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center" }}
                      >
                        <Avatar
                          variant="rounded"
                          src={foodImageUrl(food.image)}
                          alt={food.name}
                          sx={{
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                          }}
                        >
                          <RestaurantMenuOutlined fontSize="small" />
                        </Avatar>

                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            noWrap
                            sx={{ fontWeight: 600 }}
                          >
                            {food.name}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={0.75}
                            sx={{ alignItems: "baseline" }}
                          >
                            <Typography
                              variant="body2"
                              color="primary"
                              sx={{ fontWeight: 700 }}
                            >
                              {formatMoney(price)}
                            </Typography>

                            {hasDiscount && (
                              <Typography
                                variant="caption"
                                color="text.disabled"
                                sx={{ textDecoration: "line-through" }}
                              >
                                {formatMoney(food.price)}
                              </Typography>
                            )}
                          </Stack>
                        </Box>

                        {quantity > 0 ? (
                          <Chip
                            size="small"
                            color="primary"
                            label={`×${quantity}`}
                          />
                        ) : (
                          <Add
                            fontSize="small"
                            sx={{ color: "text.secondary" }}
                          />
                        )}
                      </Stack>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {!isLoading && isFetching && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            Updating menu…
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
