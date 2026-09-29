import { baseApi } from "./baseApi";
import type { User } from "../features/auth/type";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({
        url: "/api/Auth/profile",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
