import { Restaurant } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import type { OrderItem } from "../types";
import { BASE_URL } from "../../../api/baseApi";

type Props = {
  items: OrderItem[];
};

export default function OrderItems({ items }: Props) {
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "grid",
          },
          gridTemplateColumns: "minmax(0, 1fr) 70px 110px 110px",
          gap: 2,
          px: 1.5,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          FOOD
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          QTY
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: "right" }}
        >
          UNIT PRICE
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: "right" }}
        >
          TOTAL
        </Typography>
      </Box>

      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr) auto",
              sm: "minmax(0, 1fr) 70px 110px 110px",
            },
            gap: 2,
            alignItems: "center",
            px: 1.5,
            py: 1,
            borderRadius: 1.5,
            bgcolor: "action.hover",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              minWidth: 0,
              alignItems: "center",
            }}
          >
            <Avatar
              src={`${BASE_URL}/images/food/${item.food.image}`}
              alt={item.food.name}
              variant="rounded"
              sx={{
                width: 72,
                height: 72,
                flexShrink: 0,
              }}
            >
              <Restaurant fontSize="small" />
            </Avatar>

            <Stack sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 600 }} noWrap>
                {item.food.name}
              </Typography>

              <Typography variant="caption" color="text.secondary" noWrap>
                {item.food.description}
              </Typography>
            </Stack>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              textAlign: { xs: "right", sm: "center" },
            }}
          >
            × {item.quantity}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: { xs: "none", sm: "block" },
              textAlign: "right",
            }}
          >
            ৳{item.unitPrice}
          </Typography>

          <Typography sx={{ textAlign: "right", fontWeight: 600 }}>
            ৳{item.totalPrice}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
