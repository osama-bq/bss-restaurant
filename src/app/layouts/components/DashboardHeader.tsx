import { useState, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  COLLAPSED_WIDTH,
  DRAWER_WIDTH,
  getTitleFromPathname,
} from "../navConfig";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  drawerOpen: boolean;
  avatarUrl?: string;
  onDrawerToggle: () => void;
};

export default function DashboardHeader({
  drawerOpen,
  onDrawerToggle,
  avatarUrl,
}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleMenuOpen(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function performLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpiryTime");
    navigate("/login");
  }

  const currentWidth = drawerOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH;

  return (
    <AppBar
      sx={{
        width: `calc(100% - ${currentWidth}px)`,
        ml: `${currentWidth}px`,
        transition: (theme) =>
          theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <Toolbar>
        {/* hamburger icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div">
          {getTitleFromPathname(location.pathname)}
        </Typography>

        <Box sx={{ ml: "auto" }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar alt="Profile Avatar" src={avatarUrl} />
            </IconButton>
          </Tooltip>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>

            <MenuItem onClick={performLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
