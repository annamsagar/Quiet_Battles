package com.quietbattles.controller;

import com.quietbattles.dto.HealthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "System Health", description = "Operational monitoring and service uptime endpoints")
public class HealthController {

    @GetMapping
    @Operation(
            summary = "Service Health Check",
            description = "Confirms that the QUIET BATTLES Spring Boot backend application is running and responsive."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Backend service is operational",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = HealthResponse.class)
                    )
            )
    })
    public ResponseEntity<HealthResponse> checkHealth() {
        HealthResponse response = new HealthResponse(
                "UP",
                "QUIET BATTLES BACKEND",
                "Backend is running successfully"
        );
        return ResponseEntity.ok(response);
    }
}
