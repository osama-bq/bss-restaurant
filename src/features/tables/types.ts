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
