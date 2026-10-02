import { baseApi } from "./baseApi";
import type {
  DashboardRecentOrder,
  DashboardTopFood,
} from "../features/dashboard/types";

export interface StatsTimeRequest {
  month: string;
  year: string;
}

export interface DashboardStatsResponse {
  occupiedTables: number;
  recentOrders: DashboardRecentOrder[];
  salesRevenue: {
    monthlyExpenses: number;
    monthlyRevenue: number;
    monthlySales: number;
    monthlySalesAmount: number;
    todaysExpenses: number;
    todaysRevenue: number;
    todaysSales: number;
    todaysSalesAmount: number;
    totalExpenses: number;
    totalRevenue: number;
    totalSales: number;
    totalSalesAmount: number;
    yearlyExpenses: number;
    yearlyRevenue: number;
    yearlySales: number;
    yearlySalesAmount: number;
  };
  todaysOrders: number;
  todaysRevenue: number;
  topSellingFoods: DashboardTopFood[];
  totalEmployees: number;
  totalFoods: number;
  totalOrders: number;
  totalRevenue: number;
  totalTables: number;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStatsResponse, StatsTimeRequest>({
      query: ({ month, year }) => ({
        url: "/api/Dashboard/stats",
        params: {
          Month: month,
          Year: year,
        },
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
