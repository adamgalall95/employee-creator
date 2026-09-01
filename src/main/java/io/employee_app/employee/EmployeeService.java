package io.employee_app.employee;

import java.util.List;

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

    public Employee getByID(long id) {
        return this.repo.findById(id).orElseThrow(() -> new NotFoundException(
                "Employee with id " + id + " was not found"));
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

    public Employee updateEmployee(Long id, UpdateEmployeeDTO updates) {
        Employee employee = getByID(id);
        mapper.map(updates, employee);
        return this.repo.save(employee);
    }

    public Employee deleteEmployee(Long id) {
        Employee employee = getByID(id);

        this.repo.deleteById(id);
        return employee;
    }

}
