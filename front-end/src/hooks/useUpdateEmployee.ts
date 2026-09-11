import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../services/EmployeeAPIService";
import type { employeeSchema } from "../schemas/employeeSchema";
import type z from "zod";
import { useNavigate } from "react-router";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: z.output<typeof employeeSchema>;
    }) => updateEmployee(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      navigate("/");
    },
  });
}
