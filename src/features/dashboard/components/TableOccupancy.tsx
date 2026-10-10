import {
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  total: number;
  occupied: number;
};

type Slice = { name: string; value: number; color: string };

type SliceTooltipProps = {
  active?: boolean;
  payload?: { payload: Slice }[];
  total: number;
};

function SliceTooltip({ active, payload, total }: SliceTooltipProps) {
  if (!active || !payload?.length) return null;

  const { name, value, color } = payload[0].payload;
  const share = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <Paper elevation={3} sx={{ px: 1.5, py: 1 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Box
          sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: color }}
        />

        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
      </Stack>

      <Typography variant="body2" color="text.secondary">
        {value} {value === 1 ? "table" : "tables"} · {share}%
      </Typography>
    </Paper>
  );
}

export default function TableOccupancy({ total, occupied }: Props) {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const available = Math.max(total - occupied, 0);

  const occupancyPercentage =
    total > 0 ? Math.round((occupied / total) * 100) : 0;

  const slices: Slice[] = [
    { name: "Occupied", value: occupied, color: theme.palette.warning.main },
    { name: "Available", value: available, color: theme.palette.success.main },
  ];

  const hasData = total > 0;

  const chartData: Slice[] = hasData
    ? slices
    : [
        {
          name: "No tables",
          value: 1,
          color: theme.palette.action.disabledBackground,
        },
      ];

  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: "100%", lg: 340 },
        flexShrink: 0,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Table Occupancy
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Current restaurant floor status
              </Typography>
            </div>

            <Chip size="small" variant="outlined" label={`${total} tables`} />
          </Stack>

          <Stack
            sx={{
              position: "relative",
              height: 230,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {hasData && (
                  <Tooltip
                    content={<SliceTooltip total={total} />}
                    wrapperStyle={{ outline: "none", zIndex: 1 }}
                  />
                )}

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="66%"
                  outerRadius="86%"
                  paddingAngle={hasData ? 3 : 0}
                  stroke="none"
                  isAnimationActive
                  animationDuration={700}
                  onMouseEnter={(_, index) => hasData && setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {chartData.map((slice, index) => (
                    <Cell
                      key={slice.name}
                      fill={slice.color}
                      fillOpacity={
                        activeIndex === null || activeIndex === index ? 1 : 0.4
                      }
                      style={{
                        outline: "none",
                        transition: "fill-opacity 0.2s",
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Centre label */}
            <Stack
              sx={{
                position: "absolute",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {occupancyPercentage}%
              </Typography>

              <Typography variant="body2" color="text.secondary">
                occupied
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{ p: 1.5, borderRadius: 2, bgcolor: "action.hover" }}
          >
            {slices.map((slice) => (
              <Stack key={slice.name} spacing={0.25} sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{ alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: slice.color,
                    }}
                  />

                  <Typography variant="caption" color="text.secondary">
                    {slice.name}
                  </Typography>
                </Stack>

                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {slice.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
