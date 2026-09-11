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

import io.employee_app.employee.dtos.EmployeeDTO;
import io.employee_app.employee.entities.Employee;
import io.employee_app.common.exceptions.NotFoundException;
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

        Employee employee = this.service.getByID(id)
                .orElseThrow(() -> new NotFoundException(
                        "Employee with id " + id + " was not found"));

        return ResponseEntity.ok(employee);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Boolean> findEmployeeByEmail(@PathVariable String email) {

        Boolean exists = this.service.getByEmail(email);
        return ResponseEntity.ok(exists);
    }

    @PostMapping()
    public ResponseEntity<Employee> addEmployee(@RequestBody @Valid EmployeeDTO data) {

        Employee employee = this.service.createEmployee(data);
        return ResponseEntity.status(201).body(employee);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeDTO data) {

        Employee employee = this.service.updateEmployee(id, data)
                .orElseThrow(() -> new NotFoundException(
                        "Employee with id " + id + " was not found"));

        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {

        boolean isDeleted = this.service.deleteEmployee(id);

        if (isDeleted) {
            return ResponseEntity.noContent().build();
        }

        throw new NotFoundException(
                "Employee with id " + id + " was not found");
    }
}
