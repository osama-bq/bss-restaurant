const BASE_URL = "https://bssrms.runasp.net";

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
};

/*
 * This is shared by BOTH:
 *
 * 1. AuthSessionManager
 * 2. baseApi's 401 handler
 *
 * Therefore, only one refresh request can be running
 * at a time.
 */
let refreshPromise: Promise<boolean> | null = null;

async function performRefresh(): Promise<boolean> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/Auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as RefreshResponse;

    if (!data.accessToken || !data.refreshToken) {
      return false;
    }

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("refreshTokenExpiryTime", data.refreshTokenExpiryTime);

    return true;
  } catch {
    return false;
  }
}

/**
 * Refresh the access token.
 *
 * If a refresh is already happening, everyone waits
 * for the same Promise.
 */
export function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = performRefresh();

    refreshPromise.finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("refreshTokenExpiryTime");
}
