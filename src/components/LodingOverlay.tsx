import { Box, CircularProgress } from "@mui/material";

export default function LoadingOverlay({
  isFetching,
  children,
}: {
  isFetching: boolean;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          filter: isFetching ? "blur(2px)" : "none",
          opacity: isFetching ? 0.6 : 1,
          transition: "all 0.2s",
        }}
      >
        {children}
      </Box>

      {isFetching && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </Box>
  );
}
