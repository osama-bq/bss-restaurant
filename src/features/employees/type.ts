import type { User } from "../auth/type";

export type Employee = {
  id: string;
  designation: string;
  joinDate: string;
  amountSold: number;
  user: User;
};

export interface EmployeeMutationPayload {
  designation: string;
  joinDate: string;

  email: string;
  phoneNumber: string;

  firstName: string;
  middleName: string;
  lastName: string;

  fatherName: string;
  motherName: string;
  spouseName: string;

  dob: string;
  nid: string;
  genderId: number;

  image: string;
  base64: string;
}

export type EmployeeFormValues = {
  designation: string;
  joinDate: string;

  email: string;
  phoneNumber: string;

  firstName: string;
  middleName: string;
  lastName: string;

  fatherName: string;
  motherName: string;
  spouseName: string;

  dob: string;
  nid: string;

  genderId: string;

  image: {
    fileName: string;
    base64: string;
    preview: string;
  } | null;
};
