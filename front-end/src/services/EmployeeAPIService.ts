import type { Employee } from "../types/Employee";

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch("/SampleEmployees.json");

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
}

export async function fetchEmployee(id: number): Promise<Employee> {
  const employees = await fetchEmployees();

  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  return employee;
}
