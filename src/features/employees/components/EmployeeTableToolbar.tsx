import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

type Props = {
  total: number;
};

export default function EmployeeTableToolbar({ total }: Props) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
      }}
    >
      <div>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Employees
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Manage your restaurant employees
          {total > 0 && ` · ${total} employees`}
        </Typography>
      </div>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => {
          // Add employee modal will go here later.
        }}
      >
        Add Employee
      </Button>
    </Stack>
  );
}
