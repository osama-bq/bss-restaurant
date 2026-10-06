import { useEffect, useState } from "react";
import { useDeleteFoodMutation, useGetFoodsQuery } from "../../api/foods.api";
import ConfirmDialog from "../../components/ConfirmDialog";
import FoodFormDialog from "./components/FoodFormDialog";
import FoodTable from "./components/FoodTable";
import type { Food } from "./types";

const SEARCH_DEBOUNCE_MS = 400;

export default function FoodsPage() {
  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(10);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);

  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Food | null>(null);

  const [deleteFood, deleteState] = useDeleteFoodMutation();

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
  } = useGetFoodsQuery({
    Page: page,
    Per_Page: perPage,
    Search: debouncedSearch || undefined,
  });

  const handleAdd = () => {
    setSelectedFood(null);
    setFormMode("create");
    setFormOpen(true);
  };

  const handleEdit = (food: Food) => {
    setSelectedFood(food);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleDelete = (food: Food) => {
    setDeleteTarget(food);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteFood(deleteTarget.id).unwrap();

      setDeleteTarget(null);
    } catch {
      // Keep dialog open on failure.
    }
  };

  return (
    <>
      <FoodTable
        foods={response?.data ?? []}
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
      />

      <FoodFormDialog
        open={formOpen}
        mode={formMode}
        food={selectedFood}
        onClose={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete food?"
        description={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.name}? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Food"
        loading={deleteState.isLoading}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
