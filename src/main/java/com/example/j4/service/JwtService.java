package com.example.j4.service;

import java.util.Date;

public interface JwtService {
    String generateToken(String username);
    boolean validateToken(String token, String username);
    String extractUsername(String token);
    Date extractExpiration(String token);
}
