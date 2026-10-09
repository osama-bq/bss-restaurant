import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import logo from "../../../assets/logo.png";
import { DRAWER_WIDTH, NAV_ITEMS } from "../navConfig";

const MiniSidebar = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    top: 0,
    width: DRAWER_WIDTH,
    boxSizing: "border-box",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  variants: [
    {
      props: ({ open }) => !open,
      style: {
        width: `calc(${theme.spacing(7)} + 1px)`,
        "& .MuiDrawer-paper": {
          width: `calc(${theme.spacing(7)} + 1px)`,
        },
      },
    },
  ],
}));

type Props = {
  open: boolean;
};

export default function DashboardSidebar({ open }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.drawer,
        }}
      >
        <BottomNavigation showLabels sx={{ height: 64 }}>
          {NAV_ITEMS.map(({ title, path, icon: Icon }) => (
            <BottomNavigationAction
              key={path}
              component={NavLink}
              to={path}
              label={title}
              icon={<Icon />}
              sx={{
                minWidth: 0,
                "&.active": {
                  color: "primary.main",
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    );
  }

  return (
    <MiniSidebar variant="permanent" open={open}>
      <Toolbar
        disableGutters
        sx={{
          px: 2,
          justifyContent: open ? "flex-start" : "center",
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="BSS Restaurant"
            sx={{ width: 48, height: 48, objectFit: "contain" }}
          />
          {open && (
            <Typography sx={{ ml: 1, whiteSpace: "nowrap", fontWeight: 600 }}>
              BSS Restaurant
            </Typography>
          )}
        </Box>
      </Toolbar>

      <List sx={{ p: 0, m: 0, whiteSpace: "nowrap" }}>
        {NAV_ITEMS.map(({ title, path, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              component={NavLink}
              to={path}
              end
              sx={{
                px: 2,
                py: 1,
                "&.active": {
                  backgroundColor: "action.selected",
                  color: "primary.main",
                },
                "&.active .MuiListItemIcon-root": {
                  color: "primary.main",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 24,
                  width: 24,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Icon />
              </ListItemIcon>

              {open && <Typography sx={{ ml: 1 }}>{title}</Typography>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MiniSidebar>
  );
}
