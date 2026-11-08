package com.quietbattles;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class QuietBattlesApplication {

    private static final Logger log = LoggerFactory.getLogger(QuietBattlesApplication.class);

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(QuietBattlesApplication.class);
        Environment env = app.run(args).getEnvironment();

        String port = env.getProperty("server.port", "8081");
        String contextPath = env.getProperty("server.servlet.context-path", "");
        
        log.info("\n------------------------------------------------------------------");
        log.info("QUIET BATTLES™ Backend Service Started Successfully!");
        log.info("Application : {}", env.getProperty("spring.application.name", "quiet-battles-backend"));
        log.info("Local API   : http://localhost:{}{}", port, contextPath);
        log.info("Health Check: http://localhost:{}{}/api/v1/health", port, contextPath);
        log.info("Swagger UI  : http://localhost:{}{}/swagger-ui/index.html", port, contextPath);
        log.info("OpenAPI Spec: http://localhost:{}{}/v3/api-docs", port, contextPath);
        log.info("Database URL: {}", env.getProperty("spring.datasource.url"));
        log.info("Tagline     : WEAR YOUR BATTLES.");
        log.info("------------------------------------------------------------------\n");
    }
}
