package io.employee_app.common.exceptions;

public class UnprocessableContentException extends RuntimeException {

    public UnprocessableContentException(String message) {
        super(message);
    }
}
