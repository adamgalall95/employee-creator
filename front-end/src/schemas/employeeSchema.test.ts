import { describe, expect, it } from "vitest";
import { employeeSchema } from "./employeeSchema";

describe("employeeSchema", () => {
  it("accepts valid employee data", () => {
    const employee = {
      firstName: "Adam",
      middleName: "Yosri",
      lastName: "Galall",
      emailAddress: "adam@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "2027-09-01",
      employmentType: "Full-time",
      hoursPerWeek: 30,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(true);
  });

  it("accepts valid employee data with an empty optional end date", () => {
    const employee = {
      firstName: "Ahmed",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: 2,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    const employee = {
      firstName: "Ahmed",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: 38,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it("rejects an empty first name", () => {
    const employee = {
      firstName: "",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: 38,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it("rejects an empty last name", () => {
    const employee = {
      firstName: "Adam",
      middleName: "",
      lastName: "",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: 38,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it("rejects an invalid Australian mobile number", () => {
    const employee = {
      firstName: "Adam",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0505633067",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: 38,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it("rejects a home address with less than 5 characters", () => {
    const employee = {
      firstName: "Adam",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: 38,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it("rejects an empty contract type", () => {
    const employee = {
      firstName: "Adam",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: 38,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it("rejects an empty start date", () => {
    const employee = {
      firstName: "Adam",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: 38,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it("rejects an empty employment type", () => {
    const employee = {
      firstName: "Adam",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "",
      hoursPerWeek: 38,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it("rejects hours per week below 1", () => {
    const employee = {
      firstName: "Adam",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: -5,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it("rejects hours per week above 38", () => {
    const employee = {
      firstName: "Adam",
      middleName: "",
      lastName: "Galall",
      emailAddress: "ahmed@example.com",
      mobileNumber: "0412345678",
      homeAddress: "123 Main Street",
      contractType: "Permanent",
      startDate: "2026-09-01",
      endDate: "",
      employmentType: "Full-time",
      hoursPerWeek: 40,
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });
});
