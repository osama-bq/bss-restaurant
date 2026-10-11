import {
  AccessTimeOutlined,
  ReceiptLongOutlined,
  TableRestaurantOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import type { Theme } from "@mui/material";
import type { DashboardRecentOrder } from "../types";
import EmptyState from "../../../components/EmptyState";
import { dashboardCardContentSx, dashboardCardSx } from "../cardStyles";

type Props = {
  orders: DashboardRecentOrder[];
};

const STATUS_COLORS: Record<
  string,
  "warning" | "info" | "primary" | "secondary" | "success"
> = {
  Pending: "warning",
  Confirmed: "info",
  Preparing: "primary",
  PreparedToServe: "secondary",
  Served: "success",
  // "Paid" and anything unknown fall back to a neutral style.
};

function formatStatus(status: string) {
  return status === "PreparedToServe" ? "Prepared to Serve" : status;
}

function getStatusStyle(theme: Theme, status: string) {
  const key = STATUS_COLORS[status];

  if (!key) {
    return {
      bgcolor: alpha(theme.palette.text.primary, 0.08),
      color: theme.palette.text.secondary,
    };
  }

  return {
    bgcolor: alpha(theme.palette[key].main, 0.12),
    color: theme.palette[key].dark,
  };
}

const formatOrderTime = (value: string) =>
  new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function RecentOrders({ orders }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        flex: 1,
        minWidth: 0,
        ...dashboardCardSx,
      }}
    >
      <CardContent sx={dashboardCardContentSx}>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent Orders
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Latest orders from the restaurant
            </Typography>
          </Stack>

          {orders.length === 0 ? (
            <EmptyState
              compact
              icon={<ReceiptLongOutlined />}
              title="No recent orders"
              description="New orders will appear here as they come in."
            />
          ) : (
            <Stack>
              {orders.map((order, index) => (
                <Stack key={order.id}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ py: 1.75, alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        borderRadius: 2,
                        color: "text.secondary",
                        bgcolor: "action.hover",
                      }}
                    >
                      <ReceiptLongOutlined fontSize="small" />
                    </Box>

                    <Stack sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600 }}
                        noWrap
                      >
                        #{order.orderNumber}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ mt: 0.25, flexWrap: "wrap" }}
                      >
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ alignItems: "center", color: "text.secondary" }}
                        >
                          <TableRestaurantOutlined sx={{ fontSize: 15 }} />

                          <Typography variant="caption">
                            Table {order.tableNumber}
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ alignItems: "center", color: "text.secondary" }}
                        >
                          <AccessTimeOutlined sx={{ fontSize: 15 }} />

                          <Typography variant="caption">
                            {formatOrderTime(order.orderTime)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Stack sx={{ alignItems: "flex-end", flexShrink: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        ৳{order.amount.toLocaleString()}
                      </Typography>

                      <Chip
                        size="small"
                        label={formatStatus(order.orderStatus)}
                        sx={(theme) => ({
                          mt: 0.5,
                          fontWeight: 600,
                          ...getStatusStyle(theme, order.orderStatus),
                        })}
                      />
                    </Stack>
                  </Stack>

                  {index < orders.length - 1 && <Divider />}
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
