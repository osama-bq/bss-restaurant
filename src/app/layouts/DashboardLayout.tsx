import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useLocation, Link, NavLink } from "react-router-dom";
import { useState } from "react";

import logo from "../../assets/logo.png";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const drawerWidth = 240;
const collapsedWidth = 57;

function getTitleFromPathname(pathname: string): string {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/employees":
      return "Employees";
    case "/foods":
      return "Foods";
    default:
      return "Dashboard";
  }
}

const MiniSidebar = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,

  "& .MuiDrawer-paper": {
    top: 0,
    width: drawerWidth,
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

export default function DashboardLayout() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleDrawerOpen() {
    setDrawerOpen(true);
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <AppBar
        sx={{
          width: `calc(100% - ${drawerOpen ? drawerWidth : collapsedWidth}px)`,
          ml: `${drawerOpen ? drawerWidth : collapsedWidth}px`,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            {getTitleFromPathname(location.pathname)}
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar
                  alt="Profile Avatar"
                  src="https://cdn.vectorstock.com/i/1000v/01/38/young-man-profile-vector-14770138.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <MiniSidebar
        variant="permanent"
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        open={drawerOpen}
      >
        <Toolbar
          disableGutters
          sx={{
            px: 2,
            justifyContent: drawerOpen ? "flex-start" : "center",
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
              sx={{
                width: 48,
                height: 48,
                objectFit: "contain",
              }}
            />

            {drawerOpen && (
              <Typography sx={{ ml: 1, whiteSpace: "nowrap" }}>
                BSS Restaurant
              </Typography>
            )}
          </Box>
        </Toolbar>

        <List
          sx={{
            p: 0,
            m: 0,
            whiteSpace: "nowrap",
          }}
        >
          {/* Dashboard */}
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/"
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
                <DashboardIcon />
              </ListItemIcon>

              {drawerOpen && <Typography sx={{ ml: 1 }}>Dashboard</Typography>}
            </ListItemButton>
          </ListItem>

          {/* Employees */}
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/employees"
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
                <PeopleIcon />
              </ListItemIcon>

              {drawerOpen && <Typography sx={{ ml: 1 }}>Employees</Typography>}
            </ListItemButton>
          </ListItem>

          {/* Tables */}
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/tables"
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
                <TableRestaurantIcon />
              </ListItemIcon>

              {drawerOpen && <Typography sx={{ ml: 1 }}>Tables</Typography>}
            </ListItemButton>
          </ListItem>

          {/* Foods */}
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/foods"
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
                <RestaurantMenuIcon />
              </ListItemIcon>

              {drawerOpen && <Typography sx={{ ml: 1 }}>Foods</Typography>}
            </ListItemButton>
          </ListItem>

          {/* New Order */}
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/orders/new"
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
                <AddShoppingCartIcon />
              </ListItemIcon>

              {drawerOpen && <Typography sx={{ ml: 1 }}>New Order</Typography>}
            </ListItemButton>
          </ListItem>

          {/* Orders */}
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/orders"
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
                <ReceiptLongIcon />
              </ListItemIcon>

              {drawerOpen && <Typography sx={{ ml: 1 }}>Orders</Typography>}
            </ListItemButton>
          </ListItem>
        </List>
      </MiniSidebar>

      <Box
        component="main"
        sx={{
          ml: `${drawerOpen ? drawerWidth : collapsedWidth}px`,
          pt: 8,
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
