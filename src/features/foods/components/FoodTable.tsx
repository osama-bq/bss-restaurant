import { DeleteOutlined, EditOutlined, Restaurant } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import type { Food } from "../types";
import { BASE_URL } from "../../../api/baseApi";

type Props = {
  foods: Food[];
  isLoading: boolean;
  error: unknown;
  onEdit: (food: Food) => void;
  onDelete: (food: Food) => void;
};

export default function FoodTable({
  foods,
  isLoading,
  error,
  onEdit,
  onDelete,
}: Props) {
  if (isLoading) {
    return (
      <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {["Food", "Price", "Discount", "Discounted Price", "Actions"].map(
                (header) => (
                  <TableCell key={header}>
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "center" }}
                  >
                    <Skeleton variant="rounded" width={48} height={48} />
                    <Stack sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="45%" />
                      <Skeleton variant="text" width="70%" />
                    </Stack>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Skeleton variant="text" width={60} />
                </TableCell>

                <TableCell>
                  <Skeleton variant="rounded" width={70} height={24} />
                </TableCell>

                <TableCell>
                  <Skeleton variant="text" width={60} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="error">Failed to load foods.</Typography>
      </Paper>
    );
  }

  if (foods.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">No foods found.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                bgcolor: "action.hover",
                fontWeight: 600,
              },
            }}
          >
            <TableCell>Food</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Discounted Price</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {foods.map((food) => (
            <TableRow
              key={food.id}
              hover
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              <TableCell>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center", minWidth: 280 }}
                >
                  <Avatar
                    src={`${BASE_URL}/images/food/${food.image}`}
                    alt={food.name}
                    variant="rounded"
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "action.hover",
                    }}
                  >
                    <Restaurant fontSize="small" />
                  </Avatar>

                  <Stack sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {food.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ maxWidth: 380 }}
                    >
                      {food.description}
                    </Typography>
                  </Stack>
                </Stack>
              </TableCell>

              <TableCell>
                <Typography sx={{ fontWeight: 600 }}>৳{food.price}</Typography>
              </TableCell>

              <TableCell>
                {food.discountType === "None" ? (
                  <Typography variant="body2" color="text.secondary">
                    —
                  </Typography>
                ) : (
                  <Chip
                    size="small"
                    color="success"
                    variant="outlined"
                    label={
                      food.discountType === "Percentage"
                        ? `${food.discount}% OFF`
                        : `৳${food.discount} OFF`
                    }
                  />
                )}
              </TableCell>

              <TableCell>
                <Typography sx={{ fontWeight: 600 }}>
                  ৳{food.discountPrice}
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Tooltip title="Edit food">
                  <IconButton size="small" onClick={() => onEdit(food)}>
                    <EditOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete food">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(food)}
                  >
                    <DeleteOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
