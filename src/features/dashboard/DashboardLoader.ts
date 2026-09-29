import { store } from "../../app/store/store.ts";
import { getDashboardStats } from "../../api/dashboard.api.ts";
import { setDashboardData, setDashboardLoaded } from "../../app/store/dashboard.ts";

export async function dashboardLoader() {
  const state = store.getState();

  if (state.dashboard.loaded) {
    return state.dashboard.data;
  }

  const now = new Date();
  const thisMonth = now.getMonth() + 1;
  const thisYear = now.getFullYear();

  const data = await getDashboardStats({
    month: thisMonth.toString(),
    year: thisYear.toString(),
  });

  store.dispatch(setDashboardData(data));
  store.dispatch(setDashboardLoaded(true));

  return state.dashboard.data;
}