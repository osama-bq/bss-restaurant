import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLoaderData } from "react-router-dom";
import { Box, Container } from "@mui/material";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";
import { COLLAPSED_WIDTH, DRAWER_WIDTH } from "./navConfig";

export default function DashboardLayout() {
  const profile = useLoaderData() as { image?: string };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const currentWidth = isMobile
    ? 0
    : drawerOpen
      ? DRAWER_WIDTH
      : COLLAPSED_WIDTH;

  return (
    <>
      <DashboardHeader
        onDrawerToggle={() => setDrawerOpen(!drawerOpen)}
        drawerOpen={drawerOpen}
        avatarUrl={profile?.image}
        isMobile={isMobile}
      />

      <DashboardSidebar open={drawerOpen} />

      <Box
        component="main"
        sx={{
          ml: `${currentWidth}px`,
          pt: 8,
          pb: isMobile ? "80px" : 0,
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
