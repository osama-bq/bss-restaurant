import { Add, Remove, Restaurant } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { Food } from "../../foods/types";
import { BASE_URL } from "../../../api/baseApi";

type Props = {
  food: Food;
  quantity: number;
  onAdd: (food: Food) => void;
  onDecrease: (foodId: number) => void;
};

export default function FoodCard({ food, quantity, onAdd, onDecrease }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Avatar
        src={`${BASE_URL}/images/food/${food.image}`}
        variant="rounded"
        sx={{
          width: "100%",
          height: 150,
          borderRadius: 0,
        }}
      >
        <Restaurant sx={{ fontSize: 42 }} />
      </Avatar>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
          {food.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            minHeight: 40,
          }}
        >
          {food.description}
        </Typography>

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>৳{food.price}</Typography>

          {quantity === 0 ? (
            <Button
              size="small"
              variant="contained"
              startIcon={<Add />}
              onClick={() => onAdd(food)}
            >
              Add
            </Button>
          ) : (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                alignItems: "center",
              }}
            >
              <IconButton
                size="small"
                aria-label={`Remove one ${food.name}`}
                onClick={() => onDecrease(food.id)}
              >
                <Remove fontSize="small" />
              </IconButton>

              <Box
                sx={{
                  minWidth: 28,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {quantity}
                </Typography>
              </Box>

              <IconButton
                size="small"
                aria-label={`Add one ${food.name}`}
                onClick={() => onAdd(food)}
              >
                <Add fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
