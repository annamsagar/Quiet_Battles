package com.quietbattles.service.impl;

import com.quietbattles.dto.request.LoginRequest;
import com.quietbattles.dto.response.LoginResponse;
import com.quietbattles.dto.response.UserResponse;
import com.quietbattles.entity.User;
import com.quietbattles.exception.ResourceNotFoundException;
import com.quietbattles.repository.UserRepository;
import com.quietbattles.security.CustomUserDetailsService;
import com.quietbattles.security.JwtService;
import com.quietbattles.service.AuthService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        // Authenticate admin credentials - do not reveal whether email or password was wrong
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!user.isEnabled()) {
            throw new DisabledException("Admin user account is disabled");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole().name());
        extraClaims.put("username", user.getUsername());

        String jwt = jwtService.generateToken(extraClaims, userDetails);

        return new LoginResponse(
                jwt,
                jwtService.getExpirationTime(),
                user.getEmail(),
                user.getUsername(),
                user.getRole().name()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String emailOrUsername) {
        User user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new ResourceNotFoundException("User", "email/username", emailOrUsername));

        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.isEnabled(),
                user.getCreatedAt()
        );
    }
}

