import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { clearSession, refreshAccessToken } from "../app/auth/authRefresh";

export const BASE_URL = "https://bssrms.runasp.net";

export type AuthFetchArgs = FetchArgs & {
  skipAuth?: boolean;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: (headers, { arg }) => {
    /*
     * If this particular request says skipAuth,
     * don't attach the Authorization header.
     */
    const skipAuth =
      typeof arg === "object" &&
      arg !== null &&
      "skipAuth" in arg &&
      arg.skipAuth === true;

    if (!skipAuth) {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    headers.set("Content-Type", "application/json");

    return headers;
  },
});

const baseQueryWithRefresh: BaseQueryFn<
  string | AuthFetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  /*
   * First attempt.
   */
  let result = await rawBaseQuery(args, api, extraOptions);

  /*
   * Anything other than 401 is returned normally.
   */
  if (result.error?.status !== 401) {
    return result;
  }

  /*
   * The access token is invalid/expired.
   *
   * refreshAccessToken() contains the shared refresh lock.
   *
   * If another request is already refreshing, this call
   * simply waits for that same Promise.
   */
  const refreshSucceeded = await refreshAccessToken();

  /*
   * Refresh failed.
   */
  if (!refreshSucceeded) {
    clearSession();

    return result;
  }

  /*
   * Refresh succeeded.
   *
   * prepareHeaders() will now read the NEW token from
   * localStorage and attach it to the retry.
   */
  result = await rawBaseQuery(args, api, extraOptions);

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Employees", "Foods"],
  endpoints: () => ({}),
});
