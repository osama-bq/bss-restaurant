import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";

import {
  useCreateFoodMutation,
  useUpdateFoodMutation,
} from "../../../api/foods.api";

import type {
  Discount,
  Food,
  FoodFormValues,
  FoodMutationPayload,
} from "../types";

import ImagePicker from "../../../components/ImagePicker";

const IMAGE_BASE_URL = "https://bssrms.runasp.net/images/food/";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  food?: Food | null;
  onClose: () => void;
};

const getDefaultValues = (food?: Food | null): FoodFormValues => {
  if (!food) {
    return {
      name: "",
      description: "",
      price: "",
      discountType: "None",
      discount: "0",
      image: null,
    };
  }

  return {
    name: food.name ?? "",
    description: food.description ?? "",
    price: String(food.price),
    discountType: food.discountType,
    discount: String(food.discount ?? 0),

    image: food.image
      ? {
          fileName: food.image,
          base64: "",
          preview: `${IMAGE_BASE_URL}${food.image}`,
        }
      : null,
  };
};

export default function FoodFormDialog({ open, mode, food, onClose }: Props) {
  const isEdit = mode === "edit";

  const [createFood, createState] = useCreateFoodMutation();

  const [updateFood, updateState] = useUpdateFoodMutation();

  const isSubmitting = createState.isLoading || updateState.isLoading;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FoodFormValues>({
    defaultValues: getDefaultValues(food),
  });

  const image = watch("image");
  const price = watch("price");
  const discountType = watch("discountType");
  const discount = watch("discount");

  useEffect(() => {
    if (open) {
      reset(getDefaultValues(food));
    }
  }, [open, food, reset]);

  const onSubmit = async (values: FoodFormValues) => {
    const basePrice = Number(values.price);
    const discount = Number(values.discount) || 0;

    const discountPrice = calculateDiscountPrice(
      basePrice,
      values.discountType,
      discount,
    );

    if (discountPrice < 0) {
      return;
    }

    const payload: FoodMutationPayload = {
      name: values.name.trim(),
      description: values.description.trim(),
      price: basePrice,
      discountType: values.discountType,
      discount,
      image: values.image?.fileName ?? "",
      base64: values.image?.base64 ?? "",
    };

    try {
      if (isEdit && food) {
        await updateFood({
          id: food.id.toString(),
          body: payload,
        }).unwrap();
      } else {
        await createFood(payload).unwrap();
      }

      onClose();
    } catch {
      // Keep the form open and preserve input.
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h6" component="span" sx={{ display: "block" }}>
          {isEdit ? "Edit Food" : "Add Food"}
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
          {isEdit
            ? "Update the food item's details below."
            : "Fill in the details to add a new menu item."}
        </Typography>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          px: {
            xs: 2,
            sm: 3,
          },
          py: 3,
        }}
      >
        <Stack
          component="form"
          id="food-form"
          onSubmit={handleSubmit(onSubmit)}
          divider={<Divider flexItem />}
          spacing={3}
        >
          <FormSection
            title="Food image"
            description="Shown in the menu and order screens."
          >
            <Grid size={{ xs: 12 }}>
              <ImagePicker
                value={image}
                disabled={isSubmitting}
                onChange={(value) => setValue("image", value)}
              />
            </Grid>
          </FormSection>

          <FormSection
            title="Basic information"
            description="The name and description shown to staff and customers."
          >
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Food name"
                {...register("name", {
                  required: "Food name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
          </FormSection>

          <FormSection
            title="Pricing"
            description="Set the base price and optional discount."
          >
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Base price"
                {...register("price", {
                  required: "Base price is required",
                  min: {
                    value: 0,
                    message: "Price cannot be negative",
                  },
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                label="Discount type"
                {...register("discountType")}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Percentage">Percentage</MenuItem>
                <MenuItem value="Flat">Flat</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Discount"
                disabled={discountType === "None"}
                {...register("discount", {
                  required:
                    discountType === "None" ? false : "Discount is required",

                  min: {
                    value: 0,
                    message: "Discount cannot be negative",
                  },

                  validate: (value) => {
                    const discount = Number(value);
                    const basePrice = Number(price) || 0;

                    if (discountType === "Percentage") {
                      if (discount > 100) {
                        return "Percentage cannot exceed 100%";
                      }
                    }

                    if (discountType === "Flat" && discount > basePrice) {
                      return "Discount cannot exceed base price";
                    }

                    return true;
                  },
                })}
                error={!!errors.discount}
                helperText={errors.discount?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Selling price"
                value={calculateDiscountPrice(
                  Number(price) || 0,
                  discountType,
                  Number(discount) || 0,
                )}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                helperText="Calculated automatically"
              />
            </Grid>
          </FormSection>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Button onClick={onClose} disabled={isSubmitting} color="inherit">
          Cancel
        </Button>

        <Button
          type="submit"
          form="food-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Create Food"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function calculateDiscountPrice(
  price: number,
  discountType: Discount,
  discount: number,
) {
  if (discountType === "None") {
    return price;
  }

  if (discountType === "Percentage") {
    return price - (price * discount) / 100;
  }

  return price - discount;
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Grid
      container
      spacing={{
        xs: 2,
        md: 4,
      }}
    >
      <Grid
        size={{
          xs: 12,
          md: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Grid>

      <Grid
        container
        size={{
          xs: 12,
          md: 9,
        }}
        spacing={2}
      >
        {children}
      </Grid>
    </Grid>
  );
}
