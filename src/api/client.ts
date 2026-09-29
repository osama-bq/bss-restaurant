const BASE_URL = "https://bssrms.runasp.net";

export async function apiClient(endpoint: string, options: RequestInit = {}, needsAuthorization: boolean = false): Promise<any> {

    const response = await fetch(BASE_URL + endpoint, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(needsAuthorization ? { "Authorization": `Bearer ${localStorage.getItem("token")}` } : {}),
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
}