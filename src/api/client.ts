const BASE_URL = "https://bssrms.runasp.net";

type RequestOptions = RequestInit & {
    authenticated?: boolean;
};

export async function apiClient(endpoint: string, options: RequestOptions = {}) {

    const response = await fetch(BASE_URL + endpoint, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
}