import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/dashboard.api";

export default function DashboardPage() {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await getDashboardStats({ month: "06", year: "2024" });
        setContent(JSON.stringify(response, null, 2));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    }
    fetchDashboardData();
  }, []);
  return <div>{content || "Loading..."}</div>;
}
