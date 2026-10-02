import { useState } from "react";
import { Stack } from "@mui/material";
import { useGetTablesQuery } from "../../api/tables.api";
import type { Table } from "../tables/types";
import TableSelector from "./components/TableSelector";
import EmptyTableState from "./components/EmptyTableState";
import FoodMenu from "./components/FoodMenu";

const TABLES_PER_PAGE = 50; // fetch all

export default function NewOrderPage() {
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const {
    data: tablesResponse,
    isLoading: tablesLoading,
    error: tablesError,
  } = useGetTablesQuery({
    Page: 1,
    Per_Page: TABLES_PER_PAGE,
  });

  const tables = tablesResponse?.data ?? [];

  const selectedTable = tables.find((table) => table.id === selectedTableId);

  const handleSelectTable = (table: Table) => {
    setSelectedTableId(table.id);
  };

  return (
    <>
      <Stack spacing={2.5}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2.5}
          sx={{
            alignItems: "stretch",
          }}
        >
          <Stack
            sx={{
              width: {
                xs: "100%",
                md: 300,
              },
              flexShrink: 0,
            }}
          >
            <TableSelector
              tables={tables}
              selectedTableId={selectedTableId}
              isLoading={tablesLoading}
              error={tablesError}
              onSelect={handleSelectTable}
            />
          </Stack>

          <Stack
            sx={{
              minWidth: 0,
              flexGrow: 1,
            }}
          >
            {selectedTableId ? (
              <FoodMenu table={selectedTable} />
            ) : (
              <EmptyTableState />
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
