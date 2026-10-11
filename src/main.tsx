import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { theme } from "./theme/theme.ts";
import { ThemeProvider } from "@emotion/react";
import Notifier from "./components/Notifier.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Notifier />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
