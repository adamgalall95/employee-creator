package io.employee_app.employee.dtos;

import java.time.LocalDate;

public class UpdateEmployeeDTO {
    // Personal Information
    private String firstName;

    private String middleName;

    private String lastName;

    // Contact Information
    private String emailAddress;

    private String mobileNumber;

    private String homeAddress;

    // Employment Information
    private String contractType;

    private LocalDate startDate;

    private LocalDate endDate;

    private String employmentType;

    private Double hoursPerWeek;

    public UpdateEmployeeDTO() {
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
