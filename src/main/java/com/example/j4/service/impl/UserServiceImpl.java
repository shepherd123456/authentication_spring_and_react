package com.example.j4.service.impl;

import com.example.j4.dtoout.UserDtoout;
import com.example.j4.entity.User;
import com.example.j4.repository.UserRepository;
import com.example.j4.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<UserDtoout> getAllUsers() {
        return userRepository.findAll()
                .stream().map(user -> new UserDtoout(user.getId(), user.getUsername())).collect(Collectors.toList());
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

}
