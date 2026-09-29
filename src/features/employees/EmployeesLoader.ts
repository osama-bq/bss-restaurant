import { store } from "../../app/store.ts";
import { getEmployees } from "../../api/employees.api.ts";
import { setEmployeesData, setEmployeesLoaded } from "../../app/store/employees";

export async function employeesLoader() {
  const state = store.getState();

  if (state.employees.loaded) {
    return state.employees.data;
  }

  const data = await getEmployees({
    Page: 1,
    Per_Page: 10,
  });

  store.dispatch(setEmployeesData(data));
  store.dispatch(setEmployeesLoaded(true));

  return state.employees.data;
}