package com.quietbattles.config;

import com.quietbattles.entity.User;
import com.quietbattles.enums.UserRole;
import com.quietbattles.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Development-only database seeder for initial administrator account.
 * Creates an admin account only if one does not already exist.
 * Reads credentials from environment variables / application.properties.
 * Hashes passwords using BCrypt and never stores or logs plain-text secrets.
 */
@Component
public class AdminUserSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminUserSeeder.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.seed.enabled:true}")
    private boolean seedEnabled;

    @Value("${admin.seed.email:admin@quietbattles.demo}")
    private String adminEmail;

    @Value("${admin.seed.username:admin}")
    private String adminUsername;

    @Value("${admin.seed.password:QuietBattles@2026}")
    private String adminPassword;

    public AdminUserSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (!seedEnabled) {
            log.info("Admin seeding is disabled.");
            return;
        }

        if (userRepository.existsByEmail(adminEmail)) {
            log.info("Admin account already exists for email: {}. Skipping seeding.", adminEmail);
            return;
        }

        User admin = new User(
                adminUsername,
                adminEmail,
                passwordEncoder.encode(adminPassword),
                UserRole.ADMIN
        );

        userRepository.save(admin);
        log.info("Initial development admin account successfully seeded for email: '{}' (Username: '{}').",
                adminEmail, adminUsername);
    }
}

