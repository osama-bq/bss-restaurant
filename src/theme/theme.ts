import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    neutral: {
      main: "#616161",
    },
    background: {
      default: "#f4f7fa", // https://html.phoenixcoded.net/light-able/bootstrap/default/dashboard/index.html
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});
