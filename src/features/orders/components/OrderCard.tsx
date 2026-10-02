import {
  AccessTimeOutlined,
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
import type { Order, OrderStatusValue } from "../types";
import OrderActions from "./OrderActions";

type Props = {
  order: Order;
  onAdvanceStatus: (order: Order, status: OrderStatusValue) => void;
  onChangeStatus: (order: Order, status: OrderStatusValue) => void;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
};

export default function OrderCard({
  order,
  onAdvanceStatus,
  onChangeStatus,
  onEdit,
  onDelete,
}: Props) {
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <AccordionSummary>
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
              <Stack
                direction="row"
                spacing={0.75}
                sx={{ alignItems: "center" }}
              >
                <TableRestaurantOutlined fontSize="small" color="action" />
                <Typography variant="body2">
                  Table {order.table.tableNumber}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={0.75}
                sx={{ alignItems: "center" }}
              >
                <PersonOutlined fontSize="small" color="action" />
                <Typography variant="body2">{customer}</Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={0.75}
                sx={{ alignItems: "center" }}
              >
                <AccessTimeOutlined fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {orderTime}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </AccordionSummary>

        <Stack
          spacing={1}
          sx={{
            alignItems: "end",
            px: 1,
            py: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, whiteSpace: "nowrap", px: 2 }}
          >
            ৳{order.amount}
          </Typography>

          <OrderActions
            order={order}
            onAdvanceStatus={onAdvanceStatus}
            onChangeStatus={onChangeStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Stack>
      </Stack>

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
