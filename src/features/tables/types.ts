import type { ImagePickerValue } from "../../components/ImagePicker";

export type Table = {
  id: number;
  tableNumber: string;
  numberOfSeats: number;
  isOccupied: boolean;
  image: string;
  employees: EmployeeTable[];
};

export type EmployeeTable = {
  employeeTableId: number;
  employeeId: string;
  name: string;
};

export type TableFormValues = {
  tableNumber: string;
  numberOfSeats: string;
  image: ImagePickerValue | null;
};

export type TableMutationPayload = {
  tableNumber: string;
  numberOfSeats: number;
  image: string;
  base64: string;
};
