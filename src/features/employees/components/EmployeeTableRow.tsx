import {
  Avatar,
  IconButton,
  Link,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import type { Employee } from "../type";

type Props = {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

export default function EmployeeTableRow({
  employee,
  onEdit,
  onDelete,
}: Props) {
  const { user } = employee;

  const joined = new Date(employee.joinDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <TableRow hover>
      <TableCell sx={{ px: 2, py: 1.25 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Avatar
            src={`https://bssrms.runasp.net/images/user/${user.image}`}
            alt={user.fullName}
            sx={{ width: 36, height: 36 }}
          >
            {user.fullName.charAt(0)}
          </Avatar>

          <div>
            <Typography variant="body2" color="text.secondary">
              {user.fullName}
            </Typography>
            {user.userName && (
              <Typography variant="caption" color="text.disabled">
                @{user.userName}
              </Typography>
            )}
          </div>
        </Stack>
      </TableCell>

      <TableCell sx={{ px: 2, py: 1.25 }}>
        <Typography variant="body2" color="text.secondary">
          {employee.designation}
        </Typography>
      </TableCell>

      <TableCell sx={{ px: 2, py: 1.25 }}>
        <Link
          href={`mailto:${user.email}`}
          variant="body2"
          underline="hover"
          color="text.secondary"
        >
          {user.email}
        </Link>
      </TableCell>

      <TableCell sx={{ px: 2, py: 1.25 }}>
        <Link
          href={`tel:${user.phoneNumber}`}
          variant="body2"
          underline="hover"
          color="text.secondary"
        >
          {user.phoneNumber}
        </Link>
      </TableCell>

      <TableCell sx={{ px: 2, py: 1.25 }}>
        <Typography variant="body2" color="text.secondary">
          {joined}
        </Typography>
      </TableCell>

      <TableCell align="right" sx={{ px: 2, py: 1.25 }}>
        <Typography variant="body2" color="text.secondary">
          {employee.amountSold.toLocaleString()}
        </Typography>
      </TableCell>

      <TableCell align="right" sx={{ px: 2, py: 1.25 }}>
        <IconButton
          size="small"
          aria-label="Employee edit"
          onClick={() => onEdit(employee)}
          sx={{
            border: "1px solid #EEF0F3",
            borderRadius: 1,
            width: 36,
            height: 36,
          }}
        >
          <EditOutlined fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          aria-label="Employee delete"
          onClick={() => onDelete(employee)}
          sx={{
            border: "1px solid #EEF0F3",
            borderRadius: 1,
            width: 36,
            height: 36,
            ml: 1,
            color: "error.main",
          }}
        >
          <DeleteOutlined fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
