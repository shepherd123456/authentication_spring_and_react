package com.example.j4.exception;

public class RefreshTokenExpiredException extends Exception{
    public RefreshTokenExpiredException(String message) {
        super(message);
    }
}
