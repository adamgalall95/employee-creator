package io.employee_app.employee;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.employee_app.employee.dtos.CreateEmployeeDTO;
import io.employee_app.employee.dtos.UpdateEmployeeDTO;
import io.employee_app.employee.entities.Employee;
import jakarta.validation.Valid;

@RestController
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

    @PostMapping()
    public ResponseEntity<Employee> addEmployee(@RequestBody @Valid CreateEmployeeDTO data) {

        Employee employee = this.service.createEmployee(data);
        return ResponseEntity.status(201).body(employee);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody UpdateEmployeeDTO data) {

        Employee employee = this.service.updateEmployee(id, data);

        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Long id) {
        this.service.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
