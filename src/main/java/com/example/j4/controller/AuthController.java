package com.example.j4.controller;

import com.example.j4.dtoin.LoginDtoin;
import com.example.j4.dtoin.RegisterDtoin;
import com.example.j4.dtoout.LoginDtoout;
import com.example.j4.entity.RefreshToken;
import com.example.j4.exception.RefreshTokenExpiredException;
import com.example.j4.service.AuthService;
import com.example.j4.service.JwtService;
import com.example.j4.service.RefreshTokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class AuthController {
    private AuthenticationManager authenticationManager;
    private AuthService authService;
    private JwtService jwtService;
    private RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public void register(@RequestBody RegisterDtoin registerDtoin) {
        authService.createUserByRegistration(registerDtoin);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDtoout> login(@RequestBody LoginDtoin loginDtoIn) {
        Authentication authentication = authenticationManager.authenticate(
                 new UsernamePasswordAuthenticationToken(
                         loginDtoIn.username,
                         loginDtoIn.password
                 )
        );
        if(authentication.isAuthenticated()){
            return ResponseEntity.ok(authService.getUserByLogin(loginDtoIn));
        } else {
            throw new UsernameNotFoundException("invalid user request");
        }
    }

    @GetMapping("/refresh")
        public ResponseEntity<String> refresh(@RequestHeader("Refresh-Token") String rtoken) throws RefreshTokenExpiredException {
        RefreshToken refreshToken = refreshTokenService.findRefreshTokenByToken(rtoken);
        if(refreshTokenService.hasExpired(refreshToken)){
            throw new RefreshTokenExpiredException("refresh token has expired. Please login again to create new one");
        }
        String newJwt = jwtService.generateToken(refreshToken.getUser().getUsername());
        return ResponseEntity.ok(newJwt);
    }
}
