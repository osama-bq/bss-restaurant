import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Chip,
  Collapse,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

import type { Order } from "../types";
import OrderItemDetails from "./OrderItemDetails";
import OrderActions from "./OrderActions";
import { formatDate, getStatusColor } from "../utils";

type Props = {
  order: Order;
};

export default function OrderTableRow({ order }: Props) {
  const [expanded, setExpanded] = useState(false);

  const itemCount = order.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const formattedDate = formatDate(order.orderTime);

  return (
    <>
      <TableRow
        hover
        sx={{
          "& > *": {
            verticalAlign: "middle",
          },
        }}
      >
        <TableCell
          sx={{
            px: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => setExpanded((current) => !current)}
            aria-label={expanded ? "Collapse order" : "Expand order"}
          >
            {expanded ? (
              <ExpandLess fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            )}
          </IconButton>
        </TableCell>

        <TableCell sx={{ px: 2, py: 1 }}>
          <Stack spacing={0.25}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              #{order.orderNumber}
            </Typography>

            {order.orderedBy?.fullName && (
              <Typography variant="caption" color="text.secondary">
                {order.orderedBy.fullName}
              </Typography>
            )}
          </Stack>
        </TableCell>

        <TableCell sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {formattedDate}
          </Typography>
        </TableCell>

        <TableCell sx={{ px: 2, py: 1 }}>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography variant="body2">{order.table.tableNumber}</Typography>
          </Stack>
        </TableCell>

        <TableCell sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Typography>
        </TableCell>

        <TableCell sx={{ px: 2, py: 1 }}>
          <Chip
            size="small"
            label={order.orderStatus}
            sx={{
              color: `${getStatusColor(order.orderStatus)}.main`,
              borderColor: `${getStatusColor(order.orderStatus)}.main`,
            }}
            variant="outlined"
          />
        </TableCell>

        <TableCell align="right" sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
            ৳{order.amount.toLocaleString()}
          </Typography>
        </TableCell>

        <TableCell align="right" sx={{ px: 2, py: 1 }}>
          <OrderActions order={order} />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          colSpan={8}
          sx={{
            p: 0,
            borderBottom: expanded ? "1px solid" : "none",
            borderColor: "divider",
          }}
        >
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <OrderItemDetails order={order} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
