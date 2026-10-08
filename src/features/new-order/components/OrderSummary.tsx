import { Badge, Box, Divider, Stack, Typography } from "@mui/material";
import { Restaurant } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import type { CartItem } from "../types";
import { BASE_URL } from "../../../api/baseApi";

type Props = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
};

export default function OrderSummary({ items, totalItems, subtotal }: Props) {
  if (items.length === 0) return null;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        p: 1.5,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Stack sx={{ flexShrink: 0, px: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            ORDER SUMMARY
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "medium" }}
            >
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </Typography>

            <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />

            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              ৳{subtotal}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            overflowX: "auto",
            minWidth: 0,
            flexGrow: 1,
            pb: 0.5,
          }}
        >
          {items.map((item) => (
            <Tooltip
              key={item.food.id}
              title={`${item.food.name} × ${item.quantity}`}
            >
              <Badge
                badgeContent={item.quantity}
                color="primary"
                overlap="circular"
              >
                <Avatar
                  src={
                    item.food.image
                      ? `${BASE_URL}/images/food/${item.food.image}`
                      : undefined
                  }
                  alt={item.food.name}
                  variant="rounded"
                  sx={{
                    width: 48,
                    height: 48,
                  }}
                >
                  <Restaurant fontSize="small" />
                </Avatar>
              </Badge>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
