import { Pagination, Stack } from "@mui/material";
import { useState } from "react";
import { useGetFoodsQuery } from "../../api/foods.api";
import FoodTable from "./components/FoodTable";
import FoodToolbar from "./components/FoodToolbar";

const PER_PAGE = 8;

export default function FoodsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: response,
    isLoading,
    error,
  } = useGetFoodsQuery({
    Page: page,
    Per_Page: PER_PAGE,
    Search: search,
  });

  const foods = response?.data ?? [];
  const lastPage = response?.last_page ?? 1;

  return (
    <Stack spacing={3}>
      <FoodToolbar
        total={response?.total ?? 0}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAdd={() => {
          // Add food later
        }}
      />

      <FoodTable
        foods={foods}
        isLoading={isLoading}
        error={error}
        onEdit={(food) => console.log("Edit", food.id)}
        onDelete={(food) => console.log("Delete", food.id)}
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
