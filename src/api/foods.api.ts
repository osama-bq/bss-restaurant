import { baseApi } from "./baseApi";
import type { Food, FoodMutationPayload } from "../features/foods/types";
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
      providesTags: ["Foods"],
    }),

    createFood: builder.mutation<unknown, FoodMutationPayload>({
      query: (body) => ({
        url: "/api/Food/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Foods"],
    }),

    updateFood: builder.mutation<
      unknown,
      {
        id: string;
        body: FoodMutationPayload;
      }
    >({
      query: ({ id, body }) => ({
        url: `/api/Food/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Foods"],
    }),

    deleteFood: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/api/Food/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Foods"],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = foodsApi;
