import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../services/EmployeeAPIService";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
}
