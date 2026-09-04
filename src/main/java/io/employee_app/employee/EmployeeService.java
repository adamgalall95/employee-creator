package io.employee_app.employee;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.employee_app.common.exceptions.NotFoundException;
import io.employee_app.common.exceptions.UnprocessableContentException;
import io.employee_app.employee.dtos.CreateEmployeeDTO;
import io.employee_app.employee.dtos.UpdateEmployeeDTO;
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

    public Employee createEmployee(CreateEmployeeDTO data) {

        if (data.getContractType().equals("Contract")
                && data.getEndDate() == null) {

            throw new UnprocessableContentException(
                    "Contract employees must have an end date");
        }

        if (data.getEndDate() != null &&
                data.getEndDate().isBefore(data.getStartDate())) {

            throw new UnprocessableContentException(
                    "End date cannot be before start date");
        }

        Employee employee = this.mapper.map(data, Employee.class);
        employee.setEmploymentStatus("ACTIVE");
        return this.repo.saveAndFlush(employee);
    }

    public Optional<Employee> updateEmployee(Long id, UpdateEmployeeDTO updates) {

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

}
