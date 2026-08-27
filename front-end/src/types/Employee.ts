export type ContractType = "Contract" | "Permanent";

export type EmploymentType = "Full-time" | "Part-time";

export type Employee = {
  id: number;
  employeeName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  contractLength: number;
  contractType: ContractType;
  emailAddress: string;
  mobileNumber: string;
  homeAddress: string;
  startDate: string;
  endDate: string | null;
  employmentType: EmploymentType;
  hoursPerWeek: number;
};
