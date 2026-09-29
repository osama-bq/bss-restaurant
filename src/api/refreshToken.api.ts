import { apiClient } from "./client";

export interface TokenRequest {
    refreshToken: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiryTime: string;
}

export function getAccessToken(data: TokenRequest): Promise<TokenResponse> {
    return apiClient("/api/Auth/refreshToken", {
        method: "POST",
        body: JSON.stringify(data)
    });
}