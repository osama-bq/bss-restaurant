import { RouterProvider } from "react-router-dom";

import { router } from "./app/router/index.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
