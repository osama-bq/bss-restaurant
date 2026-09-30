import { baseApi } from "./baseApi";
import type { Table } from "../features/tables/types";
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
    }),
  }),
});

export const { useGetTablesQuery } = tablesApi;
