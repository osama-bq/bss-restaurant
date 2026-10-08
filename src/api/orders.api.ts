import { baseApi } from "./baseApi";
import type {
  Order,
  OrderMutationPayload,
  OrderStatusValue,
} from "../features/orders/types";
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
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation<unknown, OrderMutationPayload>({
      query: (body) => ({
        url: "/api/Order/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation<
      unknown,
      { id: string; body: OrderMutationPayload }
    >({
      query: ({ id, body }) => ({
        url: `/api/Order/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation<
      unknown,
      { id: string; body: { status: OrderStatusValue } }
    >({
      query: ({ id, body }) => ({
        url: `/api/Order/update-status/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Orders", "Tables"],
    }),
    deleteOrder: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/api/Order/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = ordersApi;
