import {
  Add,
  Close,
  Remove,
  Restaurant,
  TableRestaurantOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Table } from "../../tables/types";
import type { CartItem } from "../types";
import { BASE_URL } from "../../../api/baseApi";

type Props = {
  open: boolean;
  onClose: () => void;
  table: Table;
  items: CartItem[];
  subtotal: number;
  phone: string;
  onPhoneChange: (value: string) => void;
  onAdd: (foodId: number) => void;
  onDecrease: (foodId: number) => void;
  onPlaceOrder: () => void;
};

export default function CartDrawer({
  open,
  onClose,
  table,
  items,
  subtotal,
  phone,
  onPhoneChange,
  onAdd,
  onDecrease,
  onPlaceOrder,
}: Props) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "100%",
              sm: 420,
            },
            maxWidth: "100%",
          },
        },
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Stack>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Your Order
            </Typography>

            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <TableRestaurantOutlined fontSize="small" />

              <Typography variant="body2" color="text.secondary">
                Table {table.tableNumber}
              </Typography>
            </Stack>
          </Stack>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>

        <Divider />

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
          }}
        >
          <Stack spacing={2}>
            {items.map((item) => (
              <Stack
                key={item.food.id}
                direction="row"
                spacing={1.25}
                sx={{
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={
                    item.food.image
                      ? `${BASE_URL}/images/food/${item.food.image}`
                      : undefined
                  }
                  variant="rounded"
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                  }}
                >
                  <Restaurant fontSize="small" />
                </Avatar>

                <Stack
                  sx={{
                    minWidth: 0,
                    flexGrow: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }} noWrap>
                    {item.food.name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    ৳{item.food.price} each
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.25}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => onDecrease(item.food.id)}
                  >
                    <Remove fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      minWidth: 20,
                      textAlign: "center",
                    }}
                  >
                    {item.quantity}
                  </Typography>

                  <IconButton size="small" onClick={() => onAdd(item.food.id)}>
                    <Add fontSize="small" />
                  </IconButton>
                </Stack>

                <Typography
                  sx={{
                    fontWeight: 600,
                    minWidth: 64,
                    textAlign: "right",
                  }}
                >
                  ৳{item.food.price * item.quantity}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Divider />

        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Typography color="text.secondary">Total</Typography>

            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ৳{subtotal}
            </Typography>
          </Stack>

          <TextField
            fullWidth
            size="small"
            label="Phone number"
            placeholder="Optional"
            value={phone}
            onChange={(event) => onPhoneChange(event.target.value)}
            slotProps={{
              htmlInput: {
                inputMode: "tel",
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={items.length === 0}
            onClick={onPlaceOrder}
          >
            Place Order
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
