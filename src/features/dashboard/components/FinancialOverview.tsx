import { TrendingDown, TrendingUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dashboardCardContentSx, dashboardCardSx } from "../cardStyles";

type Props = {
  financial: {
    yearlySalesAmount: number;
    yearlyExpenses: number;
    yearlyRevenue: number;
  };
};

type Row = { name: string; value: number; color: string };

const CURRENCY = "৳";

const money = (value: number) => `${CURRENCY}${value.toLocaleString()}`;

const compact = new Intl.NumberFormat("en", { notation: "compact" });

const percentOf = (part: number, whole: number) =>
  whole > 0 ? Math.round((part / whole) * 100) : 0;

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: Row }[];
}) {
  if (!active || !payload?.length) return null;

  const { name, value, color } = payload[0].payload;

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
        {money(value)}
      </Typography>
    </Paper>
  );
}

export default function FinancialOverview({ financial }: Props) {
  const theme = useTheme();

  const { yearlySalesAmount, yearlyExpenses, yearlyRevenue } = financial;

  const rows: Row[] = [
    {
      name: "Sales",
      value: yearlySalesAmount,
      color: theme.palette.primary.main,
    },
    {
      name: "Expenses",
      value: yearlyExpenses,
      color: theme.palette.warning.main,
    },
    {
      name: "Net Revenue",
      value: yearlyRevenue,
      color: theme.palette.success.main,
    },
  ];

  const margin = percentOf(yearlyRevenue, yearlySalesAmount);
  const tone = yearlyRevenue >= 0 ? "success" : "error";

  return (
    <Card
      variant="outlined"
      sx={{
        flex: 1,
        minWidth: 0,
        ...dashboardCardSx,
      }}
    >
      <CardContent sx={dashboardCardContentSx}>
        <Stack spacing={3}>
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Financial Overview
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Year-to-date financial summary
            </Typography>
          </Stack>

          {/* Headline figure */}
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              Net revenue
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center", flexWrap: "wrap" }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {money(yearlyRevenue)}
              </Typography>

              <Chip
                size="small"
                icon={tone === "success" ? <TrendingUp /> : <TrendingDown />}
                label={`${margin}% profit margin`}
                sx={{
                  fontWeight: 600,
                  color: theme.palette[tone].dark,
                  bgcolor: alpha(theme.palette[tone].main, 0.12),
                  "& .MuiChip-icon": { color: "inherit" },
                }}
              />
            </Stack>
          </Stack>

          <Stack sx={{ width: "100%", height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rows}
                layout="vertical"
                barCategoryGap="28%"
                margin={{ top: 0, right: 12, bottom: 0, left: 8 }}
              >
                <defs>
                  {rows.map((row, index) => (
                    <linearGradient
                      key={row.name}
                      id={`fin-grad-${index}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop
                        offset="0%"
                        stopColor={row.color}
                        stopOpacity={0.45}
                      />
                      <stop
                        offset="100%"
                        stopColor={row.color}
                        stopOpacity={1}
                      />
                    </linearGradient>
                  ))}
                </defs>

                <CartesianGrid
                  horizontal={false}
                  strokeDasharray="3 3"
                  stroke={theme.palette.divider}
                />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                  tickFormatter={(value) =>
                    `${CURRENCY}${compact.format(value)}`
                  }
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={84}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 13, fill: theme.palette.text.primary }}
                />

                <Tooltip
                  cursor={false}
                  content={<ChartTooltip />}
                  wrapperStyle={{ outline: "none", zIndex: 1 }}
                />

                <Bar
                  dataKey="value"
                  radius={[0, 6, 6, 0]}
                  background={{
                    fill: alpha(theme.palette.text.primary, 0.05),
                    radius: 6,
                  }}
                  isAnimationActive
                  animationDuration={700}
                >
                  {rows.map((row, index) => (
                    <Cell key={row.name} fill={`url(#fin-grad-${index})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FinancialValue
              label="Sales"
              value={yearlySalesAmount}
              color={rows[0].color}
              caption="Total sales this year"
            />

            <FinancialValue
              label="Expenses"
              value={yearlyExpenses}
              color={rows[1].color}
              caption={`${percentOf(yearlyExpenses, yearlySalesAmount)}% of sales`}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function FinancialValue({
  label,
  value,
  color,
  caption,
}: {
  label: string;
  value: number;
  color: string;
  caption: string;
}) {
  return (
    <Stack
      spacing={0.5}
      sx={{
        flex: 1,
        minWidth: 0,
        p: 2,
        borderRadius: 2,
        bgcolor: "action.hover",
      }}
    >
      <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
        <Box
          sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }}
        />

        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>

      <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
        {money(value)}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        {caption}
      </Typography>
    </Stack>
  );
}
