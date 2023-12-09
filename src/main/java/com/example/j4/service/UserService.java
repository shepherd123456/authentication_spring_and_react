package com.example.j4.service;

import com.example.j4.dtoout.UserDtoout;
import com.example.j4.entity.User;

import java.util.List;

public interface UserService {
    User getUserById(Long id);
    User getUserByUsername(String username);
    List<UserDtoout> getAllUsers();
    User createUser(User user);
}
