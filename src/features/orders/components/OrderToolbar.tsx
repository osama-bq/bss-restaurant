import { Add, Search } from "@mui/icons-material";
import { Button, InputAdornment, Paper, Stack, TextField } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function OrderToolbar({ search, onSearchChange }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 0.8,
      }}
    >
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={1.5}
        sx={{
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
        }}
      >
        <TextField
          size="small"
          placeholder="Search orders..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          sx={{
            width: {
              xs: "100%",
              sm: 280,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "9999px",
            },
          }}
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

        <Button
          component={Link}
          to="/orders/new"
          variant="contained"
          startIcon={<Add />}
        >
          New Order
        </Button>
      </Stack>
    </Paper>
  );
}
