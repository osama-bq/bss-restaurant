import {
  Add,
  DeleteOutlined,
  Remove,
  RestaurantMenuOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { BASE_URL } from "../../../../api/baseApi";
import type { OrderEditCartItem } from "../../hooks/useOrderEditCart";

type Props = {
  items: OrderEditCartItem[];
  total: number;
  totalQuantity: number;
  isSubmitting: boolean;
  onChangeQuantity: (foodId: number, delta: number) => void;
  onRemove: (foodId: number) => void;
};

const foodImageUrl = (image?: string | null) =>
  image ? `${BASE_URL}/images/food/${image}` : "";

const formatMoney = (value: number) => value.toLocaleString();

export default function OrderCartPanel({
  items,
  total,
  totalQuantity,
  isSubmitting,
  onChangeQuantity,
  onRemove,
}: Props) {
  return (
    <Stack
      spacing={2}
      sx={{
        height: "100%",
        minWidth: 0,
        p: 2,
        borderRadius: 2,
        bgcolor: "action.hover",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Order items
        </Typography>

        <Chip
          size="small"
          label={`${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`}
        />
      </Stack>

      <Box
        sx={{
          flexGrow: 1,
          minHeight: 120,
          maxHeight: 300,
          overflowY: "auto",
          pr: 0.5,
        }}
      >
        {items.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              py: 4,
              textAlign: "center",
            }}
          >
            No items yet. Pick something from the menu.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {items.map((item) => (
              <Stack
                key={item.foodId}
                direction="row"
                spacing={1}
                sx={{
                  minWidth: 0,
                  alignItems: "center",
                }}
              >
                <Avatar
                  variant="rounded"
                  src={foodImageUrl(item.image)}
                  alt={item.name}
                  sx={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                  }}
                >
                  <RestaurantMenuOutlined fontSize="small" />
                </Avatar>

                <Box
                  sx={{
                    flexGrow: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                    {item.name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {formatMoney(item.unitPrice)} each
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    bgcolor: "background.paper",
                    flexShrink: 0,
                  }}
                >
                  <IconButton
                    size="small"
                    aria-label={`Decrease ${item.name}`}
                    disabled={item.quantity <= 1 || isSubmitting}
                    onClick={() => onChangeQuantity(item.foodId, -1)}
                  >
                    <Remove fontSize="small" />
                  </IconButton>

                  <Typography
                    variant="body2"
                    sx={{
                      minWidth: 20,
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {item.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    aria-label={`Increase ${item.name}`}
                    disabled={isSubmitting}
                    onClick={() => onChangeQuantity(item.foodId, 1)}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    width: 60,
                    textAlign: "right",
                    flexShrink: 0,
                    fontWeight: 600,
                  }}
                >
                  {formatMoney(item.unitPrice * item.quantity)}
                </Typography>

                <Tooltip title="Remove item">
                  <span>
                    <IconButton
                      size="small"
                      color="error"
                      aria-label={`Remove ${item.name}`}
                      disabled={isSubmitting}
                      onClick={() => onRemove(item.foodId)}
                    >
                      <DeleteOutlined fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>

      <Divider />

      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>Total</Typography>

        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          ৳{formatMoney(total)}
        </Typography>
      </Stack>
    </Stack>
  );
}
