import { configureStore } from "@reduxjs/toolkit";

import employeesSliceReducer from "./employees";
import dashboardSliceReducer from "./dashboard";

export const store = configureStore(
    {
        reducer: {
            dashboard: dashboardSliceReducer,
            employees: employeesSliceReducer,
        },
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;