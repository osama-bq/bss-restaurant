import { Pagination, Stack } from "@mui/material";
import { useState } from "react";
import {
  useGetTablesQuery,
  useDeleteTableMutation,
} from "../../api/tables.api";
import TableBoard from "./components/TableBoard";
import TableToolbar from "./components/TableToolbar";
import type { Table } from "./types";
import TableFormDialog from "./components/TableFormDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const PER_PAGE = 8;

export default function TablesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const [deleteTable, deleteState] = useDeleteTableMutation();

  const [deleteTarget, setDeleteTarget] = useState<Table | null>(null);

  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useGetTablesQuery({
    Page: page,
    Per_Page: PER_PAGE,
    Search: search,
  });

  const handleAdd = () => {
    setSelectedTable(null);
    setFormMode("create");
    setFormOpen(true);
  };

  const handleEdit = (table: Table) => {
    setSelectedTable(table);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleDelete = (table: Table) => {
    setDeleteTarget(table);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteTable(deleteTarget.id.toString()).unwrap();
      setDeleteTarget(null);
    } catch {
      // Keep confirmation dialog open on failure.
    }
  };

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
        onAdd={handleAdd}
      />

      <TableBoard
        tables={tables}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TableFormDialog
        open={formOpen}
        mode={formMode}
        table={selectedTable}
        onClose={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete table?"
        description={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.tableNumber}? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Table"
        loading={deleteState.isLoading}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />

      {!isLoading && !error && lastPage > 1 && (
        <Stack sx={{ alignItems: "center" }}>
          <Pagination
            page={page}
            count={lastPage}
            shape="rounded"
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </Stack>
  );
}
