import { Add, PersonOutlined } from "@mui/icons-material";
import { Avatar, AvatarGroup, Button, Stack, Typography } from "@mui/material";
import type { EmployeeTable } from "../types";
import { BASE_URL } from "../../../api/baseApi";
import { useGetEmployeesQuery } from "../../../api/employees.api";

const ALL = 100000; // A large number to fetch all employees

type Props = {
  employees: EmployeeTable[];
  onAssign: () => void;
};

export default function TableStaff({ employees, onAssign }: Props) {
  const { data: response } = useGetEmployeesQuery({
    Page: 1,
    Per_Page: ALL,
  });

  const allEmployees = response?.data ?? [];

  return (
    <Stack spacing={1}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="overline">Assigned staff</Typography>

        <Button size="small" startIcon={<Add />} onClick={onAssign}>
          Assign
        </Button>
      </Stack>

      {employees.length === 0 ? (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Avatar sx={{ width: 32, height: 32 }}>
            <PersonOutlined fontSize="small" />
          </Avatar>

          <Typography variant="body2" color="text.secondary">
            No staff assigned
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <AvatarGroup max={3} total={employees.length}>
            {employees.map((employee) => {
              const employeeData = allEmployees?.find(
                (e) => e.id === employee.employeeId,
              );
              return (
                <Avatar
                  key={employee.employeeId}
                  src={
                    employeeData?.user.image
                      ? `${BASE_URL}/images/user/${employeeData?.user.image}`
                      : ""
                  }
                  alt={employeeData?.user.fullName}
                >
                  {employeeData?.user.fullName.charAt(0)}
                </Avatar>
              );
            })}
          </AvatarGroup>

          <Typography variant="body2">
            {employees.length === 1
              ? employees[0].name
              : `${employees.length} staff assigned`}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
