import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { employeeSchema } from "../schemas/employeeSchema";
import type { z } from "zod";

type FormData = z.input<typeof employeeSchema>;

type EmployeeFormFieldsProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export function EmployeeFormFields({
  register,
  errors,
}: EmployeeFormFieldsProps) {
  return (
    <div className="space-y-[1em]">
      <section className="space-y-[1em]">
        <h2 className="border-b border-gray-200 pb-[0.5em] text-lg font-semibold">
          Personal Information
        </h2>

        {/* First Name */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>

          <input
            id="firstName"
            {...register("firstName")}
            className="w-full rounded-lg border border-gray-300 px-[1em] py-[0.75em]"
          />

          <p className="text-sm text-red-600">{errors.firstName?.message}</p>
        </div>

        {/* Middle Name */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="middleName"
            className="block text-sm font-medium text-gray-700"
          >
            Middle Name
          </label>

          <input
            id="middleName"
            {...register("middleName")}
            className="w-full rounded-lg border border-gray-300 px-[1em] py-[0.75em]"
          />

          <p className="text-sm text-red-600">{errors.middleName?.message}</p>
        </div>

        {/* Last Name */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>

          <input
            id="lastName"
            {...register("lastName")}
            className="w-full rounded-lg border border-gray-300 px-[1em] py-[0.75em]"
          />

          <p className="text-sm text-red-600">{errors.lastName?.message}</p>
        </div>
      </section>

      <section className="space-y-[1em]">
        <h2 className="border-b border-gray-200 pb-[0.5em] text-lg font-semibold">
          Contact Information
        </h2>

        {/* Email Address */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="emailAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>

          <input
            id="emailAddress"
            {...register("emailAddress")}
            className="w-full rounded-lg border border-gray-300 px-[1em] py-[0.75em]"
          />

          <p className="text-sm text-red-600">{errors.emailAddress?.message}</p>
        </div>

        {/* Mobile Number */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="mobileNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile Number
          </label>

          <input
            id="mobileNumber"
            {...register("mobileNumber")}
            className="w-full rounded-lg border border-gray-300 px-[1em] py-[0.75em]"
          />

          <p className="text-sm text-red-600">{errors.mobileNumber?.message}</p>
        </div>

        {/* Home Address */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="homeAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Home Address
          </label>

          <input
            id="homeAddress"
            {...register("homeAddress")}
            className="w-full rounded-lg border border-gray-300 px-[1em] py-[0.75em]"
          />

          <p className="text-sm text-red-600">{errors.homeAddress?.message}</p>
        </div>
      </section>

      <section className="space-y-[1em]">
        <h2 className="border-b border-gray-200 pb-[0.5em] text-lg font-semibold">
          Employment Information
        </h2>

        {/* Contract Type */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="contractType"
            className="block text-sm font-medium text-gray-700"
          >
            Contract Type
          </label>

          <select
            id="contractType"
            {...register("contractType")}
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 bg-white px-[1em] py-[0.75em]"
          >
            <option value="" disabled>
              Select
            </option>

            <option value="Permanent">Permanent</option>

            <option value="Contract">Contract</option>
          </select>

          <p className="text-sm text-red-600">{errors.contractType?.message}</p>
        </div>

        {/* Start Date */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>

          <input
            id="startDate"
            type="date"
            {...register("startDate")}
            className="w-full rounded-lg border border-gray-300 bg-white px-[1em] py-[0.75em]"
          />

          <p className="text-sm text-red-600">{errors.startDate?.message}</p>
        </div>

        {/* End Date */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>

          <input
            id="endDate"
            type="date"
            {...register("endDate")}
            className="w-full rounded-lg border border-gray-300 bg-white px-[1em] py-[0.75em]"
          />

          <p className="text-sm text-red-600">{errors.endDate?.message}</p>
        </div>

        {/* Employment Type */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="employmentType"
            className="block text-sm font-medium text-gray-700"
          >
            Employment Type
          </label>

          <select
            id="employmentType"
            {...register("employmentType")}
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 bg-white px-[1em] py-[0.75em]"
          >
            <option value="" disabled>
              Select
            </option>

            <option value="Full-time">Full-time</option>

            <option value="Part-time">Part-time</option>
          </select>

          <p className="text-sm text-red-600">
            {errors.employmentType?.message}
          </p>
        </div>

        {/* Hours Per Week */}
        <div className="space-y-[0.5em]">
          <label
            htmlFor="hoursPerWeek"
            className="block text-sm font-medium text-gray-700"
          >
            Hours Per Week
          </label>

          <input
            id="hoursPerWeek"
            type="number"
            {...register("hoursPerWeek")}
            className="w-full rounded-lg border border-gray-300 px-[1em] py-[0.75em]"
          />

          <p className="text-sm text-red-600">{errors.hoursPerWeek?.message}</p>
        </div>
      </section>
    </div>
  );
}
