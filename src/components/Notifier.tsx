import { Alert, Snackbar } from "@mui/material";
import type { SnackbarCloseReason } from "@mui/material";
import type { SyntheticEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Severity = "success" | "error" | "info" | "warning";

type Message = { key: number; severity: Severity; text: string };

let push: ((message: Omit<Message, "key">) => void) | null = null;

const send = (severity: Severity) => (text: string) => {
  if (!push) {
    console.warn("notify() was called but <Notifier /> is not mounted.");
    return;
  }
  push({ severity, text });
};

export const notify = {
  success: send("success"),
  error: send("error"),
  info: send("info"),
  warning: send("warning"),
};

/* Pulls a readable message out of an RTK Query / API error. */
export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) {
  if (typeof error !== "object" || error === null) return fallback;

  const { data, status } = error as { data?: unknown; status?: unknown };

  if (typeof data === "string" && data.trim()) return data;

  if (typeof data === "object" && data !== null) {
    const record = data as Record<string, unknown>;

    for (const key of ["message", "detail", "title", "error"]) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) return value;
    }
  }

  if (status === "FETCH_ERROR") {
    return "Can't reach the server. Check your connection.";
  }

  return fallback;
}

export default function Notifier() {
  const [message, setMessage] = useState<Message | null>(null);
  const [open, setOpen] = useState(false);

  const queue = useRef<Message[]>([]);
  const busy = useRef(false);
  const counter = useRef(0);

  // Show the next queued message, or go idle when the queue is empty.
  const showNext = useCallback(() => {
    const next = queue.current.shift();

    if (next) {
      setMessage(next);
      setOpen(true);
    } else {
      busy.current = false;
    }
  }, []);

  useEffect(() => {
    push = (incoming) => {
      queue.current.push({ ...incoming, key: ++counter.current });

      if (!busy.current) {
        busy.current = true;
        showNext();
      }
    };

    return () => {
      push = null;
    };
  }, [showNext]);

  const handleClose = (
    _: Event | SyntheticEvent,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      key={message?.key}
      open={open}
      // Errors stay a little longer so they can be read.
      autoHideDuration={message?.severity === "error" ? 4000 : 2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      slotProps={{ transition: { onExited: showNext } }}
    >
      <Alert
        severity={message?.severity ?? "info"}
        variant="outlined"
        onClose={handleClose}
        sx={{
          alignItems: "center",
          minWidth: 300,
          maxWidth: 420,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: 4,
        }}
      >
        {message?.text}
      </Alert>
    </Snackbar>
  );
}
