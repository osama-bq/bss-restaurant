import { baseApi } from "./baseApi";
import type { Order } from "../features/orders/types";
import type { PaginationRequest, PaginationResponse } from "./types";

export interface OrdersPaginationRequest extends PaginationRequest {
  Status?: 0 | 1 | 2 | 3 | 4 | 5;
}

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<
      PaginationResponse<Order>,
      OrdersPaginationRequest
    >({
      query: ({ Search, Sort, Page, Per_Page, Status }) => ({
        url: "/api/Order/datatable",
        params: {
          Sort: Sort || "",
          Search: Search || "",
          Page,
          Per_Page,
          Status: Status !== undefined ? Status : "",
        },
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
