import { MoreVert } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";

import { NEXT_ORDER_STATUS, ORDER_STATUS_VALUES } from "../consts";
import type { Order } from "../types";
import { getStatusColor } from "../utils";

type Props = {
  order: Order;
};

export default function OrderActions({ order }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const nextStatus = NEXT_ORDER_STATUS[order.orderStatus];

  const handleAdvanceStatus = () => {
    if (!nextStatus) return;

    // TODO:
    // call the dedicated status mutation here.
    console.log(
      "Advance order status:",
      order.id,
      ORDER_STATUS_VALUES[nextStatus],
    );
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

            // TODO: open arbitrary status dialog
          }}
        >
          Change Status
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);

            // TODO: open edit order UI
          }}
        >
          Edit Order
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            setAnchorEl(null);

            // TODO: open delete confirmation
          }}
        >
          Delete Order
        </MenuItem>
      </Menu>
    </Stack>
  );
}
