import { baseApi } from "./baseApi";
import type { Table, TableMutationPayload } from "../features/tables/types";
import type { PaginationRequest, PaginationResponse } from "./types";

export const tablesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query<PaginationResponse<Table>, PaginationRequest>({
      query: ({ Search, Sort, Page, Per_Page }) => ({
        url: "/api/Table/datatable",
        params: {
          Sort: Sort || "",
          Search: Search || "",
          Page,
          Per_Page,
        },
      }),
      providesTags: ["Tables"],
    }),

    createTable: builder.mutation<unknown, TableMutationPayload>({
      query: (body) => ({
        url: "/api/Table/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tables"],
    }),

    updateTable: builder.mutation<
      unknown,
      {
        id: string;
        body: TableMutationPayload;
      }
    >({
      query: ({ id, body }) => ({
        url: `/api/Table/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tables"],
    }),

    deleteTable: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/api/Table/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tables"],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
} = tablesApi;
