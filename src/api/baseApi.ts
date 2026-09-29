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

const baseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("refreshTokenExpiryTime");

            return result;
        }

        const refreshResult = await rawBaseQuery(
            {
                url: "/api/Auth/refreshToken",
                method: "POST",
                body: {
                    refreshToken,
                },
            },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const data = refreshResult.data as {
                accessToken: string;
                refreshToken: string;
                refreshTokenExpiryTime: string;
            };

            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem(
                "refreshTokenExpiryTime",
                data.refreshTokenExpiryTime
            );

            // Retry original request with the new token
            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("refreshTokenExpiryTime");
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithRefresh,
    endpoints: () => ({}),
});