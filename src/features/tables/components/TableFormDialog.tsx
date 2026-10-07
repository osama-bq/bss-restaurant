import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  useCreateTableMutation,
  useUpdateTableMutation,
} from "../../../api/tables.api";
import { BASE_URL } from "../../../api/baseApi";

import type { Table, TableFormValues, TableMutationPayload } from "../types";

import ImagePicker from "../../../components/ImagePicker";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  table?: Table | null;
  onClose: () => void;
};

const getDefaultValues = (table?: Table | null): TableFormValues => {
  if (!table) {
    return {
      tableNumber: "",
      numberOfSeats: "",
      image: null,
    };
  }

  return {
    tableNumber: table.tableNumber ?? "",
    numberOfSeats: String(table.numberOfSeats ?? ""),
    image: table.image
      ? {
          fileName: table.image,
          base64: "",
          preview: `${BASE_URL}/images/table/${table.image}`,
        }
      : null,
  };
};

export default function TableFormDialog({ open, mode, table, onClose }: Props) {
  const isEdit = mode === "edit";

  const [createTable, createState] = useCreateTableMutation();
  const [updateTable, updateState] = useUpdateTableMutation();

  const isSubmitting = createState.isLoading || updateState.isLoading;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TableFormValues>({
    defaultValues: getDefaultValues(table),
  });

  const image = watch("image");

  useEffect(() => {
    if (open) {
      reset(getDefaultValues(table));
    }
  }, [open, table, reset]);

  const onSubmit = async (values: TableFormValues) => {
    const payload: TableMutationPayload = {
      tableNumber: values.tableNumber.trim(),
      numberOfSeats: Number(values.numberOfSeats),
      image: values.image?.fileName ?? "",
      base64: values.image?.base64 ?? "",
    };

    try {
      if (isEdit && table) {
        await updateTable({ id: table.id.toString(), body: payload }).unwrap();
      } else {
        await createTable(payload).unwrap();
      }

      onClose();
    } catch {
      // Keep the dialog open so the user doesn't lose the entered data.
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h6" component="span" sx={{ display: "block" }}>
          {isEdit ? "Edit Table" : "Add Table"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          component="span"
          sx={{ display: "block", fontWeight: 400 }}
        >
          {isEdit
            ? "Update the table's details below."
            : "Fill in the details to add a new table."}
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
        <Grid
          container
          spacing={2}
          component="form"
          id="table-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid size={12}>
            <ImagePicker
              value={image}
              disabled={isSubmitting}
              onChange={(value) => setValue("image", value)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Table number"
              {...register("tableNumber", {
                required: "Table number is required",
              })}
              error={!!errors.tableNumber}
              helperText={errors.tableNumber?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Number of seats"
              type="number"
              slotProps={{ htmlInput: { min: 1 } }}
              {...register("numberOfSeats", {
                required: "Number of seats is required",
                min: { value: 1, message: "At least 1 seat is required" },
              })}
              error={!!errors.numberOfSeats}
              helperText={errors.numberOfSeats?.message}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting} color="inherit">
          Cancel
        </Button>

        <Button
          type="submit"
          form="table-form"
          variant="contained"
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingPosition="start"
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Save Changes"
              : "Create Table"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
