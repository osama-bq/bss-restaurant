import {
  Avatar,
  IconButton,
  Link,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import type { Employee } from "../type";

type Props = {
  employee: Employee;
};

export default function EmployeeTableRow({ employee }: Props) {
  const { user } = employee;

  return (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Avatar
            src={`https://bssrms.runasp.net/images/user/${user.image}`}
            alt={user.fullName}
          >
            {user.fullName.charAt(0)}
          </Avatar>

          <div>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {user.fullName}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {user.userName && `@${user.userName}`}
            </Typography>
          </div>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{employee.designation}</Typography>
      </TableCell>

      <TableCell>
        <Stack spacing={0.7} sx={{ alignItems: "flex-start" }}>
          <Link
            href={`mailto:${user.email}`}
            variant="body2"
            underline="hover"
            color="inherit"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.7,
            }}
          >
            <EmailIcon fontSize="small" />
            {user.email}
          </Link>

          <Link
            href={`tel:${user.phoneNumber}`}
            variant="caption"
            underline="hover"
            color="inherit"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.7,
            }}
          >
            <PhoneIcon fontSize="small" />
            {user.phoneNumber}
          </Link>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          {new Date(employee.joinDate).toLocaleDateString()}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {employee.amountSold.toLocaleString()}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Tooltip title="Edit employee">
            <IconButton
              size="small"
              onClick={() => {
                // Edit will be implemented later.
              }}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete employee">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                // Delete confirmation will be implemented later.
              }}
            >
              <DeleteOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
