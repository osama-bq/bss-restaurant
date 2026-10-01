import {
  DeleteOutlined,
  EditOutlined,
  MoreVert,
  PublishedWithChanges,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { type Order, type OrderStatus, type OrderStatusValue } from "../types";
import {
  NEXT_ORDER_STATUS,
  ORDER_STATUS_VALUES,
  statusPalette,
} from "../consts";

const statuses: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Preparing",
  "PreparedToServe",
  "Served",
  "Paid",
];

type Props = {
  order: Order;
  onAdvanceStatus: (order: Order, status: OrderStatusValue) => void;
  onChangeStatus: (order: Order, status: OrderStatusValue) => void;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
};

export default function OrderActions({
  order,
  onAdvanceStatus,
  onChangeStatus,
  onEdit,
  onDelete,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const nextStatus = NEXT_ORDER_STATUS[order.orderStatus];

  const [selectedStatus, setSelectedStatus] = useState<OrderStatusValue>(
    ORDER_STATUS_VALUES[order.orderStatus],
  );

  const openMenu = Boolean(anchorEl);

  const handleOpenStatusDialog = () => {
    setSelectedStatus(ORDER_STATUS_VALUES[order.orderStatus]);
    setStatusDialogOpen(true);
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        {nextStatus && (
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              onAdvanceStatus(order, ORDER_STATUS_VALUES[nextStatus]);
            }}
            sx={{
              whiteSpace: "nowrap",
              backgroundColor: `${statusPalette[nextStatus]}.main`,
            }}
          >
            {nextStatus === "Confirmed"
              ? "Confirm Order"
              : `Mark ${nextStatus}`}
          </Button>
        )}

        <IconButton
          size="small"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleOpenStatusDialog}>
          <PublishedWithChanges fontSize="small" sx={{ mr: 1 }} />
          Change Status
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onEdit(order);
          }}
        >
          <EditOutlined fontSize="small" sx={{ mr: 1 }} />
          Edit Order
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDeleteDialogOpen(true);
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteOutlined fontSize="small" sx={{ mr: 1 }} />
          Delete Order
        </MenuItem>
      </Menu>

      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Change order status</DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Order #{order.orderNumber}
          </Typography>

          <RadioGroup
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(Number(event.target.value) as OrderStatusValue)
            }
          >
            {statuses.map((status) => (
              <FormControlLabel
                key={status}
                value={ORDER_STATUS_VALUES[status]}
                control={<Radio />}
                label={status}
              />
            ))}
          </RadioGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={() => {
              onChangeStatus(order, selectedStatus);
              setStatusDialogOpen(false);
            }}
          >
            Change Status
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete order?</DialogTitle>

        <DialogContent>
          <Typography>
            This will permanently delete order #{order.orderNumber}.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              onDelete(order);
              setDeleteDialogOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
