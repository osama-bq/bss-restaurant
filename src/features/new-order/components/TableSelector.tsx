import { TableRestaurantOutlined } from "@mui/icons-material";
import {
  Avatar,
  ButtonBase,
  Card,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import type { Table } from "../../tables/types";
import { BASE_URL } from "../../../api/baseApi";

type Props = {
  tables: Table[];
  selectedTableId: number | null;
  isLoading: boolean;
  error: unknown;
  onSelect: (table: Table) => void;
};

export default function TableSelector({
  tables,
  selectedTableId,
  isLoading,
  error,
  onSelect,
}: Props) {
  if (isLoading) {
    return (
      <Stack
        direction={{ xs: "row", md: "column" }}
        spacing={1.5}
        sx={{
          overflowX: { xs: "auto", md: "visible" },
          pb: { xs: 1, md: 0 },
          px: { xs: 1, md: 2 },
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            sx={{
              width: { xs: 150, md: "100%" },
              minWidth: { xs: 150, md: 0 },
              height: 86,
              flexShrink: 0,
            }}
          />
        ))}
      </Stack>
    );
  }

  if (error) {
    return <Typography color="error">Failed to load tables.</Typography>;
  }

  return (
    <Stack
      spacing={1.5}
      sx={{
        maxHeight: { md: "calc(100vh - 180px)" },
        overflowY: { md: "auto" },
        overflowX: { xs: "auto", md: "hidden" },
        pb: { xs: 1, md: 0 },
        px: { xs: 1, md: 2 },
      }}
    >
      {tables.map((table) => {
        const selected = table.id === selectedTableId;

        return (
          <Card
            key={table.id}
            variant="outlined"
            sx={{
              flexShrink: 0,
              width: { xs: 160, md: "100%" },
              opacity: table.isOccupied ? 0.55 : 1,
              borderColor: selected ? "primary.main" : "divider",
              bgcolor: selected ? "action.selected" : "background.paper",
            }}
          >
            <ButtonBase
              disabled={table.isOccupied}
              onClick={() => onSelect(table)}
              sx={{
                width: "100%",
                textAlign: "left",
                p: 1.25,
                borderRadius: 1,
              }}
            >
              <Stack
                direction="row"
                spacing={1.25}
                sx={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={
                    table.image
                      ? `${BASE_URL}/images/table/${table.image}`
                      : undefined
                  }
                  variant="rounded"
                  sx={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                  }}
                >
                  <TableRestaurantOutlined />
                </Avatar>

                <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 600 }} noWrap>
                    Table {table.tableNumber}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {table.numberOfSeats} seats
                  </Typography>
                </Stack>

                <Chip
                  size="small"
                  variant="outlined"
                  color={
                    table.isOccupied
                      ? "warning"
                      : selected
                        ? "primary"
                        : "success"
                  }
                  label={
                    table.isOccupied
                      ? "Occupied"
                      : selected
                        ? "Selected"
                        : "Available"
                  }
                />
              </Stack>
            </ButtonBase>
          </Card>
        );
      })}
    </Stack>
  );
}
