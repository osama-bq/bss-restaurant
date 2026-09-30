import { Add, Search } from "@mui/icons-material";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
};

export default function FoodToolbar({
  total,
  search,
  onSearchChange,
  onAdd,
}: Props) {
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
          Foods
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Manage your restaurant menu
          {total > 0 && ` · ${total} items`}
        </Typography>
      </div>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          size="small"
          placeholder="Search foods..."
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

        <Button variant="contained" startIcon={<Add />} onClick={onAdd}>
          Add Food
        </Button>
      </Stack>
    </Stack>
  );
}
