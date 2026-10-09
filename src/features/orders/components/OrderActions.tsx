import { MoreVert } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";

import { NEXT_ORDER_STATUS, ORDER_STATUS_VALUES } from "../consts";
import type { Order } from "../types";
import { getStatusColor } from "../utils";
import {
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../../api/orders.api";
import ConfirmDialog from "../../../components/ConfirmDialog";
import OrderEditForm from "./OrderEditForm";
import ChangeOrderStatusDialog from "./ChangeOrderStatusDialog";

type Props = {
  order: Order;
};

export default function OrderActions({ order }: Props) {
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const nextStatus = NEXT_ORDER_STATUS[order.orderStatus];

  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [deleteOrder, deleteState] = useDeleteOrderMutation();

  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);

  const handleAdvanceStatus = () => {
    if (!nextStatus) return;
    updateOrderStatus({
      id: order.id,
      body: { status: ORDER_STATUS_VALUES[nextStatus] },
    });
  };

  const handleDelete = (order: Order) => {
    setDeleteTarget(order);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteOrder(deleteTarget.id).unwrap();
      setDeleteTarget(null);
    } catch {
      // Keep confirmation dialog open on failure.
    }
  };

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {nextStatus && (
        <Button
          size="small"
          variant="contained"
          onClick={handleAdvanceStatus}
          sx={{
            whiteSpace: "nowrap",
            bgcolor: `${getStatusColor(nextStatus)}.main`,
          }}
        >
          {nextStatus === "Confirmed" ? "Confirm" : `Mark ${nextStatus}`}
        </Button>
      )}

      <IconButton
        size="small"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-label="Order actions"
      >
        <MoreVert fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setStatusDialogOpen(true);
          }}
        >
          Change Status
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);

            setFormOpen(true);
            setSelectedOrder(order);
          }}
        >
          Edit Order
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            setAnchorEl(null);
            handleDelete(order);
          }}
        >
          Delete Order
        </MenuItem>
      </Menu>

      <ChangeOrderStatusDialog
        key={order.id}
        open={statusDialogOpen}
        order={order}
        onClose={() => setStatusDialogOpen(false)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Order?"
        description={
          deleteTarget
            ? `Are you sure you want to delete order #${deleteTarget.orderNumber}? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Order"
        loading={deleteState.isLoading}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />

      <OrderEditForm
        open={formOpen}
        order={selectedOrder ?? null}
        onClose={() => {
          setFormOpen(false);
          setSelectedOrder(null);
        }}
      />
    </Stack>
  );
}
