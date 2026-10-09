import { Box, Card, Skeleton, Typography } from "@mui/material";
import type { Table } from "../types";
import RestaurantTableCard from "./RestaurantTableCard";
import LoadingOverlay from "../../../components/LodingOverlay";
import ErrorState from "../../../components/ErrorState";
import EmptyState from "../../../components/EmptyState";

type Props = {
  tables: Table[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  onEdit: (table: Table) => void;
  onDelete: (table: Table) => void;
  onRetry: () => void;
};

export default function TableBoard({
  tables,
  isLoading,
  isFetching,
  error,
  onEdit,
  onDelete,
  onRetry,
}: Props) {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} variant="outlined">
            <Skeleton variant="rectangular" height={140} />
            <Box sx={{ p: 2 }}>
              <Skeleton width="60%" />
              <Skeleton width="40%" />
              <Skeleton sx={{ mt: 2 }} />
            </Box>
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Error"
        description="Failed to load tables."
        onRetry={onRetry}
      />
    );
  }

  if (tables.length === 0) {
    return <EmptyState />;
  }

  return (
    <LoadingOverlay isFetching={isFetching}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {tables.map((table) => (
          <RestaurantTableCard
            key={table.id}
            table={table}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Box>
    </LoadingOverlay>
  );
}
