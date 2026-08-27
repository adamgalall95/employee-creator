import { z } from "zod";

export const employeeSchema = z.object({
  // Personal information
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string(),
  lastName: z.string().min(1, "Last name is required"),

  // Contact details
  emailAddress: z.email("Enter a valid email address"),
  mobileNumber: z
    .string()
    .regex(/^04\d{8}$/, "Enter a valid Australian mobile number"),
  homeAddress: z.string().min(5, "Please enter a valid home address"),

  // Employee Status
  contractType: z.enum(["Contract", "Permanent"]),
  startDate: z.coerce.date(),
  endDate: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce.date().optional(),
  ),
  employmentType: z.enum(["Full-time", "Part-time"]),
  hoursPerWeek: z.coerce.number().min(1).max(38),
});
