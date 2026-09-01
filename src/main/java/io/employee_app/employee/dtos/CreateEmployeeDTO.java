package io.employee_app.employee.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CreateEmployeeDTO {

    // Personal Information

    @NotBlank
    private String firstName;

    private String middleName;

    @NotBlank
    private String lastName;

    // Contact Information

    @NotBlank
    @Email
    private String emailAddress;

    @NotBlank
    @Pattern(regexp = "^04\\d{8}$")
    private String mobileNumber;

    @NotBlank
    @Size(min = 5)
    private String homeAddress;

    // Employment Information

    @NotBlank
    private String contractType;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    @NotBlank
    private String employmentType;

    @NotNull
    @Min(1)
    @Max(38)
    private Double hoursPerWeek;

    public CreateEmployeeDTO() {
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public String getContractType() {
        return contractType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public Double getHoursPerWeek() {
        return hoursPerWeek;
    }
}