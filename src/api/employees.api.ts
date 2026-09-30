import { baseApi } from "./baseApi";
import type { Employee } from "../features/employees/type";
import type { PaginationRequest, PaginationResponse } from "./types";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<
      PaginationResponse<Employee>,
      PaginationRequest
    >({
      query: ({ Search, Sort, Page, Per_Page }) => ({
        url: "/api/Employee/datatable",
        params: {
          Sort: Sort || "",
          Search: Search || "",
          Page,
          Per_Page,
        },
      }),
    }),
  }),
});

export const { useGetEmployeesQuery } = employeesApi;
