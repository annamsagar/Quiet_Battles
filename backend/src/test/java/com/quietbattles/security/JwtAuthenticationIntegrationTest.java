package com.quietbattles.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.quietbattles.dto.request.LoginRequest;
import com.quietbattles.dto.request.SeriesRequest;
import com.quietbattles.dto.response.LoginResponse;
import com.quietbattles.enums.ContentStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class JwtAuthenticationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Complete JWT Security Flow: Login, Token Verification, Protected Route Guarding & Public Access")
    void testJwtAuthenticationAndRoleAuthorization() throws Exception {
        // 1. Valid Admin Login
        LoginRequest validLogin = new LoginRequest("admin@quietbattles.demo", "QuietBattles@2026");

        MvcResult loginResult = mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validLogin)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.role").value("ADMIN"))
                .andExpect(jsonPath("$.email").value("admin@quietbattles.demo"))
                .andReturn();

        LoginResponse loginResponse = objectMapper.readValue(
                loginResult.getResponse().getContentAsString(), LoginResponse.class);
        String jwtToken = loginResponse.getToken();

        // 2. Invalid Admin Login -> 401 Unauthorized
        LoginRequest invalidLogin = new LoginRequest("admin@quietbattles.demo", "WrongPassword!999");
        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidLogin)))
                .andExpect(status().isUnauthorized());

        // 3. Access /api/v1/auth/me WITHOUT token -> 401 Unauthorized
        mockMvc.perform(get("/api/v1/auth/me"))
                .andExpect(status().isUnauthorized());

        // 4. Access /api/v1/auth/me WITH valid token -> 200 OK
        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("admin@quietbattles.demo"))
                .andExpect(jsonPath("$.role").value("ADMIN"))
                .andExpect(jsonPath("$.enabled").value(true));

        // 5. Access Protected Admin Route (/api/v1/series) WITHOUT token -> 401 Unauthorized
        SeriesRequest newSeries = new SeriesRequest(
                "SECURITY TEST COLLECTION",
                "security-test-collection",
                "Testing authentication guard.",
                null,
                ContentStatus.PUBLISHED
        );

        mockMvc.perform(post("/api/v1/series")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newSeries)))
                .andExpect(status().isUnauthorized());

        // 6. Access Protected Admin Route WITH valid token -> 201 Created
        mockMvc.perform(post("/api/v1/series")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newSeries)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.slug").value("security-test-collection"));

        // 7. Access Public Storefront Route (/api/v1/public/series) WITHOUT token -> 200 OK
        mockMvc.perform(get("/api/v1/public/series"))
                .andExpect(status().isOk());

        // 8. Access with Malformed / Tampered Token -> 401 Unauthorized
        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer invalid.tampered.token"))
                .andExpect(status().isUnauthorized());
    }
}

