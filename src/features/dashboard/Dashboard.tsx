import { useState } from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useGetDashboardStatsQuery } from "../../api/dashboard.api";
import StatCard from "./components/StatCard";
import ErrorState from "../../components/ErrorState";
import TableOccupancy from "./components/TableOccupancy";
import {
  BadgeOutlined,
  CalendarMonthOutlined,
  PaymentsOutlined,
  ReceiptLongOutlined,
  RestaurantMenuOutlined,
} from "@mui/icons-material";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CURRENT_DATE = new Date();

const YEARS = Array.from(
  { length: 6 },
  (_, index) => CURRENT_DATE.getFullYear() - index,
);

const STAT_GRID_SX = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    lg: "repeat(4, 1fr)",
  },
  gap: 2,
};

export default function DashboardPage() {
  const [month, setMonth] = useState((CURRENT_DATE.getMonth() + 1).toString());
  const [year, setYear] = useState(CURRENT_DATE.getFullYear().toString());

  const {
    data: stats,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useGetDashboardStatsQuery({
    month,
    year,
  });

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
        }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Dashboard
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Here&apos;s what&apos;s happening at your restaurant
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Select
            size="small"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <CalendarMonthOutlined fontSize="small" />
              </InputAdornment>
            }
            sx={{ minWidth: 150, bgcolor: "background.paper" }}
          >
            {MONTHS.map((name, index) => (
              <MenuItem key={name} value={String(index + 1)}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <Select
            size="small"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            sx={{ minWidth: 100, bgcolor: "background.paper" }}
          >
            {YEARS.map((value) => (
              <MenuItem key={value} value={String(value)}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      {isLoading ? (
        <DashboardSkeleton />
      ) : error || !stats ? (
        <ErrorState
          title="Failed to load dashboard"
          description="We couldn't load the dashboard data. Please try again."
          onRetry={refetch}
        />
      ) : (
        <Stack
          spacing={2}
          sx={{
            opacity: isFetching ? 0.6 : 1,
            transition: "opacity 0.2s",
            pointerEvents: isFetching ? "none" : "auto",
          }}
        >
          <Box sx={STAT_GRID_SX}>
            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              icon={<ReceiptLongOutlined />}
              color="primary"
              badge={`${stats.todaysOrders} today`}
            />

            <StatCard
              title="Total Revenue"
              value={`৳${stats.totalRevenue.toLocaleString()}`}
              icon={<PaymentsOutlined />}
              color="success"
              badge={`৳${stats.todaysRevenue.toLocaleString()} today`}
            />

            <StatCard
              title="Employees"
              value={stats.totalEmployees}
              icon={<BadgeOutlined />}
              color="info"
              badge="Active"
            />

            <StatCard
              title="Foods"
              value={stats.totalFoods}
              icon={<RestaurantMenuOutlined />}
              color="warning"
              badge="In menu"
            />
          </Box>

          <Stack>
            <TableOccupancy
              total={stats.totalTables}
              occupied={stats.occupiedTables}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

function DashboardSkeleton() {
  return (
    <Stack spacing={2}>
      <Box sx={STAT_GRID_SX}>
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCard key={index} title="" value="" loading />
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 360px" },
          gap: 2,
        }}
      >
        <Skeleton variant="rounded" height={460} sx={{ borderRadius: 3 }} />
        <Skeleton variant="rounded" height={460} sx={{ borderRadius: 3 }} />
      </Box>
    </Stack>
  );
}
