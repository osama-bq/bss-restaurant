import { useEffect } from "react";
import { clearSession, refreshAccessToken } from "./authRefresh";

const REFRESH_BEFORE_EXPIRY_MS = 60_000; // 1 minute

type JwtPayload = {
  exp?: number;
};

/**
 * Decode the payload of a JWT.
 *
 * This is NOT verifying the token.
 * The backend is responsible for verifying the JWT signature.
 *
 * We only use exp to decide when to attempt a refresh.
 */
function getTokenExpiry(token: string): number | null {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const base64Url = parts[1];

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const json = atob(base64);

    const payload = JSON.parse(json) as JwtPayload;

    if (typeof payload.exp !== "number") {
      return null;
    }

    return payload.exp * 1000;
  } catch {
    return null;
  }
}

export default function AuthSessionManager() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const clearRefreshTimer = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const scheduleRefresh = () => {
      if (cancelled) {
        return;
      }

      clearRefreshTimer();

      const token = localStorage.getItem("token");

      /*
       * No access token means there is nothing to refresh.
       */
      if (!token) {
        return;
      }

      const expiresAt = getTokenExpiry(token);

      /*
       * If we can't determine the expiry,
       * don't create a timer.
       *
       * The RTK Query 401 mechanism remains the fallback.
       */
      if (!expiresAt) {
        return;
      }

      const now = Date.now();

      /*
       * Refresh one minute before expiry.
       */
      const refreshIn = expiresAt - now - REFRESH_BEFORE_EXPIRY_MS;

      /*
       * If the token is already expired or will expire
       * within the safety window, refresh immediately.
       */
      const delay = Math.max(refreshIn, 0);

      timer = setTimeout(async () => {
        if (cancelled) {
          return;
        }

        const success = await refreshAccessToken();

        if (!success) {
          clearSession();
          return;
        }

        /*
         * The refresh operation stored the new token.
         * Schedule based on the new token's expiry.
         */
        scheduleRefresh();
      }, delay);

      console.log(`Scheduled token refresh in ${delay} ms`);
    };

    /*
     * Run once when AuthSessionManager mounts.
     */
    scheduleRefresh();

    /*
     * Browser timers can be throttled while a tab is
     * in the background.
     *
     * When the user comes back to the tab, check the token
     * again and schedule/refresh as necessary.
     */
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleRefresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;

      clearRefreshTimer();

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
