package com.quietbattles.controller;

import com.quietbattles.dto.request.LoginRequest;
import com.quietbattles.dto.response.LoginResponse;
import com.quietbattles.dto.response.UserResponse;
import com.quietbattles.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "Endpoints for administrator authentication and session verification")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(summary = "Admin Login", description = "Authenticates an administrator with email and password, returning a JWT bearer token")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @Operation(
            summary = "Get Current Authenticated Admin",
            description = "Retrieves profile and permissions for the currently authenticated administrator",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponse> getCurrentUser(Principal principal) {
        UserResponse response = authService.getCurrentUser(principal.getName());
        return ResponseEntity.ok(response);
    }
}

