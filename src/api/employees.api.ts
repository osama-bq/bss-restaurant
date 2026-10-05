import { baseApi } from "./baseApi";
import type {
  Employee,
  EmployeeMutationPayload,
} from "../features/employees/type";
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

    createEmployee: builder.mutation<unknown, EmployeeMutationPayload>({
      query: (body) => ({
        url: "/api/Employee/create",
        method: "POST",
        body,
      }),
    }),

    updateEmployee: builder.mutation<
      unknown,
      {
        id: string;
        body: EmployeeMutationPayload;
      }
    >({
      query: ({ id, body }) => ({
        url: `/api/Employee/update/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteEmployee: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/api/Employee/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApi;
