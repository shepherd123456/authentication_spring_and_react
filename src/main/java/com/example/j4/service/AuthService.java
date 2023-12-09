package com.example.j4.service;

import com.example.j4.dtoin.LoginDtoin;
import com.example.j4.dtoin.RegisterDtoin;
import com.example.j4.dtoout.LoginDtoout;

public interface AuthService {
    LoginDtoout getUserByLogin(LoginDtoin loginDtoin);
    void createUserByRegistration(RegisterDtoin registerDtoin);
}
