import { apiClient } from "./client";
import type { Employee } from "../features/employees/type";

export interface SearchRequest {
    Search?: string;
    Sort?: string;
    Page: number;
    Per_Page: number;
}

export interface EmployeesResponse {
    data: Employee[]
}


export function getEmployees(data: SearchRequest): Promise<EmployeesResponse> {
    return apiClient("/api/Employee/datatable" + `?Sort=${data.Sort || ""}${data.Search? "&Search=" + data.Search : ""}&Page=${data.Page}&Per_Page=${data.Per_Page}`, {}, true);
}