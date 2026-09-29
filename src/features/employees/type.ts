import type { User } from "../auth/type";

export type Employee = {
    id: string;
    designation: string;
    joinDate: string;
    amountSold: number;
    user: User[];
};