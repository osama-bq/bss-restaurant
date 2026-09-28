import { apiClient } from "./client";

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

export function login(data: LoginRequest): Promise<LoginResponse> {
    return apiClient("/api/Auth/signIn", {
        method: "POST",
        body: JSON.stringify(data)
    });
}