import { Restaurant } from "@mui/icons-material";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";

import type { Order } from "../types";

const BASE_IMAGE_URL = "https://bssrms.runasp.net/images/food";

type Props = {
  order: Order;
};

export default function OrderItemDetails({ order }: Props) {
  return (
    <Box
      sx={{
        px: {
          xs: 2,
          md: 5,
        },
        py: 2,
        bgcolor: "action.hover",
      }}
    >
      <Stack spacing={1}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Order items
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr) 64px 90px",
              sm: "minmax(0, 1fr) 70px 110px 110px",
            },
            gap: 2,
            px: 1,
            py: 0.75,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Food
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textAlign: {
                xs: "center",
                sm: "center",
              },
            }}
          >
            Qty
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              textAlign: "right",
            }}
          >
            Unit price
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "right" }}
          >
            Total
          </Typography>
        </Box>

        <Divider />

        {order.orderItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr) 64px 90px",
                sm: "minmax(0, 1fr) 70px 110px 110px",
              },
              gap: 2,
              alignItems: "center",
              px: 1,
              py: 1,
              borderRadius: 1.5,
            }}
          >
            <Stack
              direction="row"
              spacing={1.25}
              sx={{
                minWidth: 0,
                alignItems: "center",
              }}
            >
              <Avatar
                src={`${BASE_IMAGE_URL}/${item.food.image}`}
                alt={item.food.name}
                variant="rounded"
                sx={{
                  width: 42,
                  height: 42,
                  flexShrink: 0,
                }}
              >
                <Restaurant fontSize="small" />
              </Avatar>

              <Stack sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                  {item.food.name}
                </Typography>

                <Typography variant="caption" color="text.secondary" noWrap>
                  <Box
                    component="span"
                    sx={{
                      display: {
                        xs: "inline",
                        sm: "none",
                      },
                    }}
                  >
                    {item.quantity} × ৳{item.unitPrice}
                  </Box>

                  <Box
                    component="span"
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline",
                      },
                    }}
                  >
                    {item.food.description}
                  </Box>
                </Typography>
              </Stack>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
              }}
            >
              × {item.quantity}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                textAlign: "right",
              }}
            >
              ৳{item.unitPrice.toLocaleString()}
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontWeight: 600, textAlign: "right" }}
            >
              ৳{item.totalPrice.toLocaleString()}
            </Typography>
          </Box>
        ))}

        <Divider />

        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            px: 1,
            pt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Order total
          </Typography>

          <Typography sx={{ fontWeight: 700 }}>
            ৳{order.amount.toLocaleString()}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
