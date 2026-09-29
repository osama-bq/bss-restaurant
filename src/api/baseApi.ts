import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://bssrms.runasp.net";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");

    return headers;
  },
});

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
};

/*
 * If multiple requests receive 401 at the same time,
 * they will all wait for this same promise instead of
 * sending multiple refresh requests.
 */
let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(
  api: Parameters<BaseQueryFn>[1],
  extraOptions: Parameters<BaseQueryFn>[2],
): Promise<boolean> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return false;
  }

  const result = await rawBaseQuery(
    {
      url: "/api/Auth/refreshToken",
      method: "POST",
      body: {
        refreshToken,
      },
    },
    api,
    extraOptions,
  );

  if (!result.data) {
    return false;
  }

  const data = result.data as RefreshResponse;

  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("refreshTokenExpiryTime", data.refreshTokenExpiryTime);

  return true;
}

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // First attempt
  let result = await rawBaseQuery(args, api, extraOptions);

  // Everything other than 401 is handled normally
  if (result.error?.status !== 401) {
    return result;
  }

  /*
   * Access token expired.
   *
   * If another request is already refreshing the token,
   * wait for that refresh instead of starting another one.
   */
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken(api, extraOptions);

    try {
      await refreshPromise;
    } finally {
      refreshPromise = null;
    }
  } else {
    await refreshPromise;
  }

  /*
   * Check whether the refresh succeeded.
   *
   * If it failed, the refresh token is probably expired
   * or invalid.
   */
  const refreshSucceeded = localStorage.getItem("token") !== null;

  if (!refreshSucceeded) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpiryTime");

    return result;
  }

  // Retry the original request with the new access token
  result = await rawBaseQuery(args, api, extraOptions);

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithRefresh,

  endpoints: () => ({}),
});
