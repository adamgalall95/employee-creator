import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../services/EmployeeAPIService";
import { useNavigate } from "react-router";

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      navigate("/");
    },
  });
}
