import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { DeleteOutlined, EditOutlined, Restaurant } from "@mui/icons-material";
import type { Food } from "../types";

const IMAGE_BASE_URL = "https://bssrms.runasp.net/images/food/";

type Props = {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (food: Food) => void;
};

export default function FoodTableRow({ food, onEdit, onDelete }: Props) {
  const hasDiscount = food.discountType !== "None" && food.discount > 0;

  return (
    <TableRow hover>
      <TableCell sx={{ px: 2, py: 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Avatar
            src={food.image ? `${IMAGE_BASE_URL}${food.image}` : undefined}
            alt={food.name}
            variant="rounded"
            sx={{
              width: 48,
              height: 48,
            }}
          >
            <Restaurant fontSize="small" />
          </Avatar>

          <Stack
            sx={{
              minWidth: 0,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
              {food.name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{
                maxWidth: 420,
              }}
            >
              {food.description}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell sx={{ px: 2, py: 1 }}>
        <Typography variant="body2">৳{food.price.toLocaleString()}</Typography>
      </TableCell>

      <TableCell sx={{ px: 2, py: 1 }}>
        {!hasDiscount ? (
          <Typography variant="body2" color="text.secondary">
            —
          </Typography>
        ) : (
          <Chip
            size="small"
            variant="outlined"
            color="success"
            label={
              food.discountType === "Percentage"
                ? `${food.discount}% OFF`
                : `৳${food.discount} OFF`
            }
          />
        )}
      </TableCell>

      <TableCell sx={{ px: 2, py: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          ৳{food.discountPrice.toLocaleString()}
        </Typography>
      </TableCell>

      <TableCell align="right" sx={{ px: 2, py: 1 }}>
        <IconButton
          size="small"
          aria-label="Food edit"
          onClick={() => onEdit(food)}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: 36,
            height: 36,
          }}
        >
          <EditOutlined fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          aria-label="Food delete"
          onClick={() => onDelete(food)}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: 36,
            height: 36,
            ml: 1,
            color: "error.main",
          }}
        >
          <DeleteOutlined fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
