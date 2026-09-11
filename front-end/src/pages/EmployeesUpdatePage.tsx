import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { employeeSchema } from "../schemas/employeeSchema";
import { EmployeeFormFields } from "../components/EmployeeFormFields";
import { useEmployee } from "../hooks/useEmployee";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";

export function EmployeesUpdatePage() {
  const { id } = useParams();
  const updateEmployeeMutation = useUpdateEmployee();
  const { isError: isUpdateError, error: updateError } = updateEmployeeMutation;
  const { data: employee, isLoading, isError, error } = useEmployee(Number(id));

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<
    z.input<typeof employeeSchema>,
    any,
    z.output<typeof employeeSchema>
  >({
    resolver: zodResolver(employeeSchema),
  });

  useEffect(() => {
    if (employee) {
      reset({
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        emailAddress: employee.emailAddress,
        mobileNumber: employee.mobileNumber,
        homeAddress: employee.homeAddress,
        contractType: employee.contractType,
        startDate: employee.startDate,
        endDate: employee.endDate,
        employmentType: employee.employmentType,
        hoursPerWeek: employee.hoursPerWeek,
      });
    }
  }, [employee, reset]);

  if (isLoading) {
    return <p>Loading employee...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const onSubmit = (data: z.output<typeof employeeSchema>) => {
    updateEmployeeMutation.mutate({
      id: Number(id),
      data,
    });
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-[1em] py-[1.5em]">
      <Link
        to="/"
        className="mb-[1em] inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        ← Back to Employees
      </Link>
      <div className="mb-[1.5em]">
        <h1 className="text-3xl font-bold">Update Employee Details</h1>

        <p className="mt-[0.5em] text-gray-500">
          Update details of existing employee in your organisation.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-gray-200 bg-white px-[1em] py-[1.5em] shadow-sm"
      >
        <EmployeeFormFields
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />
        {isUpdateError && (
          <p className="mb-[1em] text-red-600">{updateError.message}</p>
        )}
        <div className="mt-[1.5em] space-y-[0.75em] border-t border-gray-200 pt-[1.5em]">
          <button
            type="submit"
            className="w-full rounded-xl bg-[#111827] px-[1em] py-[0.75em] font-semibold text-white hover:bg-gray-800"
          >
            Update Employee
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="w-full rounded-xl border border-gray-300 bg-white px-[1em] py-[0.75em] font-semibold text-gray-700 hover:bg-gray-50"
          >
            Reset Form
          </button>
        </div>
      </form>
    </main>
  );
}
