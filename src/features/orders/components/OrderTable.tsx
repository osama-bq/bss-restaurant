import {
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { Order } from "../types";
import OrderTableRow from "./OrderTableRow";
import LoadingOverlay from "../../../components/LodingOverlay";

type Props = {
  orders: Order[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

const headCellSx = {
  bgcolor: "background.default",
  fontWeight: 700,
  color: "text.primary",
  borderBottom: "none",
  py: 1.5,
  px: 2,
};

export default function OrderTable({
  orders,
  total,
  page,
  perPage,
  lastPage,
  isLoading,
  isFetching,
  error,
  onPageChange,
  onPerPageChange,
}: Props) {
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;

  const to = Math.min(page * perPage, total);

  const renderBody = () => {
    if (isLoading) {
      return (
        <TableBody>
          {Array.from({
            length: perPage,
          }).map((_, row) => (
            <TableRow key={row}>
              <TableCell>
                <Skeleton variant="circular" width={32} height={32} />
              </TableCell>

              {Array.from({
                length: 7,
              }).map((_, cell) => (
                <TableCell key={cell}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      );
    }

    if (error || orders.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={8}
              sx={{
                p: 5,
                textAlign: "center",
              }}
            >
              <Typography color={error ? "error" : "text.secondary"}>
                {error ? "Failed to load orders." : "No orders found."}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {orders.map((order) => (
          <OrderTableRow key={order.id} order={order} />
        ))}
      </TableBody>
    );
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 0.8,
        overflow: "hidden",
      }}
    >
      <LoadingOverlay isFetching={isFetching}>
        <TableContainer
          sx={{
            overflowX: "auto",
          }}
        >
          <Table
            sx={{
              minWidth: 900,

              "& td": {
                borderBottom: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    ...headCellSx,
                    width: 52,
                  }}
                />

                <TableCell sx={headCellSx}>Order</TableCell>

                <TableCell sx={headCellSx}>Date</TableCell>

                <TableCell sx={headCellSx}>Table</TableCell>

                <TableCell sx={headCellSx}>Items</TableCell>

                <TableCell sx={headCellSx}>Status</TableCell>

                <TableCell align="right" sx={headCellSx}>
                  Amount
                </TableCell>

                <TableCell align="right" sx={headCellSx}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {renderBody()}
          </Table>
        </TableContainer>
      </LoadingOverlay>

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{
          px: 3,
          py: 2,
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
          }}
        >
          <Select
            size="small"
            value={perPage}
            onChange={(event) => onPerPageChange(Number(event.target.value))}
            sx={{
              minWidth: 84,
            }}
          >
            {[5, 10, 25, 50].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body2" color="text.secondary">
            entries per page
          </Typography>
        </Stack>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {from} to {to} of {total} orders
          </Typography>

          {lastPage > 1 && (
            <Pagination
              page={page}
              count={lastPage}
              onChange={(_, value) => onPageChange(value)}
              showFirstButton
              showLastButton
              shape="rounded"
              variant="outlined"
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    borderColor: "divider",
                    color: "primary.main",
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      borderColor: "primary.main",
                      "&:hover": { bgcolor: "primary.dark" },
                    },
                    "&.Mui-disabled": { bgcolor: "action.disabledBackground" },
                  }}
                />
              )}
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
