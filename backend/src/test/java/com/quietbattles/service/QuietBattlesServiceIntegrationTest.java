package com.quietbattles.service;

import com.quietbattles.dto.request.ChapterRequest;
import com.quietbattles.dto.request.ProductImageRequest;
import com.quietbattles.dto.request.ProductRequest;
import com.quietbattles.dto.request.SeriesRequest;
import com.quietbattles.dto.response.ChapterResponse;
import com.quietbattles.dto.response.ProductImageResponse;
import com.quietbattles.dto.response.ProductResponse;
import com.quietbattles.dto.response.SeriesResponse;
import com.quietbattles.enums.ContentStatus;
import com.quietbattles.exception.BadRequestException;
import com.quietbattles.exception.DuplicateResourceException;
import com.quietbattles.exception.ResourceNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class QuietBattlesServiceIntegrationTest {

    @Autowired
    private SeriesService seriesService;

    @Autowired
    private ChapterService chapterService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductImageService productImageService;

    @Test
    @DisplayName("Should successfully create, read and enforce unique slug on Series")
    void testSeriesServiceOperationsAndUniqueSlug() {
        SeriesRequest request = new SeriesRequest(
                "SERIES 02 - THE SILENT WARRIOR",
                "series-02-silent-warrior",
                "A study of perseverance through monolithic minimalism.",
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
                ContentStatus.PUBLISHED
        );

        SeriesResponse created = seriesService.createSeries(request);
        assertThat(created.getId()).isNotNull();
        assertThat(created.getSlug()).isEqualTo("series-02-silent-warrior");

        SeriesResponse fetched = seriesService.getSeriesBySlug("series-02-silent-warrior");
        assertThat(fetched.getTitle()).isEqualTo("SERIES 02 - THE SILENT WARRIOR");

        // Rule 1: Duplicate slug check
        SeriesRequest duplicateRequest = new SeriesRequest(
                "DUPLICATE SERIES",
                "series-02-silent-warrior",
                "Duplicate description",
                null,
                ContentStatus.DRAFT
        );

        assertThatThrownBy(() -> seriesService.createSeries(duplicateRequest))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessageContaining("already exists with slug");
    }

    @Test
    @DisplayName("Should enforce Rule 9: Prevent accidental deletion of Series when chapters or products exist")
    void testSeriesDeletionPreventionWhenChildrenExist() {
        // 1. Create Series
        SeriesRequest sReq = new SeriesRequest(
                "SERIES 03 - GENTLE ARMOR",
                "series-03-gentle-armor",
                "Exploration of protection and vulnerability.",
                null,
                ContentStatus.PUBLISHED
        );
        SeriesResponse series = seriesService.createSeries(sReq);

        // 2. Add Chapter to this Series
        ChapterRequest cReq = new ChapterRequest(
                "Chapter One: Stillness",
                "chapter-one-stillness",
                1,
                "Stillness",
                "Quiet beginnings.",
                "Silence precedes the storm.",
                "Full story narrative...",
                null,
                null,
                1,
                ContentStatus.PUBLISHED,
                series.getId(),
                null
        );
        chapterService.createChapter(cReq);

        // Rule 9: Series cannot be deleted while containing chapters
        assertThatThrownBy(() -> seriesService.deleteSeries(series.getId()))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("because it still contains 1 chapter(s)");
    }

    @Test
    @DisplayName("Should enforce Product business rules: positive price, valid sizes, and Series existence")
    void testProductBusinessRulesValidation() {
        SeriesRequest sReq = new SeriesRequest(
                "SERIES 04 - THE MONOLITH",
                "series-04-monolith",
                "Monolithic architectural garments.",
                null,
                ContentStatus.PUBLISHED
        );
        SeriesResponse series = seriesService.createSeries(sReq);

        // 1. Valid Product Creation
        ProductRequest validProductReq = new ProductRequest(
                "Architectural Heavyweight Trench Coat",
                "architectural-heavyweight-trench",
                "Double-faced heavyweight luxury wool.",
                new BigDecimal("850.00"),
                "Outerwear",
                15,
                Set.of("S", "M", "L", "XL"),
                ContentStatus.PUBLISHED,
                series.getId()
        );

        ProductResponse product = productService.createProduct(validProductReq);
        assertThat(product.getId()).isNotNull();
        assertThat(product.getPrice()).isEqualByComparingTo(new BigDecimal("850.00"));
        assertThat(product.getAvailableSizes()).contains("S", "M", "L", "XL");

        // 2. Rule 7: Negative / Zero Price check
        ProductRequest invalidPriceReq = new ProductRequest(
                "Free Coat",
                "free-coat",
                "Invalid price item",
                new BigDecimal("0.00"),
                "Outerwear",
                5,
                Set.of("M", "L"),
                ContentStatus.DRAFT,
                series.getId()
        );
        assertThatThrownBy(() -> productService.createProduct(invalidPriceReq))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Product price must be greater than zero");

        // 3. Rule 7: Negative Stock check
        ProductRequest invalidStockReq = new ProductRequest(
                "Negative Stock Garment",
                "negative-stock-garment",
                "Description",
                new BigDecimal("120.00"),
                "Tops",
                -3,
                Set.of("M"),
                ContentStatus.DRAFT,
                series.getId()
        );
        assertThatThrownBy(() -> productService.createProduct(invalidStockReq))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Stock quantity cannot be negative");

        // 4. Invalid size check
        ProductRequest invalidSizeReq = new ProductRequest(
                "Invalid Size Hoodie",
                "invalid-size-hoodie",
                "Description",
                new BigDecimal("220.00"),
                "Hoodies",
                10,
                Set.of("M", "XXXXL"),
                ContentStatus.DRAFT,
                series.getId()
        );
        assertThatThrownBy(() -> productService.createProduct(invalidSizeReq))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Invalid size: 'XXXXL'");

        // 5. Non-existent Series
        ProductRequest orphanProductReq = new ProductRequest(
                "Orphan Jacket",
                "orphan-jacket",
                "Description",
                new BigDecimal("340.00"),
                "Jackets",
                5,
                Set.of("L"),
                ContentStatus.DRAFT,
                999999L
        );
        assertThatThrownBy(() -> productService.createProduct(orphanProductReq))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Series not found with id: '999999'");
    }

    @Test
    @DisplayName("Should enforce Chapter business rules: unique chapter number per Series and optional product reference")
    void testChapterBusinessRules() {
        SeriesRequest sReq = new SeriesRequest(
                "SERIES 05 - REFLECTION",
                "series-05-reflection",
                "Exploring inward quietude.",
                null,
                ContentStatus.PUBLISHED
        );
        SeriesResponse series = seriesService.createSeries(sReq);

        ProductRequest pReq = new ProductRequest(
                "Reflective Minimalist Hoodie",
                "reflective-minimalist-hoodie",
                "Heavyweight French terry.",
                new BigDecimal("280.00"),
                "Hoodies",
                20,
                Set.of("M", "L", "XL"),
                ContentStatus.PUBLISHED,
                series.getId()
        );
        ProductResponse product = productService.createProduct(pReq);

        // 1. Create Chapter 1 linked to Product
        ChapterRequest c1Req = new ChapterRequest(
                "Chapter 01: The Mirror",
                "chapter-01-the-mirror",
                1,
                "Introspection",
                "Facing oneself.",
                "In quiet spaces, truth speaks.",
                "Story content...",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae",
                null,
                1,
                ContentStatus.PUBLISHED,
                series.getId(),
                product.getId()
        );
        ChapterResponse chapter1 = chapterService.createChapter(c1Req);
        assertThat(chapter1.getId()).isNotNull();
        assertThat(chapter1.getProductId()).isEqualTo(product.getId());
        assertThat(chapter1.getSeriesTitle()).isEqualTo("SERIES 05 - REFLECTION");

        // 2. Rule 6: Duplicate chapter number within same series
        ChapterRequest duplicateNumReq = new ChapterRequest(
                "Another Chapter 1",
                "another-chapter-1",
                1, // Duplicate number
                "Theme",
                "Desc",
                "Quote",
                "Content",
                null,
                null,
                1,
                ContentStatus.DRAFT,
                series.getId(),
                null
        );
        assertThatThrownBy(() -> chapterService.createChapter(duplicateNumReq))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessageContaining("Chapter number 1 already exists within Series");

        // 3. Query chapter by chapter slug and series slug
        ChapterResponse retrieved = chapterService.getChapterBySlugAndSeriesSlug(
                "chapter-01-the-mirror",
                "series-05-reflection"
        );
        assertThat(retrieved.getTitle()).isEqualTo("Chapter 01: The Mirror");
        assertThat(retrieved.getSeriesId()).isEqualTo(series.getId());
    }

    @Test
    @DisplayName("Should successfully add, update and query product images")
    void testProductImageServiceOperations() {
        SeriesRequest sReq = new SeriesRequest(
                "SERIES 06 - GALLERY",
                "series-06-gallery",
                "Gallery collection.",
                null,
                ContentStatus.PUBLISHED
        );
        SeriesResponse series = seriesService.createSeries(sReq);

        ProductRequest pReq = new ProductRequest(
                "Gallery Oversized Cardigan",
                "gallery-oversized-cardigan",
                "Alpaca blend knit.",
                new BigDecimal("490.00"),
                "Knitwear",
                8,
                Set.of("S", "M", "L"),
                ContentStatus.PUBLISHED,
                series.getId()
        );
        ProductResponse product = productService.createProduct(pReq);

        // Add Image
        ProductImageRequest imgReq = new ProductImageRequest(
                "https://images.unsplash.com/photo-1544441893-675973e31985",
                "Front lookbook editorial",
                1
        );
        ProductImageResponse addedImage = productImageService.addImage(product.getId(), imgReq);
        assertThat(addedImage.getId()).isNotNull();
        assertThat(addedImage.getProductId()).isEqualTo(product.getId());
        assertThat(addedImage.getDisplayOrder()).isEqualTo(1);

        List<ProductImageResponse> images = productImageService.getImagesByProduct(product.getId());
        assertThat(images).hasSize(1);
        assertThat(images.get(0).getImageUrl()).isEqualTo("https://images.unsplash.com/photo-1544441893-675973e31985");

        // Update Image
        ProductImageRequest updateReq = new ProductImageRequest(
                "https://images.unsplash.com/photo-1544441893-675973e31985?w=1200",
                "Updated alt text",
                2
        );
        ProductImageResponse updated = productImageService.updateImage(product.getId(), addedImage.getId(), updateReq);
        assertThat(updated.getDisplayOrder()).isEqualTo(2);

        // Mismatched Product ID check
        assertThatThrownBy(() -> productImageService.updateImage(999999L, addedImage.getId(), updateReq))
                .isInstanceOf(ResourceNotFoundException.class);

        // Delete Image
        productImageService.deleteImage(product.getId(), addedImage.getId());
        assertThat(productImageService.getImagesByProduct(product.getId())).isEmpty();
    }
}

