import { baseApi } from "./baseApi";

import type { Employee } from "../features/employees/type";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployee: builder.query<Employee, void>({
      query: () => ({
        url: "/api/Employee/get",
      }),
    }),
  }),
});

export const { useGetEmployeeQuery } = dashboardApi;
