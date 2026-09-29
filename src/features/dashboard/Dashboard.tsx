import { useGetDashboardStatsQuery } from "../../api/dashboard.api";

export default function DashboardPage() {
  const { data, isLoading, error } = useGetDashboardStatsQuery({
    month: String(new Date().getMonth() + 1),
    year: String(new Date().getFullYear()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load dashboard data.</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
