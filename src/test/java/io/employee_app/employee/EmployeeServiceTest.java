package io.employee_app.employee;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import io.employee_app.employee.dtos.CreateEmployeeDTO;
import io.employee_app.employee.dtos.UpdateEmployeeDTO;
import io.employee_app.employee.entities.Employee;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {
    @Mock
    private EmployeeRepository repo;
    @Mock
    private ModelMapper mapper;

    @Spy
    @InjectMocks
    private EmployeeService employeeService;

    @Test
    public void getAll_CallsFindAll() {
        this.employeeService.getAll();
        verify(this.repo).findAll();
    }

    @Test
    public void getByID_CallsFindById() {
        this.employeeService.getByID(1L);
        verify(this.repo).findById(1L);
    }

    @Test
    public void create_WhenEmployeeValid_SaveEmployeeInDb() {
        // arrange
        CreateEmployeeDTO dto = mock(CreateEmployeeDTO.class);

        when(dto.getContractType()).thenReturn("Permanent");
        when(dto.getEndDate()).thenReturn(null);

        Employee fakeEmployee = new Employee();
        fakeEmployee.setId(1L);
        fakeEmployee.setFirstName("Adam");
        fakeEmployee.setMiddleName("Ali");
        fakeEmployee.setLastName("Galall");
        fakeEmployee.setEmailAddress("adam@example.com");
        fakeEmployee.setMobileNumber("0412345678");
        fakeEmployee.setHomeAddress("123 Main Street, Adelaide");
        fakeEmployee.setContractType("Permanent");
        fakeEmployee.setStartDate(LocalDate.of(2026, 1, 1));
        fakeEmployee.setEndDate(null);
        fakeEmployee.setEmploymentType("Full-time");
        fakeEmployee.setHoursPerWeek(38.0);
        fakeEmployee.setEmploymentStatus("ACTIVE");

        when(this.mapper.map(dto, Employee.class)).thenReturn(fakeEmployee);

        // act
        this.employeeService.createEmployee(dto);

        // assert
        verify(this.repo).saveAndFlush(fakeEmployee);
    }

    @Test
    public void delete_whenEmployeeExists_DeletesFromDb_ReturnTrue() {

        // arrange
        Employee fakeEmployee = new Employee();
        fakeEmployee.setId(1L);
        fakeEmployee.setFirstName("Adam");
        fakeEmployee.setMiddleName("Ali");
        fakeEmployee.setLastName("Galall");
        fakeEmployee.setEmailAddress("adam@example.com");
        fakeEmployee.setMobileNumber("0412345678");
        fakeEmployee.setHomeAddress("123 Main Street, Adelaide");
        fakeEmployee.setContractType("Permanent");
        fakeEmployee.setStartDate(LocalDate.of(2026, 1, 1));
        fakeEmployee.setEndDate(null);
        fakeEmployee.setEmploymentType("Full-time");
        fakeEmployee.setHoursPerWeek(38.0);
        fakeEmployee.setEmploymentStatus("ACTIVE");

        when(this.repo.findById(1L))
                .thenReturn(Optional.of(fakeEmployee));

        // act
        boolean result = this.employeeService.deleteEmployee(1L);

        // assert
        verify(this.repo).findById(1L);
        verify(this.repo).delete(fakeEmployee);
        assertTrue(result);
    }

    @Test
    public void update_whenEmployeeDoesNotExists_DoesnNotSaveEmployee() {
        // arrange
        when(this.repo.findById(anyLong())).thenReturn(Optional.empty());
        UpdateEmployeeDTO dto = new UpdateEmployeeDTO();

        // act
        this.employeeService.updateEmployee(1L, dto);

        // assert
        verify(this.repo).findById(1L);
        verify(this.mapper, never()).map(dto, new Employee());
        verify(this.repo, never()).saveAndFlush(any(Employee.class));
    }

    @Test
    public void update_whenEmployeeExists_UpdatesAndSavesEmployee() {
        // arrange
        Employee fakeEmployee = new Employee();
        fakeEmployee.setId(1L);
        fakeEmployee.setFirstName("Adam");

        UpdateEmployeeDTO dto = new UpdateEmployeeDTO();

        when(this.repo.findById(1L))
                .thenReturn(Optional.of(fakeEmployee));

        // act
        Optional<Employee> result = this.employeeService.updateEmployee(1L, dto);

        // assert
        verify(this.repo).findById(1L);
        verify(this.mapper).map(dto, fakeEmployee);
        verify(this.repo).saveAndFlush(fakeEmployee);

        assertTrue(result.isPresent());
    }

}
