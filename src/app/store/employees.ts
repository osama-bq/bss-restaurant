import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    loading: false,
    error: null,
    loaded: false
  },
  reducers: {
    setEmployeesData: (state, action) => {
      state.data = action.payload;
    },
    setEmployeesLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEmployeesLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setEmployeesError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default employeesSlice.reducer;

export const { setEmployeesData, setEmployeesLoading, setEmployeesLoaded, setEmployeesError } = employeesSlice.actions;