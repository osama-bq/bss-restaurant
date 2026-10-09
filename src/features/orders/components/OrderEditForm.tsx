import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import { useUpdateOrderMutation } from "../../../api/orders.api";

import type { Order, OrderMutationPayload } from "../types";
import { useOrderEditCart } from "../hooks/useOrderEditCart";

import OrderDetailsFields, {
  type OrderEditFormValues,
} from "./order-edit/OrderDetailsFields";
import OrderFoodPicker from "./order-edit/OrderFoodPicker";
import OrderCartPanel from "./order-edit/OrderCartPanel";

type Props = {
  open: boolean;
  order: Order | null;
  onClose: () => void;
};

type SessionProps = {
  order: Order;
  onClose: () => void;
};

export default function OrderEditForm({ open, order, onClose }: Props) {
  if (!open || !order) return null;

  return <OrderEditSession key={order.id} order={order} onClose={onClose} />;
}

function OrderEditSession({ order, onClose }: SessionProps) {
  const [updateOrder, updateState] = useUpdateOrderMutation();

  const isSubmitting = updateState.isLoading;

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<OrderEditFormValues>({
    defaultValues: {
      phoneNumber: order.orderedBy?.phoneNumber ?? "",
    },
  });

  const {
    items,
    quantities,
    total,
    totalQuantity,
    addFood,
    changeQuantity,
    removeItem,
  } = useOrderEditCart(order);

  const onSubmit = async (values: OrderEditFormValues) => {
    if (items.length === 0) return;

    setSubmitError(null);

    const payload: OrderMutationPayload = {
      tableId: order.table.tableId,
      orderNumber: order.orderNumber,
      amount: total,
      phoneNumber: values.phoneNumber.trim(),
      items: items.map((item) => ({
        foodId: item.foodId,
        foodPackageId: null,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * item.quantity,
      })),
    };

    try {
      await updateOrder({
        id: order.id,
        body: payload,
      }).unwrap();

      onClose();
    } catch {
      setSubmitError("Failed to update the order. Please try again.");
    }
  };

  return (
    <FormProvider {...form}>
      <Dialog
        open
        onClose={isSubmitting ? undefined : onClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Typography variant="h6" component="span" sx={{ display: "block" }}>
            Edit Order
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            component="span"
            sx={{
              display: "block",
              fontWeight: 400,
            }}
          >
            Update the contact number or change the items in this order.
          </Typography>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            px: { xs: 2, sm: 3 },
            py: 3,
          }}
        >
          <Stack
            component="form"
            id="order-form"
            onSubmit={form.handleSubmit(onSubmit)}
            spacing={3}
            divider={<Divider flexItem />}
          >
            <OrderDetailsFields order={order} />

            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 7 }}>
                <OrderFoodPicker
                  quantities={quantities}
                  isSubmitting={isSubmitting}
                  onAdd={addFood}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <OrderCartPanel
                  items={items}
                  total={total}
                  totalQuantity={totalQuantity}
                  isSubmitting={isSubmitting}
                  onChangeQuantity={changeQuantity}
                  onRemove={removeItem}
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting} color="inherit">
            Cancel
          </Button>

          <Button
            type="submit"
            form="order-form"
            variant="contained"
            disabled={isSubmitting || items.length === 0}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
