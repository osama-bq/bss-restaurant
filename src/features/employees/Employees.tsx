import { useGetEmployeesQuery } from "../../api/employees.api";

export default function EmployeesPage() {
  const { data, isLoading, error } = useGetEmployeesQuery({
    Page: 1,
    Per_Page: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load employees.</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
