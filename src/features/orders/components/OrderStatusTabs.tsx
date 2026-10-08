import { Paper, Tab, Tabs } from "@mui/material";

import { ORDER_STATUSES, type OrderStatusValue } from "../types";

type Props = {
  value: OrderStatusValue | "all";
  onChange: (value: OrderStatusValue | "all") => void;
};

export default function OrderStatusTabs({ value, onChange }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        borderRadius: 0.8,
        overflow: "hidden",
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          minHeight: 44,

          "& .MuiTabs-indicator": {
            display: "none",
          },

          "& .MuiTab-root": {
            minHeight: 40,
            minWidth: "auto",
            px: 2,
            py: 1,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 500,
          },
          "& .MuiTabs-list": {
            width: "fit-content",
            py: 0.3,
            borderRadius: 3,
            bgcolor: "action.hover",
          },

          "& .MuiTabs-scroller": {
            display: "flex",
            justifyContent: "center",
          },

          "& .Mui-selected": {
            color: "text.primary",
            bgcolor: "background.paper",
            boxShadow: "0 0 10px 2px rgba(100, 100, 100, 0.1)",
          },
        }}
      >
        <Tab value="all" label="All Orders" />

        {ORDER_STATUSES.map((status) => (
          <Tab key={status.value} value={status.value} label={status.label} />
        ))}
      </Tabs>
    </Paper>
  );
}
