package com.example.j4.dtoout;

import lombok.AllArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class ErrorDtoout {
    public int statusCode;
    public String message;
    public Date time;
}
