package io.employee_app.employee;

import org.springframework.data.jpa.repository.JpaRepository;

import io.employee_app.employee.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
