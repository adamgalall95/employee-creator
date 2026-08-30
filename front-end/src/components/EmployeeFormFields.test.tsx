import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { EmployeeFormFields } from "./EmployeeFormFields";
import { employeeSchema } from "../schemas/employeeSchema";

type FormData = z.input<typeof employeeSchema>;

function TestForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>();

  return <EmployeeFormFields register={register} errors={errors} />;
}

describe("EmployeeFormFields", () => {
  it("renders all form fields", () => {
    render(<TestForm />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Middle Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Mobile Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Home Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Contract Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Employment Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Hours Per Week")).toBeInTheDocument();
  });

  it("allows the user to enter and select form values", async () => {
    const user = userEvent.setup();

    render(<TestForm />);

    const firstName = screen.getByLabelText("First Name");
    const contractType = screen.getByLabelText("Contract Type");

    await user.type(firstName, "Ahmed");
    await user.selectOptions(contractType, "Contract");

    expect(firstName).toHaveValue("Ahmed");
    expect(contractType).toHaveValue("Contract");
  });
});
