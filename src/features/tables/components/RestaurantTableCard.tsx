import {
  DeleteOutlined,
  EditOutlined,
  MoreHoriz,
  PeopleOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useState } from "react";
import type { Table } from "../types";
import TableStaff from "./TableStaff";
import { BASE_URL } from "../../../api/baseApi";
import TableImage from "./TableImage";

type Props = {
  table: Table;
  onEdit: (table: Table) => void;
  onDelete: (table: Table) => void;
  onAssignEmployee: (table: Table) => void;
};

export default function RestaurantTableCard({
  table,
  onEdit,
  onDelete,
  onAssignEmployee,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const closeMenu = () => setAnchorEl(null);

  const statusColor = table.isOccupied ? "warning" : "success";

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2,
        gap: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Chip
          label={table.isOccupied ? "Occupied" : "Available"}
          size="small"
          sx={(theme) => ({
            fontWeight: 600,
            bgcolor: alpha(theme.palette[statusColor].main, 0.12),
            color: theme.palette[statusColor].dark,
          })}
        />

        <IconButton
          size="small"
          aria-label="Table actions"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: 36,
            height: 32,
          }}
        >
          <MoreHoriz fontSize="small" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              closeMenu();
              onEdit(table);
            }}
          >
            <EditOutlined fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>

          <MenuItem
            sx={{ color: "error.main" }}
            onClick={() => {
              closeMenu();
              onDelete(table);
            }}
          >
            <DeleteOutlined fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Stack>

      <Box
        sx={{
          aspectRatio: "16 / 10",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "action.hover",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          },
        }}
      >
        <TableImage
          src={table.image ? `${BASE_URL}/images/table/${table.image}` : ""}
          alt={`Table ${table.tableNumber}`}
        />
      </Box>

      <Stack
        spacing={0.5}
        direction="row"
        sx={{
          px: 2,
          py: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {table.tableNumber}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: "center", color: "text.secondary" }}
        >
          <PeopleOutlined sx={{ fontSize: 18 }} />
          <Typography variant="body2">{table.numberOfSeats} seats</Typography>
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: "auto",
          p: 2,
          borderRadius: 1,
          bgcolor: "action.hover",
        }}
      >
        <TableStaff
          employees={table.employees}
          onAssign={() => onAssignEmployee(table)}
        />
      </Box>
    </Card>
  );
}
