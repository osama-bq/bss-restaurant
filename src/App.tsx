import { RouterProvider } from "react-router-dom";

import { router } from "./app/router/index.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import AuthSessionManager from "./app/auth/AuthSessionManager.tsx";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AuthSessionManager />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
