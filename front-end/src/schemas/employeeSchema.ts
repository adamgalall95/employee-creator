import { z } from "zod";

export const employeeSchema = z
  .object({
    // Personal information

    firstName: z.string().min(1, "First name is required"),

    middleName: z.string().optional(),

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
  })
  .superRefine((data, ctx) => {
    // Permanent employees cannot have an end date
    if (data.contractType === "Permanent" && data.endDate !== undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message:
          "Employment end date should be left empty for Permanent employees",
      });
    }

    // Contract employees must have an end date
    if (data.contractType === "Contract" && data.endDate === undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "Contract employees should have a contract end date",
      });
    }

    // Contract end date must be after start date
    if (
      data.contractType === "Contract" &&
      data.endDate !== undefined &&
      data.endDate < data.startDate
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "Contract employees must have an end date after start date",
      });
    }

    // Full-time employees must have 38 hours
    if (data.employmentType === "Full-time" && data.hoursPerWeek !== 38) {
      ctx.addIssue({
        code: "custom",
        path: ["hoursPerWeek"],
        message: "Full-time employees must have 38 hours per week",
      });
    }

    // Part-time employees must have 1–37 hours
    if (
      data.employmentType === "Part-time" &&
      (data.hoursPerWeek > 37 || data.hoursPerWeek < 1)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["hoursPerWeek"],
        message:
          "Part-time employees must have less than 38 hours per week and more than 0 hours per week",
      });
    }
  });
