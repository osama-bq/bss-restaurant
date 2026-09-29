import { apiClient } from "./client";
import type { User } from "../features/auth/type";

export function getProfile(): Promise<User> {
    return apiClient("/api/Auth/profile", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
}