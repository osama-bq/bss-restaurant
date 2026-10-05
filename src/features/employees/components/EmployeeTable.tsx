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
import type { Employee } from "../type";
import EmployeeTableRow from "./EmployeeTableRow";
import LoadingOverlay from "../../../components/LodingOverlay";

type SortKey =
  | "name"
  | "designation"
  | "email"
  | "phone"
  | "joinDate"
  | "amountSold";
type Order = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "name", label: "Employee" },
  { key: "designation", label: "Designation" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "joinDate", label: "Joined" },
  { key: "amountSold", label: "Sales", align: "right" },
];

const sortValue = (e: Employee, key: SortKey): string | number => {
  switch (key) {
    case "name":
      return e.user.fullName.toLowerCase();
    case "designation":
      return (e.designation ?? "").toLowerCase();
    case "email":
      return (e.user.email ?? "").toLowerCase();
    case "phone":
      return e.user.phoneNumber ?? "";
    case "joinDate":
      return new Date(e.joinDate).getTime();
    case "amountSold":
      return e.amountSold;
  }
};

type Props = {
  employees: Employee[];
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
};

export default function EmployeeTable({
  employees,
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
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [order, setOrder] = useState<Order>("asc");

  const visible = useMemo(() => {
    if (!sortKey) return employees;
    return [...employees].sort((x, y) => {
      const a = sortValue(x, sortKey);
      const b = sortValue(y, sortKey);
      const result = a < b ? -1 : a > b ? 1 : 0;
      return order === "asc" ? result : -result;
    });
  }, [employees, sortKey, order]);

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
          {Array.from({ length: perPage }).map((_, r) => (
            <TableRow key={r}>
              {Array.from({ length: 7 }).map((_, c) => (
                <TableCell key={c}>
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
            <TableCell colSpan={7} sx={{ p: 4, textAlign: "center" }}>
              <Typography color={error ? "error" : "text.secondary"}>
                {error ? "Failed to load employees." : "No employees found."}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {visible.map((employee) => (
          <EmployeeTableRow key={employee.id} employee={employee} />
        ))}
      </TableBody>
    );
  };

  return (
    <Paper
      variant="outlined"
      sx={{ borderColor: "divider", borderRadius: 2, overflow: "hidden" }}
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
            Employees
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your restaurant employees
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
          onClick={() => {
            // Add employee modal will go here later.
          }}
        >
          Add Employee
        </Button>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          px: 3,
          py: 2.5,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Select
            size="small"
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            sx={{
              minWidth: 84,
              "& fieldset": { borderColor: "divider" },
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
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            width: { xs: "100%", sm: 260 },
            "& fieldset": { borderColor: "divider" },
          }}
        />
      </Stack>

      {/* Table */}
      <LoadingOverlay isFetching={isFetching}>
        <TableContainer>
          <Table
            sx={{
              "& td": { borderBottom: "1px solid", borderColor: "divider" },
            }}
          >
            <TableHead>
              <TableRow>
                {COLUMNS.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.align}
                    sx={headCellSx}
                    sortDirection={sortKey === col.key ? order : false}
                  >
                    <TableSortLabel
                      active={sortKey === col.key}
                      direction={sortKey === col.key ? order : "asc"}
                      onClick={() => handleSort(col.key)}
                      IconComponent={
                        sortKey === col.key ? undefined : UnfoldMore
                      }
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          opacity: 0.5,
                          fontSize: 18,
                        },
                      }}
                    >
                      {col.label}
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

      {/* Footer: summary + pagination */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          px: 3,
          py: 2,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
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
                    "&:hover": { bgcolor: "primary.dark" },
                  },
                  "&.Mui-disabled": { bgcolor: "action.disabledBackground" },
                }}
              />
            )}
          />
        )}
      </Stack>
    </Paper>
  );
}
