import { baseApi } from "./baseApi";
import type { Employee } from "../features/employees/type";

export interface SearchRequest {
  Search?: string;
  Sort?: string;
  Page: number;
  Per_Page: number;
}

export interface EmployeesResponse {
  data: Employee[];
}

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeesResponse, SearchRequest>({
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
