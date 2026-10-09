import { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { ORDER_STATUS_VALUES } from "../consts";
import type { Order } from "../types";
import { getStatusColor } from "../utils";
import { useUpdateOrderStatusMutation } from "../../../api/orders.api";

type Props = {
  open: boolean;
  order: Order;
  onClose: () => void;
};

export default function ChangeOrderStatusDialog({
  open,
  order,
  onClose,
}: Props) {
  const [status, setStatus] = useState(order.orderStatus);
  const [confirming, setConfirming] = useState(false);

  const [updateStatus, updateState] = useUpdateOrderStatusMutation();

  const statuses = Object.keys(ORDER_STATUS_VALUES) as Array<
    keyof typeof ORDER_STATUS_VALUES
  >;

  const handleSave = async () => {
    if (status === order.orderStatus) {
      onClose();
      return;
    }

    try {
      await updateStatus({
        id: order.id,
        body: { status: ORDER_STATUS_VALUES[status] },
      }).unwrap();

      onClose();
    } catch {
      // Keep the dialog open so the user can retry.
    }
  };

  return (
    <Dialog
      open={open}
      onClose={updateState.isLoading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Change Order Status</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Choose a new status for order #{order.orderNumber}.
          </Typography>

          <TextField
            select
            fullWidth
            label="Order status"
            value={status}
            disabled={updateState.isLoading || confirming}
            onChange={(event) => {
              setStatus(event.target.value as typeof status);
              setConfirming(false);
            }}
          >
            {statuses.map((item) => (
              <MenuItem key={item} value={item}>
                <Chip
                  size="small"
                  label={item}
                  sx={{
                    color: `${getStatusColor(item)}.main`,
                    borderColor: `${getStatusColor(item)}.main`,
                  }}
                  variant="outlined"
                />
              </MenuItem>
            ))}
          </TextField>

          {confirming && (
            <Typography variant="body2">
              Change status from <strong>{order.orderStatus}</strong> to{" "}
              <strong>{status}</strong>?
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          color="inherit"
          disabled={updateState.isLoading}
          onClick={confirming ? () => setConfirming(false) : onClose}
        >
          {confirming ? "Back" : "Cancel"}
        </Button>

        {!confirming ? (
          <Button
            variant="contained"
            disabled={status === order.orderStatus}
            onClick={() => setConfirming(true)}
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={updateState.isLoading}
            onClick={handleSave}
          >
            {updateState.isLoading ? "Updating..." : "Confirm Change"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
