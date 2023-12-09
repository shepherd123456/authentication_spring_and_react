package com.example.j4.repository;

import com.example.j4.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByToken(String token);

    @Query("select t from RefreshToken t where t.user.username = ?1")
    RefreshToken findByUsername(String username);
}
