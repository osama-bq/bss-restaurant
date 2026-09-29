import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: [],
    loading: false,
    error: null,
    loaded: false
  },
  reducers: {
    setDashboardData: (state, action) => {
      state.data = action.payload;
    },
    setDashboardLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDashboardLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setDashboardError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default dashboardSlice.reducer;

export const { setDashboardData, setDashboardLoading, setDashboardLoaded, setDashboardError } = dashboardSlice.actions;