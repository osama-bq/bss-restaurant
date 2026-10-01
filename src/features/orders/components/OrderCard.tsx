import {
  AccessTimeOutlined,
  ExpandMore,
  PersonOutlined,
  TableRestaurantOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import OrderItems from "./OrderItems";
import type { Order } from "../types";

type Props = {
  order: Order;
};

export default function OrderCard({ order }: Props) {
  const customer =
    order.orderedBy?.fullName ||
    order.orderedBy?.userName ||
    "Walk-in customer";

  const itemCount = order.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const orderTime = new Date(order.orderTime).toLocaleString();

  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 1.5,
        overflow: "hidden",
        "&::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2 }}
          sx={{
            width: "100%",
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <Stack sx={{ minWidth: 130 }}>
            <Typography sx={{ fontWeight: 700 }}>
              #{order.orderNumber}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexGrow: 1,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <TableRestaurantOutlined fontSize="small" color="action" />
              <Typography variant="body2">
                Table {order.table.tableNumber}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <PersonOutlined fontSize="small" color="action" />
              <Typography variant="body2">{customer}</Typography>
            </Stack>

            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <AccessTimeOutlined fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {orderTime}
              </Typography>
            </Stack>
          </Stack>

          <Typography
            sx={{
              fontWeight: 700,
              whiteSpace: "nowrap",
              mr: 1,
            }}
          >
            ৳{order.amount}
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 0 }}>
        <Divider sx={{ mb: 2 }} />

        <OrderItems items={order.orderItems} />

        {(order.orderedBy || order.orderTakenBy) && (
          <>
            <Divider sx={{ my: 2 }} />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              {order.orderedBy && (
                <Stack spacing={0.5}>
                  <Typography variant="overline" color="text.secondary">
                    Ordered by
                  </Typography>

                  <Typography variant="body2">
                    {order.orderedBy.fullName ||
                      order.orderedBy.userName ||
                      "Unknown"}
                  </Typography>

                  {order.orderedBy.phoneNumber && (
                    <Typography variant="caption" color="text.secondary">
                      {order.orderedBy.phoneNumber}
                    </Typography>
                  )}
                </Stack>
              )}

              {order.orderTakenBy && (
                <Stack spacing={0.5}>
                  <Typography variant="overline" color="text.secondary">
                    Order taken by
                  </Typography>

                  <Typography variant="body2">
                    {order.orderTakenBy.fullName ||
                      order.orderTakenBy.userName ||
                      "Unknown"}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
