import { useState } from "react";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useGetDashboardStatsQuery } from "../../api/dashboard.api";
import StatCard from "./components/StatCard";

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

export default function DashboardPage() {
  const [month, setMonth] = useState((CURRENT_DATE.getMonth() + 1).toString());
  const [year, setYear] = useState(CURRENT_DATE.getFullYear().toString());

  const {
    data: stats,
    isLoading,
    error,
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
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Dashboard
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Overview for {MONTHS[Number(month) - 1]} {year}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Select
            size="small"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          >
            {MONTHS.map((name, index) => (
              <MenuItem key={name} value={index + 1}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <Select
            size="small"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          >
            {YEARS.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      {isLoading ? (
        <Stack spacing={3}>
          <DashboardSkeleton />
        </Stack>
      ) : error || !stats ? (
        <Typography color="error">Failed to load dashboard data.</Typography>
      ) : (
        <>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              secondary={`${stats.todaysOrders} today`}
            />

            <StatCard
              title="Total Revenue"
              value={`৳${stats.totalRevenue.toLocaleString()}`}
              secondary={`৳${stats.todaysRevenue.toLocaleString()} today`}
            />

            <StatCard
              title="Employees"
              value={stats.totalEmployees}
              secondary="Active restaurant staff"
            />

            <StatCard
              title="Foods"
              value={stats.totalFoods}
              secondary="Items in menu"
            />
          </Stack>
        </>
      )}
    </Stack>
  );
}

function DashboardSkeleton() {
  return (
    <Stack spacing={2}>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCard
            key={index}
            title="Loading"
            value="—"
            secondary=""
            loading
          />
        ))}
      </Stack>
    </Stack>
  );
}
