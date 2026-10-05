import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";

import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../../api/employees.api";

import type {
  Employee,
  EmployeeFormValues,
  EmployeeMutationPayload,
} from "../type";

import ImagePicker from "../../../components/ImagePicker";

const IMAGE_BASE_URL = "https://bssrms.runasp.net/images/user/";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  employee?: Employee | null;
  onClose: () => void;
};

const getToday = () => {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
};

const toDateInputValue = (value?: string | null) => {
  if (!value) return "";
  return value.slice(0, 10);
};

const dateToIso = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day)).toISOString();
};

const getDefaultValues = (employee?: Employee | null): EmployeeFormValues => {
  if (!employee) {
    return {
      designation: "",
      joinDate: getToday(),
      email: "",
      phoneNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      spouseName: "",
      dob: "",
      nid: "",
      genderId: "",
      image: null,
    };
  }

  const user = employee.user;

  return {
    designation: employee.designation ?? "",
    joinDate: toDateInputValue(employee.joinDate),

    email: user.email ?? "",
    phoneNumber: user.phoneNumber ?? "",

    firstName: user.firstName ?? "",
    middleName: user.middleName ?? "",
    lastName: user.lastName ?? "",

    fatherName: user.fatherName ?? "",
    motherName: user.motherName ?? "",
    spouseName: user.spouseName ?? "",

    dob: toDateInputValue(user.dob),
    nid: user.nid ?? "",
    genderId:
      user.genderId === null || user.genderId === undefined
        ? ""
        : String(user.genderId),

    image: user.image
      ? {
          fileName: user.image,
          base64: "",
          preview: `${IMAGE_BASE_URL}${user.image}`,
        }
      : null,
  };
};

// Date inputs always render "mm/dd/yyyy", so their label must stay shrunk
// or it overlaps the placeholder when the field is empty and unfocused.
const dateFieldSlotProps = { inputLabel: { shrink: true } };

export default function EmployeeFormDialog({
  open,
  mode,
  employee,
  onClose,
}: Props) {
  const isEdit = mode === "edit";

  const [createEmployee, createState] = useCreateEmployeeMutation();

  const [updateEmployee, updateState] = useUpdateEmployeeMutation();

  const isSubmitting = createState.isLoading || updateState.isLoading;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    defaultValues: getDefaultValues(employee),
  });

  const image = watch("image");

  useEffect(() => {
    if (open) {
      reset(getDefaultValues(employee));
    }
  }, [open, employee, reset]);

  const onSubmit = async (values: EmployeeFormValues) => {
    const payload: EmployeeMutationPayload = {
      designation: values.designation.trim(),

      joinDate: dateToIso(values.joinDate),

      email: values.email.trim(),
      phoneNumber: values.phoneNumber.trim(),

      firstName: values.firstName.trim(),
      middleName: values.middleName.trim(),
      lastName: values.lastName.trim(),

      fatherName: values.fatherName.trim(),
      motherName: values.motherName.trim(),
      spouseName: values.spouseName.trim(),

      dob: values.dob ? dateToIso(values.dob) : "",

      nid: values.nid.trim(),
      genderId: Number(values.genderId),

      image: values.image?.fileName ?? "",
      base64: values.image?.base64 ?? "",
    };

    try {
      if (isEdit && employee) {
        await updateEmployee({
          id: employee.id,
          body: payload,
        }).unwrap();
      } else {
        await createEmployee(payload).unwrap();
      }

      onClose();
    } catch {
      // Keep the dialog/form open so the user doesn't lose
      // the entered data.
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h6" component="span" sx={{ display: "block" }}>
          {isEdit ? "Edit Employee" : "Add Employee"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          component="span"
          sx={{ display: "block", fontWeight: 400 }}
        >
          {isEdit
            ? "Update the employee's details below."
            : "Fill in the details to add a new employee."}
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
        <Stack
          component="form"
          id="employee-form"
          onSubmit={handleSubmit(onSubmit)}
          divider={<Divider flexItem />}
          spacing={3}
        >
          <FormSection
            title="Profile photo"
            description="Shown across the app next to the employee's name."
          >
            <Field span={12}>
              <ImagePicker
                value={image}
                disabled={isSubmitting}
                onChange={(value) => setValue("image", value)}
              />
            </Field>
          </FormSection>

          <FormSection
            title="Personal information"
            description="Name, date of birth and gender."
          >
            <Field span={4}>
              <TextField
                fullWidth
                label="First name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Field>

            <Field span={4}>
              <TextField
                fullWidth
                label="Middle name"
                {...register("middleName")}
              />
            </Field>

            <Field span={4}>
              <TextField
                fullWidth
                label="Last name"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Field>

            <Field span={6}>
              <TextField
                fullWidth
                label="Date of birth"
                type="date"
                slotProps={dateFieldSlotProps}
                {...register("dob")}
              />
            </Field>

            <Field span={6}>
              <TextField
                fullWidth
                label="Gender ID"
                type="number"
                {...register("genderId", {
                  required: "Gender is required",
                })}
                error={!!errors.genderId}
                helperText={errors.genderId?.message}
              />
            </Field>
          </FormSection>

          <FormSection
            title="Family"
            description="Optional family information."
          >
            <Field span={6}>
              <TextField
                fullWidth
                label="Father's name"
                {...register("fatherName")}
              />
            </Field>

            <Field span={6}>
              <TextField
                fullWidth
                label="Mother's name"
                {...register("motherName")}
              />
            </Field>

            <Field span={6}>
              <TextField
                fullWidth
                label="Spouse name"
                {...register("spouseName")}
              />
            </Field>
          </FormSection>

          <FormSection title="Employment" description="Role and joining date.">
            <Field span={6}>
              <TextField
                fullWidth
                label="Designation"
                {...register("designation", {
                  required: "Designation is required",
                })}
                error={!!errors.designation}
                helperText={errors.designation?.message}
              />
            </Field>

            <Field span={6}>
              <TextField
                fullWidth
                label="Join date"
                type="date"
                slotProps={dateFieldSlotProps}
                {...register("joinDate", {
                  required: "Join date is required",
                })}
                error={!!errors.joinDate}
                helperText={errors.joinDate?.message}
              />
            </Field>
          </FormSection>

          <FormSection
            title="Contact & identification"
            description="How to reach the employee and their ID."
          >
            <Field span={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Field>

            <Field span={6}>
              <TextField
                fullWidth
                label="Phone number"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </Field>

            <Field span={6}>
              <TextField fullWidth label="NID" {...register("nid")} />
            </Field>
          </FormSection>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting} color="inherit">
          Cancel
        </Button>

        <Button
          type="submit"
          form="employee-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Save Changes"
              : "Create Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * Two-pane section: title + description on the left (stacks on top on
 * mobile), fields on the right in a 12-column grid.
 */
function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "220px minmax(0, 1fr)" },
        columnGap: 4,
        rowGap: 2,
      }}
    >
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: 2,
          alignItems: "start",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/** A grid cell spanning `span` of 12 columns (full width on mobile). */
function Field({ span, children }: { span: number; children: ReactNode }) {
  return (
    <Box sx={{ gridColumn: { xs: "span 12", sm: `span ${span}` } }}>
      {children}
    </Box>
  );
}
