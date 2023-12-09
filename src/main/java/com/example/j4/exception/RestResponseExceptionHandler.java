package com.example.j4.exception;

import com.example.j4.dtoout.ErrorDtoout;
import io.jsonwebtoken.ExpiredJwtException;
import org.apache.coyote.Response;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class RestResponseExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ErrorDtoout> handleRegisterUsernameDuplication(DataIntegrityViolationException e){
        ErrorDtoout errorDtoout = new ErrorDtoout(
                HttpStatus.CONFLICT.value(),
                e.getMessage(),
                new Date()
        );
        return new ResponseEntity<>(errorDtoout, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorDtoout> handleRefreshTokenExpired(RefreshTokenExpiredException e){
        ErrorDtoout errorDtoout = new ErrorDtoout(
                HttpStatus.BAD_REQUEST.value(),
                e.getMessage(),
                new Date()
        );
        return new ResponseEntity<>(errorDtoout, HttpStatus.BAD_REQUEST);
    }
}
