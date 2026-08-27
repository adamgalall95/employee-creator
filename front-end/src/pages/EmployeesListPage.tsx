import { EmployeesCard } from "../components/EmployeesCard";
import type { Employee } from "../types/Employee";
import { useState, useEffect } from "react";
import { fetchEmployees } from "../services/EmployeeAPIService";
import { Link } from "react-router";

export function EmployeesListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    async function loadEmployees() {
      try {
        const employees = await fetchEmployees();
        setEmployees(employees);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    loadEmployees();
  }, []);
  return (
    <main className="mx-auto w-full max-w-6xl px-[1em] py-[1.5em]">
      <div className="my-[1.5em]">
        <h1 className="text-4xl font-bold tracking-tight">Employees</h1>

        <p className="mt-[0.5em] text-lg text-gray-500">
          Manage your employees
        </p>
      </div>
      <Link
        to="/form"
        className="mb-[1.5em] flex w-full justify-center rounded-xl bg-[#111827] p-[1em] font-semibold text-white hover:bg-gray-800"
      >
        + Add Employee
      </Link>
      <div className="space-y-[1.5em]">
        {employees.map((employee) => (
          <EmployeesCard key={employee.id} employee={employee} />
        ))}
      </div>
    </main>
  );
}
