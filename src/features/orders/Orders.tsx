import { Stack } from "@mui/material";
import { useState } from "react";
import OrderStatusSection from "./components/OrderStatusSection";
import OrderToolbar from "./components/OrderToolbar";
import type { OrderStatus } from "./types";

const statuses: {
  value: 0 | 1 | 2 | 3 | 4 | 5;
  label: OrderStatus;
  defaultExpanded: boolean;
}[] = [
  { value: 0, label: "Pending", defaultExpanded: true },
  { value: 1, label: "Confirmed", defaultExpanded: true },
  { value: 2, label: "Preparing", defaultExpanded: true },
  { value: 3, label: "PreparedToServe", defaultExpanded: true },
  { value: 4, label: "Served", defaultExpanded: false },
  { value: 5, label: "Paid", defaultExpanded: false },
];

export default function Orders() {
  const [search, setSearch] = useState("");

  return (
    <Stack spacing={3}>
      <OrderToolbar search={search} onSearchChange={setSearch} />

      <Stack spacing={2}>
        {statuses.map((status) => (
          <OrderStatusSection
            key={status.value}
            status={status.value}
            label={status.label}
            search={search}
            defaultExpanded={status.defaultExpanded}
            onAdvanceStatus={() => {}}
            onChangeStatus={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </Stack>
    </Stack>
  );
}
