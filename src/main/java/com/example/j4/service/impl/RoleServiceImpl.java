package com.example.j4.service.impl;

import com.example.j4.entity.Role;
import com.example.j4.repository.RoleRepository;
import com.example.j4.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;
    @Override
    public Role getByName(String name) {
        return roleRepository.findByName(name);
    }
}
