import { TableRestaurantOutlined } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";

export default function EmptyTableState() {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: 700,
        maxHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          alignItems: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <TableRestaurantOutlined
          sx={{
            fontSize: 72,
            color: "text.secondary",
          }}
        />

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Select a table first
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Choose a table to start building the order.
        </Typography>
      </Stack>
    </Paper>
  );
}
