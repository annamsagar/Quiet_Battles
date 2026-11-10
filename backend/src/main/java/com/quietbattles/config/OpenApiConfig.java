package com.quietbattles.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Value("${server.port:8081}")
    private String serverPort;

    private static final String SECURITY_SCHEME_NAME = "Bearer Authentication";

    @Bean
    public OpenAPI quietBattlesOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("QUIET BATTLES API")
                        .description("REST API for managing the QUIET BATTLES fashion brand website, collections, chapters and products.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("QUIET BATTLES Engineering Atelier")
                                .email("atelier@quietbattles.demo")
                                .url("https://quietbattles.demo"))
                        .license(new License()
                                .name("Proprietary")
                                .url("https://quietbattles.demo/license")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:" + serverPort)
                                .description("Local Development Server")
                ))
                // Pre-configure JWT Bearer scheme in OpenAPI components so Swagger shows the Authorize lock
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME, new SecurityScheme()
                                .name(SECURITY_SCHEME_NAME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Enter JWT Bearer token once authenticated (Phase 3 integration)")));
    }
}

