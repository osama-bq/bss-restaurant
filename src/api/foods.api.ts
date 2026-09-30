import { baseApi } from "./baseApi";
import type { Food } from "../features/foods/types";
import type { PaginationRequest, PaginationResponse } from "./types";

export const foodsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFoods: builder.query<PaginationResponse<Food>, PaginationRequest>({
      query: ({ Search, Sort, Page, Per_Page }) => ({
        url: "/api/Food/datatable",
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

export const { useGetFoodsQuery } = foodsApi;
