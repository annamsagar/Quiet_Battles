package com.quietbattles.controller;

import com.quietbattles.dto.response.ChapterResponse;
import com.quietbattles.dto.response.ProductResponse;
import com.quietbattles.dto.response.SeriesResponse;
import com.quietbattles.service.PublicContentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public")
@Tag(name = "Public Storefront Content", description = "Public read-only endpoints delivering PUBLISHED editorial collections, stories and garments for the consumer storefront")
public class PublicContentController {

    private final PublicContentService publicContentService;

    public PublicContentController(PublicContentService publicContentService) {
        this.publicContentService = publicContentService;
    }

    @GetMapping("/series")
    @Operation(summary = "Get Public Series", description = "Retrieves all PUBLISHED fashion collections for storefront display")
    public ResponseEntity<List<SeriesResponse>> getPublicSeries() {
        return ResponseEntity.ok(publicContentService.getPublicSeries());
    }

    @GetMapping("/series/{slug}")
    @Operation(summary = "Get Public Series by Slug", description = "Retrieves a single PUBLISHED series collection by its slug")
    public ResponseEntity<SeriesResponse> getPublicSeriesBySlug(
            @Parameter(description = "Unique slug of the published series (e.g. 'series-01')")
            @PathVariable String slug) {
        return ResponseEntity.ok(publicContentService.getPublicSeriesBySlug(slug));
    }

    @GetMapping("/series/{slug}/chapters")
    @Operation(summary = "Get Public Chapters in Series", description = "Retrieves all PUBLISHED storytelling chapters for a series in display order")
    public ResponseEntity<List<ChapterResponse>> getPublicChaptersBySeries(
            @Parameter(description = "Unique slug of the published series")
            @PathVariable String slug) {
        return ResponseEntity.ok(publicContentService.getPublicChaptersBySeriesSlug(slug));
    }

    @GetMapping("/chapters/{seriesSlug}/{chapterSlug}")
    @Operation(summary = "Get Public Chapter by Slug", description = "Retrieves a single PUBLISHED chapter with linked luxury product reference")
    public ResponseEntity<ChapterResponse> getPublicChapter(
            @Parameter(description = "Unique slug of the parent series") @PathVariable String seriesSlug,
            @Parameter(description = "Unique slug of the narrative chapter") @PathVariable String chapterSlug) {
        return ResponseEntity.ok(publicContentService.getPublicChapter(seriesSlug, chapterSlug));
    }

    @GetMapping("/products")
    @Operation(summary = "Get Public Products", description = "Retrieves all PUBLISHED products with image galleries and sizes, with optional name search")
    public ResponseEntity<List<ProductResponse>> getPublicProducts(
            @Parameter(description = "Optional search query to filter products by name")
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(publicContentService.getPublicProducts(search));
    }

    @GetMapping("/products/{slug}")
    @Operation(summary = "Get Public Product by Slug", description = "Retrieves a single PUBLISHED product by slug with images and available sizes")
    public ResponseEntity<ProductResponse> getPublicProductBySlug(
            @Parameter(description = "Unique slug of the published garment")
            @PathVariable String slug) {
        return ResponseEntity.ok(publicContentService.getPublicProductBySlug(slug));
    }
}

