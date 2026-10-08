import type { Order } from "./types";

export const formatDate = (dateTime: string) => {
  return new Date(dateTime).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status: Order["orderStatus"]) => {
  switch (status) {
    case "Pending":
      return "warning";

    case "Confirmed":
      return "info";

    case "Preparing":
      return "primary";

    case "PreparedToServe":
      return "secondary";

    case "Served":
      return "success";

    case "Paid":
      return "neutral";
  }
};
