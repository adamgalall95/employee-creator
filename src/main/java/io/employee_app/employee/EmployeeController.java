package io.employee_app.employee;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import io.employee_app.employee.entities.Employee;

@Controller
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService employeeservice) {
        this.service = employeeservice;
    }

    @GetMapping()
    public ResponseEntity<List<Employee>> findAllEmployees() {
        List<Employee> employees = this.service.getAll();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findEmployeeById(@PathVariable Long id) {
        Employee employee = this.service.getByID(id);
        return ResponseEntity.ok(employee);
    }
}
