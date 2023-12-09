package com.example.j4.dtoout;

import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class LoginDtoout {
    public String accessToken;
    public String refreshToken;
    public Long id;
    public String username;
    public List<String> roles;
}
