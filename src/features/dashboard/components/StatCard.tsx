import {
  Box,
  Card,
  CardContent,
  Chip,
  Skeleton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import type { ReactNode } from "react";
import { dashboardCardContentSx, dashboardCardSx } from "../cardStyles";

type Props = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: "primary" | "secondary" | "success" | "info" | "warning";
  badge?: string;
  loading?: boolean;
};

export default function StatCard({
  title,
  value,
  icon,
  color = "primary",
  badge,
  loading = false,
}: Props) {
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.05)} 0%, ${alpha(
          theme.palette[color].main,
          0.1,
        )} 100%)`,
        ...dashboardCardSx,
      }}
    >
      <CardContent sx={dashboardCardContentSx}>
        <Stack spacing={2.5}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
            {loading ? (
              <Skeleton variant="rounded" width={48} height={48} />
            ) : (
              <Box
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  color: theme.palette[color].main,
                  bgcolor: alpha(theme.palette[color].main, 0.12),
                })}
              >
                {icon}
              </Box>
            )}

            {!loading && badge && (
              <Chip
                size="small"
                label={badge}
                sx={(theme) => ({
                  fontWeight: 600,
                  color: theme.palette[color].dark,
                  bgcolor: alpha(theme.palette[color].main, 0.12),
                })}
              />
            )}
          </Stack>

          {loading ? (
            <Stack spacing={0.5}>
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="70%" height={42} />
            </Stack>
          ) : (
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>

              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {value}
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
