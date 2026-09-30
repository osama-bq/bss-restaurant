import { Pagination, Stack } from "@mui/material";
import { useState } from "react";
import { useGetEmployeesQuery } from "../../api/employees.api";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeTableToolbar from "./components/EmployeeTableToolbar";

const PER_PAGE = 5;

export default function EmployeesPage() {
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    error,
  } = useGetEmployeesQuery({
    Page: page,
    Per_Page: PER_PAGE,
  });

  const employees = response?.data ?? [];
  const lastPage = response?.last_page ?? 1;

  return (
    <Stack spacing={3}>
      <EmployeeTableToolbar total={response?.total ?? 0} />

      <EmployeeTable
        employees={employees}
        isLoading={isLoading}
        error={error}
      />

      {!isLoading && !error && lastPage > 1 && (
        <Stack sx={{ alignItems: "center" }}>
          <Pagination
            page={page}
            count={lastPage}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </Stack>
  );
}
