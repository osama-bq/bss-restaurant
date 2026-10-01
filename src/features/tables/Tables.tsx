import { Pagination, Stack } from "@mui/material";
import { useState } from "react";
import { useGetTablesQuery } from "../../api/tables.api";
import TableBoard from "./components/TableBoard";
import TableToolbar from "./components/TableToolbar";

const PER_PAGE = 8;

export default function TablesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: response,
    isLoading,
    error,
  } = useGetTablesQuery({
    Page: page,
    Per_Page: PER_PAGE,
    Search: search,
  });

  const tables = response?.data ?? [];
  const lastPage = response?.last_page ?? 1;

  return (
    <Stack spacing={3}>
      <TableToolbar
        total={response?.total ?? 0}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={() => {
          // Add table will be implemented later.
        }}
      />

      <TableBoard
        tables={tables}
        isLoading={isLoading}
        error={error}
        onEdit={(table) => {
          // Edit will be implemented later.
          console.log("Edit", table.id);
        }}
        onDelete={(table) => {
          // Delete will be implemented later.
          console.log("Delete", table.id);
        }}
        onAssignEmployee={(table) => {
          // Assignment UI will be implemented later.
          console.log("Assign employee", table.id);
        }}
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
