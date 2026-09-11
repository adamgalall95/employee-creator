import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../services/EmployeeAPIService";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}
