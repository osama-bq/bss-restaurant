import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useGetOrdersQuery } from "../../api/orders.api";

import type { OrderStatusValue } from "./types";

import OrderStatusTabs from "./components/OrderStatusTabs";
import OrderToolbar from "./components/OrderToolbar";
import OrderTable from "./components/OrderTable";

const SEARCH_DEBOUNCE_MS = 400;

export default function Orders() {
  const [status, setStatus] = useState<OrderStatusValue | "all">("all");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useGetOrdersQuery({
    Page: page,
    Per_Page: perPage,
    Search: debouncedSearch || undefined,
    Status: status === "all" ? undefined : status,
  });

  return (
    <Stack spacing={2}>
      <OrderStatusTabs
        value={status}
        onChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
      />

      <OrderToolbar search={search} onSearchChange={setSearch} />

      <OrderTable
        orders={response?.data ?? []}
        total={response?.total ?? 0}
        page={page}
        perPage={perPage}
        lastPage={response?.last_page ?? 1}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onPageChange={setPage}
        onPerPageChange={(value) => {
          setPerPage(value);
          setPage(1);
        }}
      />
    </Stack>
  );
}
