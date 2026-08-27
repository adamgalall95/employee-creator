import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router";
import { employeeSchema } from "../schemas/employeeSchema";
import { EmployeeFormFields } from "../components/EmployeeFormFields";

export function EmployeesCreatePage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<
    z.input<typeof employeeSchema>,
    any,
    z.output<typeof employeeSchema>
  >({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Create Request");
    console.log(data);
    navigate("/");
  });

  return (
    <main className="mx-auto w-full max-w-3xl p-[1.5em]">
      <Link
        to="/"
        className="mb-[1em] inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        ← Back to Employees
      </Link>
      <div className="mb-[1.5em]">
        <h1 className="text-3xl font-bold">Create Employee</h1>

        <p className="mt-[0.5em] text-gray-500">
          Add a new employee to your organisation.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-gray-200 bg-white px-[1em] py-[1.5em] shadow-sm"
      >
        <EmployeeFormFields register={register} errors={errors} />
        <div className="mt-[1.5em] space-y-[0.75em] border-t border-gray-200 pt-[1.5em]">
          <button
            type="submit"
            className="w-full rounded-xl bg-[#111827] px-[1em] py-[0.75em] font-semibold text-white hover:bg-gray-800"
          >
            Create Employee
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
