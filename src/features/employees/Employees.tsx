import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { getEmployees } from "../../api/employees.api.ts";
import type { AppDispatch } from "../../app/store/store.ts";
import {
  setEmployeesData,
  setEmployeesLoaded,
} from "../../app/store/employees.ts";

const fetchEmployees = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await getEmployees({
        Page: 1,
        Per_Page: 10,
      });

      dispatch(setEmployeesData(data));
      dispatch(setEmployeesLoaded(true));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function EmployeesPage() {
  const dispatch = useAppDispatch();
  const { data: employees, loaded } = useAppSelector(
    (state) => state.employees,
  );

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchEmployees());
    }
  }, [loaded, dispatch]);

  return <div>{loaded ? JSON.stringify(employees) : "Loading..."}</div>;
}
