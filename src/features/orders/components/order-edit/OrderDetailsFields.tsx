import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { Order } from "../../types";

export type OrderEditFormValues = {
  phoneNumber: string;
};

type Props = {
  order: Order;
};

export default function OrderDetailsFields({ order }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrderEditFormValues>();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          label="Order number"
          value={order.orderNumber}
          disabled
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          label="Table"
          value={order.table.tableNumber}
          disabled
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          label="Phone number"
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
      </Grid>
    </Grid>
  );
}
