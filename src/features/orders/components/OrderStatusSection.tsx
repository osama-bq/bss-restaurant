import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetOrdersQuery } from "../../../api/orders.api";
import OrderCard from "./OrderCard";
import type { OrderStatus } from "../types";

const PER_PAGE = 5;

type Props = {
  status: 0 | 1 | 2 | 3 | 4 | 5;
  label: OrderStatus;
  search: string;
  defaultExpanded: boolean;
};

const statusColor = {
  Pending: "warning",
  Confirmed: "info",
  Preparing: "primary",
  "Prepared to Serve": "secondary",
  Served: "success",
  Paid: "default",
} as const;

export default function OrderStatusSection({
  status,
  label,
  search,
  defaultExpanded,
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    error,
  } = useGetOrdersQuery(
    {
      Page: page,
      Per_Page: PER_PAGE,
      Search: search,
      Status: status,
    },
    {
      skip: !expanded,
    },
  );

  const orders = response?.data ?? [];
  const lastPage = response?.last_page ?? 1;
  const total = response?.total ?? 0;

  function handleExpanded(_: React.SyntheticEvent, value: boolean) {
    setExpanded(value);

    if (value) {
      setPage(1);
    }
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={handleExpanded}
      disableGutters
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        "&::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>{label}</Typography>

          {total > 0 && !isLoading && (
            <Chip
              size="small"
              label={total}
              color={statusColor[label]}
              variant="outlined"
            />
          )}
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 0 }}>
        {isLoading ? (
          <Stack spacing={1.5}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" height={100} />
            ))}
          </Stack>
        ) : error ? (
          <Typography color="error" sx={{ py: 2 }}>
            Failed to load {label.toLowerCase()} orders.
          </Typography>
        ) : orders.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{ py: 3, textAlign: "center" }}
          >
            No {label.toLowerCase()} orders found.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}

            {lastPage > 1 && (
              <Stack
                sx={{
                  alignItems: "center",
                  pt: 1,
                }}
              >
                <Pagination
                  page={page}
                  count={lastPage}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                />
              </Stack>
            )}
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
