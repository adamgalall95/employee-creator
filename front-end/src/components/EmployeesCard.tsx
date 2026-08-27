import type { Employee } from "../types/Employee";
import { Link } from "react-router";

type Props = {
  employee: Employee;
};

export function EmployeesCard({ employee }: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-[1em] shadow-sm">
      <div className="flex items-start justify-between gap-[1em]">
        <h2 className="text-2xl font-bold">{employee.employeeName}</h2>

        <span className="shrink-0 rounded-lg bg-gray-100 px-[0.75em] py-[0.5em] text-sm font-semibold text-gray-700">
          {employee.contractType}
        </span>
      </div>

      <div className="my-[1em] space-y-[1em] text-gray-600">
        <p>{employee.emailAddress}</p>

        <p>
          {employee.contractType === "Contract"
            ? `${employee.contractLength} months`
            : "Permanent position"}
        </p>
      </div>
      <div className="mt-[1.5em] flex gap-[1em] border-t border-gray-200 pt-[1.5em]">
        <Link
          to={`/employees/${employee.id}/edit`}
          className="flex-1 rounded-xl bg-[#111827] px-[1em] py-[0.75em] text-center font-semibold text-white hover:bg-gray-800"
        >
          Edit
        </Link>
        <button
          type="button"
          className="flex-1 rounded-xl bg-red-500 px-[1em] py-[0.75em] font-semibold text-white hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </section>
  );
}
