export interface User {
  id: string;
  fullName: string;
  email: string | null;
  userName: string | null;
  phoneNumber: string | null;

  firstName: string | null;
  middleName: string | null;
  lastName: string | null;

  fatherName: string | null;
  motherName: string | null;
  spouseName: string | null;

  dob: string | null;
  nid: string | null;
  genderId: number | null;

  image: string | null;
}
