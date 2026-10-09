import {
  Box,
  Button,
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
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Add, UnfoldMore } from "@mui/icons-material";
import { useMemo, useState } from "react";
import type { Food } from "../types";
import FoodTableRow from "./FoodTableRow";
import LoadingOverlay from "../../../components/LodingOverlay";
import ErrorState from "../../../components/ErrorState";
import EmptyState from "../../../components/EmptyState";

type SortKey = "name" | "price" | "discountPrice" | "discount";

type Order = "asc" | "desc";

const COLUMNS: {
  key: SortKey;
  label: string;
}[] = [
  { key: "name", label: "Food" },
  { key: "price", label: "Price" },
  { key: "discount", label: "Discount" },
  { key: "discountPrice", label: "Discounted Price" },
];

const sortValue = (food: Food, key: SortKey): string | number => {
  switch (key) {
    case "name":
      return food.name.toLowerCase();

    case "price":
      return food.price;

    case "discountPrice":
      return food.discountPrice;

    case "discount":
      return food.discount; // needs refactoring to handle the comparison of discount types (Percentage, Flat, None) correctly. For now, it just returns the discount value.
  }
};

type Props = {
  foods: Food[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  search: string;
  onSearchChange: (search: string) => void;
  onAdd: () => void;
  onEdit: (food: Food) => void;
  onDelete: (food: Food) => void;
  onRetry: () => void;
};

export default function FoodTable({
  foods,
  total,
  page,
  perPage,
  lastPage,
  isLoading,
  isFetching,
  error,
  onPageChange,
  onPerPageChange,
  search,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
  onRetry,
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);

  const [order, setOrder] = useState<Order>("asc");

  const visible = useMemo(() => {
    if (!sortKey) return foods;

    return [...foods].sort((x, y) => {
      const a = sortValue(x, sortKey);
      const b = sortValue(y, sortKey);

      const result = a < b ? -1 : a > b ? 1 : 0;

      return order === "asc" ? result : -result;
    });
  }, [foods, sortKey, order]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setOrder("asc");
    }
  };

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;

  const to = Math.min(page * perPage, total);

  const headCellSx = {
    bgcolor: "background.default",
    fontWeight: 700,
    color: "text.primary",
    borderBottom: "none",
    py: 1.5,
    px: 2,
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <TableBody>
          {Array.from({
            length: perPage,
          }).map((_, row) => (
            <TableRow key={row}>
              {Array.from({
                length: 5,
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

    if (error || visible.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                p: 4,
                textAlign: "center",
              }}
            >
              {error ? (
                <ErrorState
                  title="Error"
                  description="Failed to load foods!"
                  onRetry={onRetry}
                />
              ) : (
                <EmptyState />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {visible.map((food) => (
          <FoodTableRow
            key={food.id}
            food={food}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    );
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        sx={{
          px: 3,
          py: 2,
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Foods
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage your restaurant menu
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<Add />} onClick={onAdd}>
          Add Food
        </Button>
      </Stack>

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{
          px: 3,
          py: 2.5,
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
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
            {[5, 10, 25, 50].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body2" color="text.secondary">
            entries per page
          </Typography>
        </Stack>

        <TextField
          size="small"
          placeholder="Search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          sx={{
            width: {
              xs: "100%",
              sm: 260,
            },
          }}
        />
      </Stack>

      <LoadingOverlay isFetching={isFetching}>
        <TableContainer>
          <Table
            sx={{
              "& td": {
                borderBottom: "1px solid",
                borderColor: "divider",
              },
            }}
          >
            <TableHead>
              <TableRow>
                {COLUMNS.map((column) => (
                  <TableCell
                    key={column.key}
                    sx={headCellSx}
                    sortDirection={sortKey === column.key ? order : false}
                  >
                    <TableSortLabel
                      active={sortKey === column.key}
                      direction={sortKey === column.key ? order : "asc"}
                      onClick={() => handleSort(column.key)}
                      IconComponent={
                        sortKey === column.key ? undefined : UnfoldMore
                      }
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}

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
        <Typography variant="body2" color="text.secondary">
          Showing {from} to {to} of {total} entries
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
                  },
                }}
              />
            )}
          />
        )}
      </Stack>
    </Paper>
  );
}
