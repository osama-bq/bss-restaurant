import { Search } from "@mui/icons-material";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function OrderToolbar({ search, onSearchChange }: Props) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: { xs: "stretch", md: "center" },
      }}
    >
      <div>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Orders
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Track and manage restaurant orders
        </Typography>
      </div>

      <TextField
        size="small"
        placeholder="Search orders..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
}
