import { useEffect, useState } from "react";
import { useGetEmployeesQuery } from "../../api/employees.api";
import EmployeeTable from "./components/EmployeeTable";

const SEARCH_DEBOUNCE_MS = 400;

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Wait until the user stops typing before hitting the API.
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
  } = useGetEmployeesQuery({
    Page: page,
    Per_Page: perPage,
    // Rename to whatever your API expects (e.g. "Search", "Keyword", "Q").
    Search: debouncedSearch || undefined,
  });

  return (
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
    />
  );
}
