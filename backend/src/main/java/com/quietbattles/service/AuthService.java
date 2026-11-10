package com.quietbattles.service;

import com.quietbattles.dto.request.LoginRequest;
import com.quietbattles.dto.response.LoginResponse;
import com.quietbattles.dto.response.UserResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    UserResponse getCurrentUser(String emailOrUsername);
}

