import { useEffect, useState } from "react";
import { useGetEmployeesQuery } from "../../api/employees.api";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeFormDialog from "./components/EmployeeFormDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDeleteEmployeeMutation } from "../../api/employees.api";
import type { Employee } from "./type";

const SEARCH_DEBOUNCE_MS = 400;

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  const [deleteEmployee, deleteState] = useDeleteEmployeeMutation();

  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

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
    refetch,
  } = useGetEmployeesQuery({
    Page: page,
    Per_Page: perPage,
    Search: debouncedSearch || undefined,
  });

  const handleAdd = () => {
    setSelectedEmployee(null);
    setFormMode("create");
    setFormOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    setDeleteTarget(employee);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteEmployee(deleteTarget.id).unwrap();
      setDeleteTarget(null);
    } catch {
      // Keep confirmation dialog open on failure.
    }
  };

  return (
    <>
      <EmployeeTable
        employees={response?.data ?? []}
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
        search={search}
        onSearchChange={setSearch}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRetry={refetch}
      />

      <EmployeeFormDialog
        open={formOpen}
        mode={formMode}
        employee={selectedEmployee}
        onClose={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete employee?"
        description={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.user.fullName}? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Employee"
        loading={deleteState.isLoading}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
