package com.quietbattles.entity;

import com.quietbattles.enums.ContentStatus;
import com.quietbattles.enums.UserRole;
import com.quietbattles.repository.ChapterRepository;
import com.quietbattles.repository.ProductImageRepository;
import com.quietbattles.repository.ProductRepository;
import com.quietbattles.repository.SeriesRepository;
import com.quietbattles.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class EntityMappingIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SeriesRepository seriesRepository;

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Test
    @DisplayName("Should successfully persist and retrieve a User entity with audit timestamps")
    void testUserEntityPersistence() {
        User admin = new User(
                "testadmin",
                "testadmin@quietbattles.com",
                "$2a$12$eX4mPLeH4sH8V4l1D4T...",
                UserRole.ADMIN
        );

        User savedUser = userRepository.saveAndFlush(admin);

        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getUsername()).isEqualTo("testadmin");
        assertThat(savedUser.getEmail()).isEqualTo("testadmin@quietbattles.com");
        assertThat(savedUser.getRole()).isEqualTo(UserRole.ADMIN);
        assertThat(savedUser.isEnabled()).isTrue();
        assertThat(savedUser.getCreatedAt()).isNotNull();
        assertThat(savedUser.getUpdatedAt()).isNotNull();

        Optional<User> found = userRepository.findByUsername("testadmin");
        assertThat(found).isPresent();
    }

    @Test
    @DisplayName("Should successfully persist Series with bidirectional relationships to Chapters and Products")
    void testSeriesChapterProductMapping() {
        // 1. Create Series
        Series series = new Series(
                "SERIES 01 - THE GENTLE ARMOR™",
                "series-01",
                "An exploration of resilience, softness and strength.",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200",
                ContentStatus.PUBLISHED
        );
        Series savedSeries = seriesRepository.saveAndFlush(series);
        assertThat(savedSeries.getId()).isNotNull();

        // 2. Create Product with ElementCollection sizes
        Product jacket = new Product(
                "The Gentle Armor Oversized Trench Coat",
                "the-gentle-armor-oversized-trench-coat",
                "A structural trench crafted from double-faced Japanese wool blend.",
                new BigDecimal("680.00"),
                "Outerwear",
                12,
                ContentStatus.PUBLISHED
        );
        jacket.setSeries(savedSeries);
        jacket.setSizes(Set.of("S", "M", "L", "XL"));

        // Add Product Images
        ProductImage img1 = new ProductImage(
                "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000",
                "Front view",
                1
        );
        jacket.addImage(img1);

        Product savedProduct = productRepository.saveAndFlush(jacket);
        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getSizes()).contains("S", "M", "L", "XL");
        assertThat(savedProduct.getImages()).hasSize(1);
        assertThat(savedProduct.getPrice()).isEqualByComparingTo(new BigDecimal("680.00"));

        // 3. Create Chapter referencing Series and Product
        Chapter chapter1 = new Chapter(
                "The Silence",
                "the-silence",
                1,
                "Introspection & stillness",
                "Before the armor is worn, there is stillness.",
                "In the quiet space between thoughts, identity takes form.",
                "Full narrative editorial story of The Silence.",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800",
                ContentStatus.PUBLISHED
        );
        chapter1.setSeries(savedSeries);
        chapter1.setProduct(savedProduct);

        Chapter savedChapter = chapterRepository.saveAndFlush(chapter1);
        assertThat(savedChapter.getId()).isNotNull();
        assertThat(savedChapter.getChapterNumber()).isEqualTo(1);
        assertThat(savedChapter.getSeries().getId()).isEqualTo(savedSeries.getId());
        assertThat(savedChapter.getProduct().getId()).isEqualTo(savedProduct.getId());

        // Verify retrieval queries
        Optional<Chapter> foundChapter = chapterRepository.findBySlug("the-silence");
        assertThat(foundChapter).isPresent();
        assertThat(foundChapter.get().getProduct().getName()).isEqualTo("The Gentle Armor Oversized Trench Coat");

        Optional<Chapter> foundByNumber = chapterRepository.findBySeriesIdAndChapterNumber(savedSeries.getId(), 1);
        assertThat(foundByNumber).isPresent();
    }
}

