import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "../../../api/baseApi";
import type { Employee } from "../../employees/type";

type EmployeeId = Employee["id"];

type Props = {
  open: boolean;
  employees: Employee[];
  assignedIds: EmployeeId[];
  onClose: () => void;
  onAssign: (employeeIds: EmployeeId[]) => void | Promise<void>;
  isSubmitting?: boolean;
};

export default function AssignStaffDialog({
  open,
  employees,
  assignedIds,
  onClose,
  onAssign,
  isSubmitting = false,
}: Props) {
  const [selected, setSelected] = useState<EmployeeId[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) {
      setSelected([]);
      setSearch("");
    }
  }, [open]);

  const available = useMemo(() => {
    const q = search.trim().toLowerCase();

    return employees
      .filter((e) => !assignedIds.includes(e.id))
      .filter(
        (e) =>
          !q ||
          e.user.fullName.toLowerCase().includes(q) ||
          (e.designation ?? "").toLowerCase().includes(q),
      );
  }, [employees, assignedIds, search]);

  const hasAnyUnassigned = employees.some((e) => !assignedIds.includes(e.id));

  const toggle = (id: EmployeeId) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleSubmit = async () => {
    try {
      await onAssign(selected);
      onClose();
    } catch {
      // Keep the dialog open so the selection isn't lost.
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h6" component="span" sx={{ display: "block" }}>
          Assign staff
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          component="span"
          sx={{ display: "block", fontWeight: 400 }}
        >
          Select the employees to assign to this table.
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        <Stack sx={{ p: 2, pb: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search employees"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!hasAnyUnassigned}
          />
        </Stack>

        {available.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ p: 3, textAlign: "center" }}
          >
            {hasAnyUnassigned
              ? "No employees match your search."
              : "All employees are already assigned to this table."}
          </Typography>
        ) : (
          <List sx={{ maxHeight: 360, overflowY: "auto", px: 1 }}>
            {available.map((employee) => {
              const isChecked = selected.includes(employee.id);

              return (
                <ListItem key={employee.id} disablePadding>
                  <ListItemButton
                    onClick={() => toggle(employee.id)}
                    disabled={isSubmitting}
                    sx={{ borderRadius: 1 }}
                  >
                    <Checkbox
                      edge="start"
                      checked={isChecked}
                      tabIndex={-1}
                      disableRipple
                      sx={{ mr: 1 }}
                    />

                    <ListItemAvatar>
                      <Avatar
                        src={
                          employee.user.image
                            ? `${BASE_URL}/images/user/${employee.user.image}`
                            : ""
                        }
                        alt={employee.user.fullName}
                      >
                        {employee.user.fullName.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={employee.user.fullName}
                      secondary={employee.designation}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting} color="inherit">
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={selected.length === 0 || isSubmitting}
        >
          {isSubmitting
            ? "Assigning..."
            : selected.length > 0
              ? `Assign (${selected.length})`
              : "Assign"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
