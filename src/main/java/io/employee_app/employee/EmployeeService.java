package io.employee_app.employee;

import java.util.List;

import org.springframework.stereotype.Service;

import io.employee_app.employee.entities.Employee;
import io.employee_app.exceptions.EmployeeNotFoundException;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository serviceRepo) {
        this.repo = serviceRepo;
    }

    public List<Employee> getAll() {
        return this.repo.findAll();
    }

    public Employee getByID(long id) {
        return this.repo.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
    }

}
