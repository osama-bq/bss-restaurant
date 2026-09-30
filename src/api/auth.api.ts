import { baseApi } from "./baseApi";

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  refreshToken: string;
  refreshTokenExpiryTime: string;
  token: string;
  user: {
    email: string;
    fullName: string;
    id: string;
    phoneNumber: string;
    userName: string;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: "/api/Auth/SignIn",
        method: "POST",
        body: data,
        skipAuth: true,
      }),
    }),
  }),
});
