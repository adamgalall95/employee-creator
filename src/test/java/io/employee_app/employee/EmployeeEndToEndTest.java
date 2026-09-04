package io.employee_app.employee;

import org.springframework.http.HttpStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.jdbc.Sql;

import io.employee_app.employee.entities.Employee;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

import java.time.LocalDate;
import java.util.HashMap;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(scripts = "/sql/cleanup.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class EmployeeEndToEndTest {
    @LocalServerPort
    private int port;
    private EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeEndToEndTest(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @BeforeEach
    public void setup() {
        RestAssured.port = this.port;
    }

    // get all employees
    @Test
    public void getAllEmployees_NoEmployeesInDB_ReturnOkAndEmptyArray() {
        given().when().get("/employees")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(0));
    }

    @Test
    public void getAllEmployees_EmployeesInDB_ReturnOkAndArrayOfEmployees() {
        // arrange
        Employee employee1 = new Employee();
        employee1.setFirstName("Ahmed");
        employee1.setMiddleName("Ali");
        employee1.setLastName("Hassan");
        employee1.setEmailAddress("ahmed@example.com");
        employee1.setMobileNumber("0412345678");
        employee1.setHomeAddress("123 Main Street");
        employee1.setContractType("Permanent");
        employee1.setStartDate(LocalDate.of(2026, 1, 1));
        employee1.setEmploymentType("Full-time");
        employee1.setHoursPerWeek(38.0);
        employee1.setEmploymentStatus("ACTIVE");

        employeeRepository.saveAndFlush(employee1);

        Employee employee2 = new Employee();
        employee2.setFirstName("John");
        employee2.setLastName("Smith");
        employee2.setEmailAddress("john@example.com");
        employee2.setMobileNumber("0498765432");
        employee2.setHomeAddress("456 King Street");
        employee2.setContractType("Contract");
        employee2.setStartDate(LocalDate.of(2026, 2, 1));
        employee2.setEndDate(LocalDate.of(2026, 12, 31));
        employee2.setEmploymentType("Full-time");
        employee2.setHoursPerWeek(38.0);
        employee2.setEmploymentStatus("ACTIVE");

        employeeRepository.saveAndFlush(employee2);

        given().when().get("/employees")
                .then().statusCode(HttpStatus.OK.value())
                .body("$", hasSize(2))
                .body("firstName", hasItems("Ahmed", "John"))
                .body(matchesJsonSchemaInClasspath("schemas/employee-list-schema.json"));
    }

    // get employee by id
    @Test
    public void getById_IdNotFound() {
        long id = 1;

        given().when().get("/employees/" + id)
                .then().statusCode(HttpStatus.NOT_FOUND.value())
                .body("message", equalTo("Employee with id 1 was not found"))
                .body("error", equalTo("Not Found"))
                .body(matchesJsonSchemaInClasspath("schemas/api-error-schema.json"));

    }

    @Test
    public void getById_InvalidId_BadRequest() {
        given().when().get("employees/hello")
                .then().log().body()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("error", matchesPattern("Bad Request"))
                .body(matchesJsonSchemaInClasspath("schemas/api-error-schema.json"));
    }

    @Test
    public void getById_ValidIdForExistingEmployee_Success() {

        Employee employee1 = new Employee();
        employee1.setFirstName("Ahmed");
        employee1.setMiddleName("Ali");
        employee1.setLastName("Hassan");
        employee1.setEmailAddress("ahmed@example.com");
        employee1.setMobileNumber("0412345678");
        employee1.setHomeAddress("123 Main Street");
        employee1.setContractType("Permanent");
        employee1.setStartDate(LocalDate.of(2026, 1, 1));
        employee1.setEmploymentType("Full-time");
        employee1.setHoursPerWeek(38.0);
        employee1.setEmploymentStatus("ACTIVE");

        employeeRepository.saveAndFlush(employee1);

        given()
                .when()
                .get("/employees/" + employee1.getId())
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("firstName", equalTo(employee1.getFirstName()))
                .body("lastName", equalTo(employee1.getLastName()))
                .body(matchesJsonSchemaInClasspath("schemas/employee-schema.json"));
    }

    // create employee
    @Test
    public void createEmployee_InvalidDto_BadRequest() {
        HashMap<String, String> data = new HashMap<>();
        data.put("firstName", "");
        data.put("lastName", "");

        given()
                .contentType(ContentType.JSON).body(data)
                .when().post("/employees")
                .then().log().body().statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createEmployee_NoBody_BadRequest() {

        given()
                .contentType(ContentType.JSON)
                .when().post("/employees")
                .then().log().body().statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createEmployee_ContractWithoutEndDate_UnprocessableContent() {

        HashMap<String, String> data = new HashMap<>();

        data.put("firstName", "Ahmed");
        data.put("middleName", "Ali");
        data.put("lastName", "Hassan");
        data.put("emailAddress", "ahmed@example.com");
        data.put("mobileNumber", "0412345678");
        data.put("homeAddress", "123 Main Street");
        data.put("contractType", "Contract");
        data.put("startDate", "2026-01-01");
        data.put("employmentType", "Full-time");
        data.put("hoursPerWeek", "38");

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/employees")
                .then()
                .log().body()
                .statusCode(HttpStatus.UNPROCESSABLE_CONTENT.value())
                .body("message",
                        equalTo("Contract employees must have an end date"))
                .body(matchesJsonSchemaInClasspath(
                        "schemas/api-error-schema.json"));
    }

    @Test
    public void createEmployee_ValidDto_Created() {

        HashMap<String, String> data = new HashMap<>();

        data.put("firstName", "Ahmed");
        data.put("middleName", "Ali");
        data.put("lastName", "Hassan");
        data.put("emailAddress", "ahmed@example.com");
        data.put("mobileNumber", "0412345678");
        data.put("homeAddress", "123 Main Street");
        data.put("contractType", "Permanent");
        data.put("startDate", "2026-01-01");
        data.put("employmentType", "Full-time");
        data.put("hoursPerWeek", "38");

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/employees")
                .then()
                .log().body()
                .statusCode(HttpStatus.CREATED.value())
                .body("firstName", equalTo("Ahmed"))
                .body("lastName", equalTo("Hassan"))
                .body("employmentStatus", equalTo("ACTIVE"))
                .body(matchesJsonSchemaInClasspath(
                        "schemas/employee-schema.json"));
    }

}
