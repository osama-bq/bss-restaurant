import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Box, Container } from "@mui/material";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";
import { COLLAPSED_WIDTH, DRAWER_WIDTH } from "./navConfig";

export default function DashboardLayout() {
  const profile = useLoaderData() as { image?: string };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentWidth = drawerOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH;

  return (
    <>
      <DashboardHeader
        onDrawerToggle={() => setDrawerOpen(!drawerOpen)}
        drawerOpen={drawerOpen}
        avatarUrl={profile?.image}
      />

      <DashboardSidebar open={drawerOpen} />

      <Box
        component="main"
        sx={{
          ml: `${currentWidth}px`,
          pt: 8,
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
