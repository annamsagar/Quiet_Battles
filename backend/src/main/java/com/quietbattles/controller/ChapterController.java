package com.quietbattles.controller;

import com.quietbattles.dto.request.ChapterRequest;
import com.quietbattles.dto.response.ChapterResponse;
import com.quietbattles.service.ChapterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chapters")
@Tag(name = "Chapter Management", description = "Endpoints for administering QUIET BATTLES™ storytelling narrative chapters")
public class ChapterController {

    private final ChapterService chapterService;

    public ChapterController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create Chapter", description = "Creates a new storytelling narrative chapter within a Series")
    public ResponseEntity<ChapterResponse> createChapter(@Valid @RequestBody ChapterRequest request) {
        ChapterResponse response = chapterService.createChapter(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get All Chapters", description = "Retrieves all chapters across all series collections")
    public ResponseEntity<List<ChapterResponse>> getAllChapters() {
        return ResponseEntity.ok(chapterService.getAllChapters());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Chapter by ID", description = "Retrieves a specific narrative chapter by its numerical ID")
    public ResponseEntity<ChapterResponse> getChapterById(
            @Parameter(description = "Primary key ID of the chapter") @PathVariable Long id) {
        return ResponseEntity.ok(chapterService.getChapterById(id));
    }

    @GetMapping("/slug/{seriesSlug}/{chapterSlug}")
    @Operation(summary = "Get Chapter by Series & Chapter Slug", description = "Retrieves a chapter by its parent series slug and its own chapter slug")
    public ResponseEntity<ChapterResponse> getChapterBySlug(
            @Parameter(description = "URL slug of the parent series") @PathVariable String seriesSlug,
            @Parameter(description = "URL slug of the chapter") @PathVariable String chapterSlug) {
        return ResponseEntity.ok(chapterService.getChapterBySlugAndSeriesSlug(chapterSlug, seriesSlug));
    }

    @GetMapping("/series/{seriesId}")
    @Operation(summary = "Get Chapters by Series ID", description = "Retrieves all chapters in a series, sorted by display order and chapter number")
    public ResponseEntity<List<ChapterResponse>> getChaptersBySeries(
            @Parameter(description = "Primary key ID of the parent series") @PathVariable Long seriesId) {
        return ResponseEntity.ok(chapterService.getChaptersBySeries(seriesId));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Chapter", description = "Updates an existing narrative chapter by ID")
    public ResponseEntity<ChapterResponse> updateChapter(
            @Parameter(description = "Primary key ID of the chapter") @PathVariable Long id,
            @Valid @RequestBody ChapterRequest request) {
        return ResponseEntity.ok(chapterService.updateChapter(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete Chapter", description = "Deletes a narrative chapter by ID")
    public ResponseEntity<Void> deleteChapter(
            @Parameter(description = "Primary key ID of the chapter") @PathVariable Long id) {
        chapterService.deleteChapter(id);
        return ResponseEntity.noContent().build();
    }
}

