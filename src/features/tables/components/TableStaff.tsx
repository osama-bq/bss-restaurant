import {
  Add,
  ExpandMore,
  PersonOffOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonBase,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { EmployeeTable } from "../types";
import type { Employee } from "../../employees/type";
import { BASE_URL } from "../../../api/baseApi";
import { useGetEmployeesQuery } from "../../../api/employees.api";
import AssignStaffDialog from "./AssignStaffDialog";

import {
  useCreateEmployeeTableRangeMutation,
  useDeleteEmployeeTableMutation,
  useGetEmployeeTablesQuery,
} from "../../../api/employeeTables.api";
import LoadingOverlay from "../../../components/LodingOverlay";

const ALL = 100000; // A large number to fetch all employees

type EmployeeId = Employee["id"];

type Props = {
  tableId: number;
  employees: EmployeeTable[];
};

export default function TableStaff({ tableId, employees }: Props) {
  const [assignOpen, setAssignOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data: response } = useGetEmployeesQuery({
    Page: 1,
    Per_Page: ALL,
  });

  const allEmployees = response?.data ?? [];

  const getEmployeeData = (employeeId: EmployeeId) =>
    allEmployees.find((e) => e.id === employeeId);

  const getImage = (employeeId: EmployeeId) => {
    const image = getEmployeeData(employeeId)?.user.image;
    return image ? `${BASE_URL}/images/user/${image}` : "";
  };

  const { data: employeeTables = [] } = useGetEmployeeTablesQuery();

  const [createEmployeeTableRange, createState] =
    useCreateEmployeeTableRangeMutation();

  const [deleteEmployeeTable, deleteState] = useDeleteEmployeeTableMutation();

  const isMutating = createState.isLoading || deleteState.isLoading;

  const handleAssign = async (employeeIds: EmployeeId[]) => {
    const payload = employeeIds.map((employeeId) => ({
      employeeId,
      tableId,
    }));

    await createEmployeeTableRange(payload).unwrap();
  };

  const handleRemove = async (employeeId: EmployeeId) => {
    const relation = employeeTables.find(
      (item) =>
        item.employee.employeeId === employeeId &&
        item.table.tableId === tableId,
    );

    console.log("Table ID:", tableId);
    console.log("Employee ID:", employeeId);
    console.log("Employee-tables relations:", employeeTables);
    console.log("Removing employee-table relation:", relation);

    if (!relation) {
      throw new Error("Employee-table relation not found");
    }

    await deleteEmployeeTable(relation.employeeTableId).unwrap();

    setAnchorEl(null);
  };

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

        <Button
          size="small"
          startIcon={<Add />}
          onClick={() => setAssignOpen(true)}
        >
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
        <ButtonBase
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-label="View assigned staff"
          sx={{
            justifyContent: "flex-start",
            borderRadius: 1,
            width: "100%",
            gap: 1,
            textAlign: "left",
          }}
        >
          <AvatarGroup max={3} total={employees.length}>
            {employees.map((employee) => (
              <Avatar
                key={employee.employeeId}
                src={getImage(employee.employeeId)}
                alt={employee.name}
              >
                {employee.name.charAt(0)}
              </Avatar>
            ))}
          </AvatarGroup>

          <Typography variant="body2">
            {employees.length === 1
              ? employees[0].name
              : `${employees.length} staff assigned`}
          </Typography>

          <ExpandMore fontSize="small" sx={{ color: "text.secondary" }} />
        </ButtonBase>
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{ paper: { sx: { width: 300, mt: 0.5 } } }}
      >
        <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Assigned staff ({employees.length})
          </Typography>
        </Box>

        <LoadingOverlay isFetching={isMutating}>
          <List dense sx={{ maxHeight: 280, overflowY: "auto", pb: 1 }}>
            {employees.map((employee) => (
              <ListItem
                key={employee.employeeId}
                secondaryAction={
                  <Tooltip title="Remove from table">
                    <IconButton
                      edge="end"
                      size="small"
                      color="error"
                      aria-label={`Remove ${employee.name}`}
                      disabled={isMutating}
                      onClick={() => handleRemove(employee.employeeId)}
                    >
                      <PersonOffOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={getImage(employee.employeeId)}
                    alt={employee.name}
                    sx={{ width: 32, height: 32 }}
                  >
                    {employee.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={employee.name}
                  secondary={getEmployeeData(employee.employeeId)?.designation}
                  slotProps={{ primary: { noWrap: true } }}
                />
              </ListItem>
            ))}
          </List>
        </LoadingOverlay>
      </Popover>

      <AssignStaffDialog
        open={assignOpen}
        employees={allEmployees}
        assignedIds={employees.map((e) => e.employeeId)}
        onClose={() => setAssignOpen(false)}
        onAssign={handleAssign}
        isSubmitting={isMutating}
      />
    </Stack>
  );
}
