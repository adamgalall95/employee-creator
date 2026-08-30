import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { Employee } from "../types/Employee";
import { MemoryRouter } from "react-router";

import { EmployeesCard } from "./EmployeesCard";

const employeeData: Employee = {
  id: 1,
  employeeName: "Ahmed Galall",
  firstName: "Ahmed",
  middleName: "Ali",
  lastName: "Galall",
  contractLength: 12,
  contractType: "Contract",
  emailAddress: "ahmed@example.com",
  mobileNumber: "0416245633",
  homeAddress: "12 King William Street, Adelaide SA 5000",
  startDate: "2026-01-15",
  endDate: "2027-01-15",
  employmentType: "Full-time",
  hoursPerWeek: 38,
};

describe("EmployeesCard", () => {
  it("renders employee name", () => {
    render(
      <MemoryRouter>
        <EmployeesCard employee={employeeData} />
      </MemoryRouter>,
    );

    const employeeName = screen.getByText("Ahmed Galall");

    expect(employeeName).toBeInTheDocument();
  });

  it("renders employee email", () => {
    render(
      <MemoryRouter>
        <EmployeesCard employee={employeeData} />
      </MemoryRouter>,
    );

    const employeeEmail = screen.getByText("ahmed@example.com");

    expect(employeeEmail).toBeInTheDocument();
  });

  it("renders employee contract length", () => {
    render(
      <MemoryRouter>
        <EmployeesCard employee={employeeData} />
      </MemoryRouter>,
    );

    const contractLength = screen.getByText("12 months");

    expect(contractLength).toBeInTheDocument();
  });

  it("renders employee contract type", () => {
    render(
      <MemoryRouter>
        <EmployeesCard employee={employeeData} />
      </MemoryRouter>,
    );

    const contractType = screen.getByText("Contract");

    expect(contractType).toBeInTheDocument();
  });

  it("renders the correct edit link", () => {
    render(
      <MemoryRouter>
        <EmployeesCard employee={employeeData} />
      </MemoryRouter>,
    );

    const editLink = screen.getByRole("link", {
      name: "Edit",
    });

    expect(editLink).toHaveAttribute("href", "/employees/1/edit");
  });
});
