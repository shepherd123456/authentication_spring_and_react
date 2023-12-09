package com.example.j4.service;

import com.example.j4.entity.RefreshToken;

public interface RefreshTokenService {
    RefreshToken createRefreshToken(String username);
    RefreshToken findRefreshTokenByToken(String token);

    RefreshToken findRefreshTokenByUsername(String username);
    boolean hasExpired(RefreshToken token);

    void deleteToken(RefreshToken refreshToken);
}
