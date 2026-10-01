import { Avatar, Stack, Typography } from "@mui/material";
import { Restaurant } from "@mui/icons-material";
import type { OrderItem } from "../types";
import { BASE_URL } from "../../../api/baseApi";

type Props = {
  items: OrderItem[];
};

export default function OrderItems({ items }: Props) {
  return (
    <Stack spacing={1.5}>
      {items.map((item) => (
        <Stack
          key={item.id}
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
          }}
        >
          <Avatar
            src={`${BASE_URL}/images/food/${item.food.image}`}
            alt={item.food.name}
            variant="rounded"
            sx={{
              width: 44,
              height: 44,
            }}
          >
            <Restaurant fontSize="small" />
          </Avatar>

          <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600 }} noWrap>
              {item.food.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {item.quantity} × ৳{item.unitPrice}
            </Typography>
          </Stack>

          <Typography sx={{ fontWeight: 600 }}>৳{item.totalPrice}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}
