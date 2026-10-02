export type DashboardRecentOrder = {
  id: string;
  orderNumber: string;
  amount: number;
  orderStatus: string;
  orderTime: string;
  tableNumber: string;
};

export type DashboardTopFood = {
  id: number;
  name: string;
  price: number;
  image: string;
  totalQuantitySold: number;
  totalRevenue: number;
};

export type DashboardStats = {
  totalOrders: number;
  totalRevenue: number;
  totalEmployees: number;
  totalFoods: number;
  todaysOrders: number;
  todaysRevenue: number;
  totalTables: number;
  occupiedTables: number;

  salesRevenue: {
    todaysSales: number;
    monthlySales: number;
    yearlySales: number;
    totalSales: number;
    todaysSalesAmount: number;
    monthlySalesAmount: number;
    yearlySalesAmount: number;
    totalSalesAmount: number;
    todaysExpenses: number;
    monthlyExpenses: number;
    yearlyExpenses: number;
    totalExpenses: number;
    todaysRevenue: number;
    monthlyRevenue: number;
    yearlyRevenue: number;
    totalRevenue: number;
  };

  recentOrders: DashboardRecentOrder[];
  topSellingFoods: DashboardTopFood[];
};
