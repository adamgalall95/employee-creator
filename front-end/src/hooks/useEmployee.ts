import { useQuery } from "@tanstack/react-query";
import { fetchEmployee } from "../services/EmployeeAPIService";

export function useEmployee(id: number) {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => fetchEmployee(id),
  });
}
