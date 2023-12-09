package com.example.j4.service.impl;

import com.example.j4.entity.RefreshToken;
import com.example.j4.repository.RefreshTokenRepository;
import com.example.j4.service.RefreshTokenService;
import com.example.j4.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private RefreshTokenRepository refreshTokenRepository;

    private UserService userService;
//    private static final long REFRESH_TOKEN_DURATION = 10 * 60 * 1000;
    private static final long REFRESH_TOKEN_DURATION = 10 * 1000;

    @Override
    public RefreshToken createRefreshToken(String username) {
        return refreshTokenRepository.save(new RefreshToken(
                null,
                UUID.randomUUID().toString(),
                Instant.now().plusMillis(REFRESH_TOKEN_DURATION),
                userService.getUserByUsername(username)
        ));
    }

    @Override
    public RefreshToken findRefreshTokenByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    public RefreshToken findRefreshTokenByUsername(String username) {
        return refreshTokenRepository.findByUsername(username);
    }


    @Override
    public boolean hasExpired(RefreshToken token) {
        return token.getExpiryDate().compareTo(Instant.now()) < 0;
    }

    @Override
    public void deleteToken(RefreshToken refreshToken) {
        refreshTokenRepository.delete(refreshToken);
    }
}
