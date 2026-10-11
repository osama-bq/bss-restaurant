import { Restaurant, RestaurantMenuOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import type { DashboardTopFood } from "../types";
import { BASE_URL } from "../../../api/baseApi";
import EmptyState from "../../../components/EmptyState";
import { dashboardCardContentSx, dashboardCardSx } from "../cardStyles";

type Props = {
  foods: DashboardTopFood[];
};

export default function TopSellingFoods({ foods }: Props) {
  const max = Math.max(...foods.map((f) => f.totalQuantitySold), 1);

  return (
    <Card
      variant="outlined"
      sx={{
        flex: 1.2,
        minWidth: 0,
        ...dashboardCardSx,
      }}
    >
      <CardContent sx={dashboardCardContentSx}>
        <Stack spacing={3}>
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Top Selling Foods
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Ranked by quantity sold
            </Typography>
          </Stack>

          {foods.length === 0 ? (
            <EmptyState
              compact
              icon={<RestaurantMenuOutlined />}
              title="No sales yet"
              description="Your best sellers will show up here once orders come in."
            />
          ) : (
            <Stack spacing={2.5}>
              {foods.map((food, index) => (
                <Stack
                  key={food.id}
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center" }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ width: 16, fontWeight: 600, textAlign: "center" }}
                  >
                    #{index + 1}
                  </Typography>

                  <Avatar
                    src={
                      food.image
                        ? `${BASE_URL}/images/food/${food.image}`
                        : undefined
                    }
                    alt={food.name}
                    variant="rounded"
                    sx={{ width: 44, height: 44 }}
                  >
                    <Restaurant fontSize="small" />
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600 }}
                        noWrap
                      >
                        {food.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ flexShrink: 0 }}
                      >
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, color: "text.primary" }}
                        >
                          {food.totalQuantitySold}
                        </Box>{" "}
                        sold
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={(food.totalQuantitySold / max) * 100}
                      sx={{
                        mt: 1,
                        height: 6,
                        borderRadius: 3,
                        bgcolor: "action.hover",
                        "& .MuiLinearProgress-bar": { borderRadius: 3 },
                      }}
                    />
                  </Box>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
