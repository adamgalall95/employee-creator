package io.employee_app.employee;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.employee_app.common.exceptions.UnprocessableContentException;
import io.employee_app.employee.dtos.EmployeeDTO;
import io.employee_app.employee.entities.Employee;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;
    private final ModelMapper mapper;

    public EmployeeService(EmployeeRepository serviceRepo, ModelMapper modelMapper) {
        this.repo = serviceRepo;
        this.mapper = modelMapper;
    }

    public List<Employee> getAll() {
        return this.repo.findAll();
    }

    public Optional<Employee> getByID(Long id) {
        return this.repo.findById(id);
    }

    public boolean getByEmail(String email) {
        return this.repo.existsByEmailAddress(email);
    }

    public Employee createEmployee(EmployeeDTO data) {
        validateEmployeeRules(data);

        // 2. Query the repository directly for the existence check
        boolean emailExists = this.repo.existsByEmailAddress(data.getEmailAddress());
        if (emailExists) {
            throw new UnprocessableContentException(
                    "Employment with email " + data.getEmailAddress() + " exists");
        }
        Employee employee = this.mapper.map(data, Employee.class);
        employee.setEmploymentStatus("ACTIVE");
        return this.repo.saveAndFlush(employee);
    }

    public Optional<Employee> updateEmployee(Long id, EmployeeDTO updates) {

        validateEmployeeRules(updates);
        Optional<Employee> result = this.getByID(id);

        if (result.isEmpty()) {
            return result;
        }

        Employee employee = result.get();

        mapper.map(updates, employee);

        this.repo.saveAndFlush(employee);

        return Optional.of(employee);
    }

    public boolean deleteEmployee(Long id) {

        Optional<Employee> result = this.repo.findById(id);

        if (result.isEmpty()) {
            return false;
        }

        this.repo.delete(result.get());
        return true;
    }

    public void validateEmployeeRules(EmployeeDTO data) {
        if (data.getContractType().equals("Permanent")
                && data.getEndDate() != null) {

            throw new UnprocessableContentException(
                    "Employment end date should be left empty for Permanent employees");
        }

        if (data.getContractType().equals("Contract")
                && data.getEndDate() == null) {

            throw new UnprocessableContentException(
                    "Contract employees should have a contract end date");
        }

        if (data.getContractType().equals("Contract")
                && data.getEndDate() != null && data.getEndDate().isBefore(data.getStartDate())) {

            throw new UnprocessableContentException(
                    "Contract employees must have an end date after start date");
        }

        if (data.getEmploymentType().equals("Full-time")
                && data.getHoursPerWeek() != 38) {
            throw new UnprocessableContentException(
                    "Full-time employees must have 38 hours per week");
        }

        if (data.getEmploymentType().equals("Part-time")
                && (data.getHoursPerWeek() > 37 || data.getHoursPerWeek() < 1)) {
            throw new UnprocessableContentException(
                    "Part-time employees must have less than 38 hours per week and more than 0 hours per week");
        }
    }

}
