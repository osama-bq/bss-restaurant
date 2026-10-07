import { baseApi } from "./baseApi";

export type EmployeeTableRelation = {
  employeeTableId: number;
  employee: {
    employeeId: string;
    name: string;
  };
  table: {
    tableId: number;
    tableNumber: string;
  };
};

export type CreateEmployeeTablePayload = {
  employeeId: string;
  tableId: number;
};

export const employeeTablesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeTables: builder.query<EmployeeTableRelation[], void>({
      query: () => ({
        url: "/api/EmployeeTable/get",
      }),
      providesTags: ["EmployeeTables"],
    }),

    createEmployeeTableRange: builder.mutation<
      unknown,
      CreateEmployeeTablePayload[]
    >({
      query: (body) => ({
        url: "/api/EmployeeTable/create-range",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EmployeeTables", "Tables"],
    }),

    deleteEmployeeTable: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/api/EmployeeTable/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmployeeTables", "Tables"],
    }),
  }),
});

export const {
  useGetEmployeeTablesQuery,
  useCreateEmployeeTableRangeMutation,
  useDeleteEmployeeTableMutation,
} = employeeTablesApi;
