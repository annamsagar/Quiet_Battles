package com.quietbattles;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class QuietBattlesApplicationTests {

    @Test
    void contextLoads() {
        // Confirms that the Spring ApplicationContext loads without error
    }
}

