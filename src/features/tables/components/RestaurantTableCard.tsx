import {
  DeleteOutlined,
  EditOutlined,
  PeopleOutlined,
} from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
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
  const status = table.isOccupied ? "Occupied" : "Available";

  console.log(table.image);
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <TableImage
        src={table.image ? `${BASE_URL}/images/table/${table.image}` : ""}
        alt={`Table ${table.tableNumber}`}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Table {table.tableNumber}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <PeopleOutlined
                  fontSize="small"
                  sx={{ mr: 0.5, verticalAlign: "middle" }}
                />
                {table.numberOfSeats} seats
              </Typography>
            </div>

            <Chip
              label={table.isOccupied ? "Occupied" : "Available"}
              size="small"
              color={table.isOccupied ? "warning" : "success"}
              variant="outlined"
            />
          </Stack>

          <TableStaff
            employees={table.employees}
            onAssign={() => onAssignEmployee(table)}
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Tooltip title="Edit table">
          <IconButton size="small" onClick={() => onEdit(table)}>
            <EditOutlined fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete table">
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(table)}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
