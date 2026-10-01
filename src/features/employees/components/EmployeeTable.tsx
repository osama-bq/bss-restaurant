import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Skeleton,
} from "@mui/material";
import type { Employee } from "../type";
import EmployeeTableRow from "./EmployeeTableRow";
import LoadingOverlay from "../../../components/LodingOverlay";

type Props = {
  employees: Employee[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
};

export default function EmployeeTable({
  employees,
  isLoading,
  isFetching,
  error,
}: Props) {
  if (isLoading) {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton variant="text" width="70%" />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 6 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper>
        <Typography sx={{ p: 3 }} color="error">
          Failed to load employees.
        </Typography>
      </Paper>
    );
  }

  if (employees.length === 0) {
    return (
      <Paper>
        <Typography sx={{ p: 3 }} color="text.secondary">
          No employees found.
        </Typography>
      </Paper>
    );
  }

  return (
    <LoadingOverlay isFetching={isFetching}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell align="right">Sales</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((employee) => (
              <EmployeeTableRow key={employee.id} employee={employee} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LoadingOverlay>
  );
}
