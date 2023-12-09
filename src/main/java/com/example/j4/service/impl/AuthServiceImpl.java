package com.example.j4.service.impl;

import com.example.j4.dtoin.LoginDtoin;
import com.example.j4.dtoin.RegisterDtoin;
import com.example.j4.dtoout.LoginDtoout;
import com.example.j4.entity.RefreshToken;
import com.example.j4.entity.Role;
import com.example.j4.entity.User;
import com.example.j4.service.*;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private PasswordEncoder passwordEncoder;

    private JwtService jwtService;
    private RefreshTokenService refreshTokenService;
    private UserService userService;
    private RoleService roleService;

    @Override
    public LoginDtoout getUserByLogin(LoginDtoin loginDtoin) {
        String username = loginDtoin.username;

        RefreshToken refreshToken = refreshTokenService.findRefreshTokenByUsername(username);
        if(refreshTokenService.hasExpired(refreshToken)){
            refreshTokenService.deleteToken(refreshToken);
            refreshToken = refreshTokenService.createRefreshToken(username);
        }

        User u = userService.getUserByUsername(username);
        return new LoginDtoout(
                jwtService.generateToken(u.getUsername()),
                refreshToken.getToken(),
                u.getId(),
                u.getUsername(),
                u.getRoles().stream().map(Role::getName).collect(Collectors.toList())
        );
    }

    @Override
    public void createUserByRegistration(RegisterDtoin registerDtoin) {
        User u = userService.createUser(new User(
                null,
                registerDtoin.username,
                passwordEncoder.encode(registerDtoin.password),
                Collections.singletonList(roleService.getByName("USER"))
        ));
        refreshTokenService.createRefreshToken(u.getUsername());
    }
}
