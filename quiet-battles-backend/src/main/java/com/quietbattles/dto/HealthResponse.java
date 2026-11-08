package com.quietbattles.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Service health check response payload")
public class HealthResponse {

    @Schema(description = "Current operational status", example = "UP")
    private String status;

    @Schema(description = "Application moniker", example = "QUIET BATTLES BACKEND")
    private String application;

    @Schema(description = "Descriptive confirmation message", example = "Backend is running successfully")
    private String message;

    public HealthResponse() {
    }

    public HealthResponse(String status, String application, String message) {
        this.status = status;
        this.application = application;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
