import type { Employee } from "../types/Employee";
import type { employeeSchema } from "../schemas/employeeSchema";
import type z from "zod";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchEmployees = async () => {
  const response = await fetch(BACKEND_URL + "/employees");
  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }
  return (await response.json()) as Employee[];
};

export const fetchEmployee = async (id: number) => {
  const response = await fetch(BACKEND_URL + "/employees/" + id);
  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  return (await response.json()) as Employee;
};

export const createEmployee = async (data: z.output<typeof employeeSchema>) => {
  const response = await fetch(BACKEND_URL + "/employees", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  return (await response.json()) as Employee;
};

export const updateEmployee = async (
  id: number,
  data: z.output<typeof employeeSchema>,
) => {
  const response = await fetch(BACKEND_URL + "/employees/" + id, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  return (await response.json()) as Employee;
};

export const deleteEmployee = async (id: number) => {
  const response = await fetch(BACKEND_URL + "/employees/" + id, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }
};
